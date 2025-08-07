import { useReducer, useEffect } from "react";
import {getInterview} from "helpers/selectors";
import "components/Application.scss";
import axios from "axios";

// define actions
const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

const reducers = {
}

const reducer = (state, action) => {
  console.log(action)
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.day }
    case SET_APPLICATION_DATA:
      return {  
        ...state,
        days: action.all[0], 
        appointments: action.all[1], 
        interviewers: action.all[2] 
      }
    case SET_INTERVIEW: {
      return {
        ...state,
        days:[...action.modifiedDays],
        appointments: action.appointments
      }
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => dispatch({ type:SET_DAY, day });
  
  useEffect(() => {
    Promise.all([
      Promise.resolve(
        axios
          .get("http://localhost:8001/api/days")
          .then(request => {
            return request.data;
          })
      ),
      Promise.resolve(
        axios
          .get("http://localhost:8001/api/appointments")
          .then(request => {
            return request.data;
          })
      ),
      Promise.resolve(
        axios
          .get("http://localhost:8001/api/interviewers")
          .then(request => {
            return request.data;
          })
      )
    ]).then( (all) => {
      // console.log(all[0],all[1], all[2]);
      dispatch({type:SET_APPLICATION_DATA, all:all});
    }).catch(e => console.log("there was a error"));
  }, []);

  const bookInterview = (id, interview) => {
    // id is appointment id 
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const interviewer = getInterview(state, interview);

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then( () => {
        const modifiedDays = [...state.days].map( (day) => {
          if(day.name === state.day) {
            day.spots -= 1;
            return day;
          } else {return day}
        }) 
        dispatch({ type:SET_INTERVIEW, modifiedDays, appointments});
        return interviewer;
      })
      .catch( () => {
        console.log('ERROR')
        return 'error'
      })
  }

  const cancelInterview = (appointmentId) => {
    const prev = {  ...state }
    const appointment = {
      ...state.appointments[appointmentId], interview: null
    };  
    const appointments = {
      ...state.appointments,
      [appointmentId]: appointment
    };

    return axios
      .delete(`http://localhost:8001/api/appointments/${appointmentId}`)
      .then( () => {
        const modifiedDays = [...state.days].map( (day) => {
          if(day.name === state.day) {
            console.log('SUCESS')
            day.spots += 1;
            return day;
          } else {return day}
        }) 
        dispatch({ type:SET_INTERVIEW, modifiedDays, appointments});
        console.log("DAYS after ",state.days)
        return;
      })
      .catch( () => {
        return {error:'error', prev}
      })
  } 

  return { // object to return 
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}
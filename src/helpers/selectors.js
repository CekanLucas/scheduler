
export function getAppointmentsForDay(state, day) {
  const days = state.days;
  let appointments = state.appointments;

  const appointmentArr = days.filter( (dayObj) => {
    return day === dayObj.name ? true : false;
  })[0]; // extract appointmentArr from days

  //validation for if day has no appointments 
  if(!appointmentArr){
    return [];
  }

  return appointmentArr.appointments.map( id => {
    if( appointments[`${id}`] )
      return appointments[`${id}`]
  });
};

export function getInterview (state, interview) {
  if( interview === null ){
    return null;
  }
  else{
    const interviewerId = interview.interviewer;
    const interviewerObj = 
      state.interviewers[interviewerId];
    return { 
      student: interview.student, 
      interviewer: interviewerObj
    }
  }
}

/* The function should return a new object containing the interview data when we pass it an object that contains the interviewer. Otherwise, the function should return null. The object it returns should look like this:

{  
  "student": "Lydia Miller-Jones",
  "interviewer": {  
    "id": 1,
    "name": "Sylvia Palmer",
    "avatar": "https://i.imgur.com/LpaY82x.png"
  }
} */
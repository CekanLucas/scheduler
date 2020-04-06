import React from "react";
import DayList from "./DayList";
import Appointment from "components/Appointment/index";
import "components/Application.scss";
import {getAppointmentsForDay, getInterviewersForDay, getInterview} from "helpers/selectors";
import useApplicationData from "../hooks/useApplicationData";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const appointmentList = 
    getAppointmentsForDay(state, state.day).map(appointment => {
    const interviewer = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day);
    return (
    <Appointment 
      key={appointment.id} 
      {...appointment} 
      interview={interviewer}
      interviewers={interviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
    />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">{appointmentList}</section>
    </main>
  );
}
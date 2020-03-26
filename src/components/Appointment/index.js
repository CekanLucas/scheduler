import "components/Appointment/styles.scss";

import React from "react";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import {useVisualMode} from "../../hooks/useVisualMode";
import Status from "./Status";


export default function Appointment(props){
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    if(!name || !interviewer) //validation
      return;

    const interview = {
      student: name,
      interviewer
    };
    transition('SAVING')
    props.bookInterview(props.id, interview)
      .then( () => {
        transition(SHOW)})
  }

  function cancel(name) {
    const interview = {
      student: name, interviewer:null
    };
    transition(DELETING)
    props.cancelInterview(props.id, interview)
      .then( () => {
        transition(EMPTY)})
  }

  return (
    <article className="appointment" >
      <Header time={props.time} />
      {mode === EMPTY && 
      <Empty 
        onAdd={() => transition(CREATE)} 
      />}
      {mode === CREATE && (
        <Form
          name={props.name}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === SAVING && (
        <Status message={SAVING}/>
      )}
      {mode === DELETING && (
        <Status message={DELETING}/>
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={cancel}
        />
      )}
    </article>
  );
}
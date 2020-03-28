import "components/Appointment/styles.scss";

import React from "react";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Error from "components/Appointment/Error";
import {useVisualMode} from "../../hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";


export default function Appointment(props){
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR = "ERROR";
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
      .then( (res) => {
        console.log(res)
        if (res === 'error'){
          transition(ERROR, true)
          return;
        }
        transition(SHOW)
       })
  }

  function cancel(name) {
    const interview = {
      student: name, interviewer:null
    };
    transition(DELETING)
    props.cancelInterview(props.id, interview)
      .then( res => {
        console.log(res)
        if (res){
          console.log("cancel error")
          transition(ERROR, true)
          return;
        }
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
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
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
          onDelete={()=>transition(CONFIRM)}
          onEdit={()=>transition(EDIT)}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you would like to delete?"}
          onConfirm={cancel}
          onCancel={back}
        />
      )}
      {mode === ERROR && (
        <Error
          message={"There was Error!"}
          onClose={()=>props.interviewer? transition(SHOW, true) : back()}
        />
      )}
    </article>
  );
}
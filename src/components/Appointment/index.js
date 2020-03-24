import "components/Appointment/styles.scss";

import React, { Fragment } from "react";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";

export default function Appointment(props){
  return (
    <article className="appointment" >
      <Header time={props.time} />
      { props.interview ? 
        <Show 
          interviewer={props.interview.interviewer} 
          student={props.interview.student} /> : 
        <Empty />
      }
    </article>
  );
}
/* 
takes in three props:

interviewers:array - an array of objects containing the information of each interviewer
value:number - the id of an interviewer
onChange:function - a function that accepts an interviewer id
*/

import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";
import PropTypes from "prop-types";

  // validate type with prop-type library
  InterviewerList.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired
  };
  

export default function InterviewerList(props) {
  console.log("TEST ", props.interviewers)
  const InterviewerList = Object.values(props.interviewers).map( (interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name} 
        avatar={interviewer.avatar} 
        selected={interviewer.id === props.value} 
        setInterviewer={ () => props.onChange(interviewer.id)} />
    );
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{InterviewerList}</ul>
    </section>
  );
}

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

export function getInterviewersForDay(state, day) {
  const days = state.days;
  let interviewers = state.interviewers;
  
  const dayObj = days.filter( (dayObj) => {
    return day === dayObj.name ? true : false;
  })[0]; // extract relevant dayObj from days

  //validation for if day has no interviewers 
  if(!dayObj || dayObj.interviewers.length === 0){
    return [];
  }

  return  dayObj.interviewers.map( id => {
    if( interviewers[`${id}`] )
      return interviewers[`${id}`]
  });
};
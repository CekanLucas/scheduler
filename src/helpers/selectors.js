
export function getAppointmentsForDay(state, day) {
  const days = state.days;
  let appointments = state.appointments;

  const appointmentArr = days.filter( (dayObj) => {
    return day === dayObj.name ? true : false;
  })[0]; // extract appointmentArr from days

  //validation for if day has no appointments 
  if(!appointmentArr){
    console.log("empty arr");
    return [];
  }

  return appointmentArr.appointments.map( id => {
    if( appointments[`${id}`] )
      return appointments[`${id}`]
  });
}
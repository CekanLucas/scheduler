import React from "react";
import classnames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const formatSpots = (spot) => {
    return spot === 0 ? 'no spots remaining' : 
      spot === 1 ? '1 spot remaining' : `${spot} spots remaining`;
  };
  const dayListStyle = "day-list__item " + classnames({
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  return (
    <li onClick={() => props.setDay(props.name)} className={dayListStyle}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
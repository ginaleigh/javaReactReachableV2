import React from "react";
import dayjs from "dayjs";

const Arrival = ({ arrival, stop }) => {
  return (
    <p>
      {arrival.staNm} {arrival.stpDe} <br></br>Arrival time {dayjs(arrival.arrT).format(" HH:mm:ss a")}
      <br></br>
    </p>
  );
};

export default Arrival;

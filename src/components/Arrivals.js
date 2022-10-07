import { useEffect, useState } from "react";
import axios from "axios";
import Arrival from "./Arrival";

// object destructuring
const ArrivalList = ({ stop }) => {
  const [arrivalTimes, setArrivalTimes] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/arrivals/${stop.stop_id}`).then((res) => {
      const payload = res.data;
      setArrivalTimes(payload)
      console.log(payload);
    });
  }, [stop.stop_id])

    return (
      <div>
        {arrivalTimes.map((arrival, index) => (
          <Arrival arrival={arrival} key={ index } stop={stop} />          
        ))}
      </div>
    );
    

}

export default ArrivalList

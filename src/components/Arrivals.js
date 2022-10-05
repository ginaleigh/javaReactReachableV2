import { useEffect, useState } from "react";
import axios from "axios";
import Arrival from "./Arrival";

// object destructuring
const ArrivalList = ({ stop }) => {
  const [arrivalTimes, setArrivalTimes] = useState([]);

  // dependency array this need to be http://localhost:8080/stops/${parentId}
  useEffect(() => {
    axios.get(`http://localhost:3000/arrivals/${stop.parent_id}`).then((res) => {
      const payload = res.data["ctatt"]["eta"];
      setArrivalTimes(payload)
      console.log(payload);
    });
  }, [stop.parent_id])

    return (
      <div>
        {arrivalTimes.map((arrival, index) => (
          <Arrival arrival={arrival} key={ index } stop={stop} />          
        ))}
      </div>
    );
    

}

export default ArrivalList

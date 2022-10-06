import { useEffect, useState } from "react";
import axios from "axios";
import ArrivalList from "./Arrivals";
import "./stops.css";

const Dropdown = ({ informationBeforeDropdown, options, onChange, value }) => {
  // console.log("opts", options);
  return (
    <label>
      {informationBeforeDropdown}
      <select onChange={onChange} value={value}>
        {options.map((opt) => (
          <option key={Math.random()} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
};

const StopList = () => {
  const [stops, setStops] = useState([]);
  const [lines, setLines] = useState([]);
  const [stop, setStop] = useState(null);
  const [line, setLine] = useState(null);

// async function axiosCall() {

//when you map your data in that drop down list I think you need to do line.[property name]

//   await axios.get(`http://localhost:8080/stops`).then((res) => {
//         const stops = res.data;
//         setStops(stops);
//         console.log(stops);
//       });


  useEffect(() => {
    axios.get(`http://localhost:8080/lines`).then((res) => {
      const lines = res.data;
      setLines(lines);
      // console.log(lines);
      //map an array of objects???
      axios.get(`http://localhost:8080/stops`).then((res) => {
        const stops = res.data;
        setStops(stops);
        console.log(stops);
      });
    
    });
  }, );


  const handleChange = (event) => {
    setLine(event.target.value);
  };

  //this needs to change to create array and loop through stop_name?
  const handleStopChange = (event) => {
    const stopId = parseInt(event.target.value);
    for (let i = 0; i < stops.length; i++) {
      if (stops[i].id === stopId) {
        setStop(stops[i]);
      }
    }
  };

  return (
    <div className="drop">
      <Dropdown
        informationBeforeDropdown="CTA Train Line"
        onChange={handleChange}
        options={lines.map((line) => {
          return { label: line, value: line };
        })}
        value={line}
      />
      <Dropdown
        informationBeforeDropdown="Train Stop"
        onChange={handleStopChange}
        options={stops.map((stops) => {
          return { label: stops, value: stops };
        })}
        // options={[]}
        // value={stop ? stop.id : ""}
      />
      <p></p>
      <b>Please select a train line and stop</b>
      <b>{stop && <p>This stop is {stop.is_accessible ? "accessible" : "not accessible"}</p>}</b>
      {stop && <ArrivalList stop={stop} />}
    </div>
  );
};

export default StopList;

//How does I make this work and what do I want it to do functionally?
//Function
//1. App opens - dropdown contains all lines & all stops
//2. dropdown line selected & stops filter to that line(color)
//3. dropdown stop selected & all arrival times with dest are displayed
//{arrival.staNm} towards {arrival.destNm} with arrT.

//Option 2
//1. App opens - dropdown with search function presents with From/To instead of Line/Stop
//2. This dropdown populates all stops in both with line (color) ** station_descriptive_name in /stops
//3. You pick the from and to stops from the list and FE call the BE to retrieve arrT

//ok, so if 1 makes more sense how do I get stops displayed properly?
//needs to be returned as array but it bumps down object display
//    Object { stop_id: 30162, direction_id: "W", stop_name: "18th (54th/Cermak-bound)",
//Do I need to ???
//changing the formatting of the api call before returning?
//or find a way to change formatting above to hold child properly

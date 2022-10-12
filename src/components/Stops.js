import { useEffect, useState } from "react";
import axios from "axios";
import ArrivalList from "./Arrivals";
import "./stops.css";

const linekey = {
  Red: 'red',
  Pink: 'pnk',
  Blue: 'blue',
  Orange: 'o',
  Yellow: 'y',
  Purple: 'p',
  "Purple Express": 'pexp',
  Green: 'g',
  Brown: 'brn',
  Ada: 'ada'

}

const Dropdown = ({ informationBeforeDropdown, options, onChange, value }) => {
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

console.log('line', lines)
  useEffect(() => {
    axios.get(`http://localhost:8080/lines`).then((res) => {
      const lines = res.data;
      setLines(lines);
      setLine(lines[0])
      axios.get(`http://localhost:8080/stops`).then((res) => {
        const stops = res.data;
        setStops(stops);
        console.log(stops);
      });
    
    });
  }, []);


  const handleChange = (event) => {
    setLine(event.target.value);
  };

  const handleStopChange = (event) => {
    const stopId = parseInt(event.target.value);
    console.log(event.target.value)
    for (let i = 0; i < stops.length; i++) {
      if (stops[i].stop_id === stopId) {
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
        options={stops.filter(stop => {
          return stop[linekey[line]]
        }).map((stop) => {
          return { label: stop.stop_name, value: stop.stop_id };
        })}
        value={stop?.stop_id}
      />
      <p></p>
      <b>Please select a train line and stop</b>
      <b>{stop && <p>This stop is {stop.ada ? "accessible" : "not accessible"}</p>}</b>
      {stop && <ArrivalList stop={stop} />}
    </div>
  );
};

export default StopList;


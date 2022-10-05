// import { useEffect, useState } from "react";
// import axios from "axios";

// const LineList = ({ line }) => {
//   const [lineList, setLineList] = useState([]);

//   useEffect(() => {
//     axios.get(`http://localhost:3000/stops/${line.parent_id}`).then((res) => {
//       const payload = res.data["ctatt"]["eta"];
//       setLineList(payload)
//       console.log(payload);
//     });
//   }, [line.parent_id])

//     return (
//       <div>
//         {lineList.map((line, index) => (
//           <Line line={line} key={ index } stop={line} />          
//         ))}
//       </div>
//     );
    

// }

// export default LineList
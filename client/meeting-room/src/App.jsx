import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"; // นำเข้าไฟล์ CSS

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/employee") // เรียก API จาก server
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="title">Employee Information</h1>
      {data.length > 0 ? (
        <div className="employee-list">
          {data.map((employee, index) => (
            <div key={index} className="employee-card">
              <h2>{employee[1]}</h2> {/* สมมติว่า employee[1] เป็นชื่อ */}
              <p>Position: {employee[2]}</p>{" "}
              {/* สมมติว่า employee[2] เป็นตำแหน่ง */}
              <p>Department: {employee[3]}</p>{" "}
              {/* สมมติว่า employee[3] เป็นแผนก */}
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;

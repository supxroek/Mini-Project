import { useEffect, useState } from "react";
import axios from "axios";

function User_Dashboard() {
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
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Employee Information</h1>
        {data.length > 0 ? (
          <table className="min-w-full bg-white border border-black-600">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Position</th>
                <th className="py-3 px-6 text-left">Department</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {data.map((employee, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-300 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left">{employee[0]}</td>
                  <td className="py-3 px-6 text-left">{employee[1]}</td>
                  <td className="py-3 px-6 text-left">{employee[2]}</td>
                  <td className="py-3 px-6 text-left">{employee[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">Loading...</p>
        )}
      </div>
    </>
  );
}

export default User_Dashboard;

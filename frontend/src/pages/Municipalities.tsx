import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// Define TypeScript interface for a Municipality
interface Municipality {
  municipal_id: number;
  municipal_name: string;
  municipal_rate: number;
  education_rate: number;
}

const Municipalities: React.FC = () => {
  const [municipalities, setMunicipalities] = useState<Municipality[]>([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchMunicipalities = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/property-assessment/municipalities/", {
          headers: {
            Authorization: `Bearer ${auth.token}`, // Add auth token to request
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch municipalities");
        }

        const data: Municipality[] = await response.json(); // Type assertion
        setMunicipalities(data);
      } catch (error) {
        console.error("Error fetching municipalities:", error);
      }
    };

    fetchMunicipalities();
  }, [auth.token]); // Re-run if auth token changes

  return (
    <div style={{ padding: "20px" }}>
      <h2>Municipalities</h2>
      <button style={{ margin: "20px" }}>Import from CSV</button>
      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Municipal Rate</th>
            <th>Education Rate</th>
          </tr>
        </thead>
        <tbody>
          {municipalities.map((municipality) => (
            <tr key={municipality.municipal_id}>
              <td>{municipality.municipal_id}</td>
              <td>{municipality.municipal_name}</td>
              <td>{municipality.municipal_rate}</td>
              <td>{municipality.education_rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Municipalities;

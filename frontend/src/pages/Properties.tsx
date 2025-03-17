import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// Define TypeScript interface for a Property
interface Property {
  assessment_roll_number: string;
  assessment_value: number;
  municipal: {
    municipal_id: number;
    municipal_name: string;
  };
}

const Properties: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/property-assessment/properties/", {
          headers: {
            Authorization: `Bearer ${auth.token}`, // Add auth token to request
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }

        const data: Property[] = await response.json(); // Type assertion
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, [auth.token]); // Re-run if auth token changes

  return (
    <div style={{ padding: "20px" }}>
      <h2>Properties</h2>
      <button style={{ margin: "20px" }}>Import from CSV</button>
      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Assessment Roll Number</th>
            <th>Assessment Value</th>
            <th>Municipality</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property.assessment_roll_number}>
              <td>{property.assessment_roll_number}</td>
              <td>{property.assessment_value}</td>
              <td>{property.municipal.municipal_name} (ID: {property.municipal.municipal_id})</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Properties;

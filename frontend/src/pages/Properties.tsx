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
  details?: string; // Additional property details for expandable row
}

const Properties: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
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

  // Toggle row expansion
  const toggleRow = (id: string) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="p-6 bg-blue-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Properties</h2>

        {/* Button */}
        <button className="mb-4 bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition">
          Import from CSV
        </button>

        {/* Scrollable Table Container */}
        <div className="overflow-x-auto border border-gray-300 rounded-lg max-h-[78vh] overflow-y-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-200 text-gray-700 sticky top-0">
              <tr>
                <th className="py-3 px-4 text-left"></th>
                <th className="py-3 px-4 text-left">Assessment Roll Number</th>
                <th className="py-3 px-4 text-left">Assessment Value</th>
                <th className="py-3 px-4 text-left">Municipality</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {properties.map((property) => (
                <React.Fragment key={property.assessment_roll_number}>
                  {/* Main Row */}
                  <tr className="hover:bg-gray-100 transition">
                    <td className="py-3 px-4">
                      <button
                        onClick={() => toggleRow(property.assessment_roll_number)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {expandedRows.has(property.assessment_roll_number) ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-dash"
                            viewBox="0 0 16 16"
                          >
                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-plus"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                          </svg>
                        )}
                      </button>
                    </td>
                    <td className="py-3 px-4">{property.assessment_roll_number}</td>
                    <td className="py-3 px-4">${property.assessment_value.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      {property.municipal.municipal_name} (ID: {property.municipal.municipal_id})
                    </td>
                  </tr>

                  {/* Expanded Row */}
                  {expandedRows.has(property.assessment_roll_number) && (
                    <tr className="bg-gray-50">
                      <td colSpan={4} className="py-4 px-6 text-gray-700">
                        <div className="flex flex-col space-y-2">
                          <p className="font-semibold text-gray-900">
                            Additional Info for {property.assessment_roll_number}
                          </p>
                          <p>Assessment Value: ${property.assessment_value.toLocaleString()}</p>
                          <p>Municipality: {property.municipal.municipal_name} (ID: {property.municipal.municipal_id})</p>
                          <p>Details: {property.details || "No additional details available."}</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Properties;

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
  const [expandedRows, setExpandedRows] = useState<number[]>([]); // Store expanded rows
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchMunicipalities = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/property-assessment/municipalities/",
          {
            headers: {
              Authorization: `Bearer ${auth.token}`, // Add auth token to request
              "Content-Type": "application/json",
            },
          }
        );

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

  // Toggle row expansion
  const toggleExpand = (id: number) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((row) => row !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-6 bg-blue-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Municipalities</h2>
          <h2>Go to Properties</h2>
        </div>
        <button className="mb-4 bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition">
          Import from CSV
        </button>
        <div className="overflow-x-auto border border-gray-300 rounded-lg max-h-[78vh] overflow-y-auto">
          <table className="min-w-full border border-gray-300 rounded-lg">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-3 px-4 text-left"></th>
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Municipal Rate</th>
                <th className="py-3 px-4 text-left">Education Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {municipalities.map((municipality) => (
                <React.Fragment key={municipality.municipal_id}>
                  {/* Main Row */}
                  <tr className="hover:bg-gray-100 transition">
                    <td className="py-3 px-4">
                      <button
                        onClick={() => toggleExpand(municipality.municipal_id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {expandedRows.includes(municipality.municipal_id) ? (
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
                    <td className="py-3 px-4">{municipality.municipal_id}</td>
                    <td className="py-3 px-4">{municipality.municipal_name}</td>
                    <td className="py-3 px-4">{municipality.municipal_rate}</td>
                    <td className="py-3 px-4">{municipality.education_rate}</td>
                  </tr>

                  {/* Expanded Row */}
                  {expandedRows.includes(municipality.municipal_id) && (
                    <tr className="bg-gray-50">
                      <td colSpan={5} className="py-4 px-6 text-gray-700">
                        <div className="flex flex-col space-y-2">
                          <p className="font-semibold text-gray-900">
                            Additional Info for {municipality.municipal_name}
                          </p>
                          <p>Municipal Rate: {municipality.municipal_rate}</p>
                          <p>Education Rate: {municipality.education_rate}</p>
                          <p>ID: {municipality.municipal_id}</p>
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

export default Municipalities;

import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Modal, InputNumber, Select, Button, Form } from "antd";

// Define TypeScript interface for a Property
interface Property {
  id: number;
  assessment_roll_number: string;
  assessment_value: number;
  municipal: {
    municipal_id: number;
    municipal_name: string;
  };
}

const Properties: React.FC = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const auth = useContext(AuthContext);

  //Modal for editing stuff
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [updatedAssessmentValue, setUpdatedAssessmentValue] = useState<number | null>(null);
  const [selectedMunicipal, setSelectedMunicipal] = useState<number | null>(null);
  const [municipalities, setMunicipalities] = useState<{ municipal_id: number, municipal_name: string }[]>([]);


  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/property-assessment/properties/", {
          headers: {
            Authorization: `Bearer ${auth.token}`,
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
  
        const data: Property[] = await response.json();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
  
    const fetchMunicipalities = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/property-assessment/municipalities/", {
          headers: {
            Authorization: `Bearer ${auth.token}`,
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch municipalities");
        }
  
        const data = await response.json();
        setMunicipalities(data);
      } catch (error) {
        console.error("Error fetching municipalities:", error);
      }
    };
  
    fetchProperties();
    fetchMunicipalities();
  }, [auth.token]);
  

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

  const handleEdit = (property: Property) => {
    setSelectedProperty(property);
    setUpdatedAssessmentValue(property.assessment_value);
    setSelectedMunicipal(property.municipal.municipal_id);
    setIsModalVisible(true);
  };
  

  const handleUpdate = async () => {
    if (!selectedProperty) return;
  
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/property-assessment/properties/${selectedProperty.id}/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${auth.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            assessment_value: updatedAssessmentValue,
            municipal: selectedMunicipal, // Send only the ID
          }),
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to update property");
      }
  
      const updatedProperty = await response.json(); // Get the updated property from API
  
      // Update state to reflect changes
      setProperties((prev) =>
        prev.map((prop) =>
          prop.id === selectedProperty.id
            ? {
                ...prop,
                assessment_value: updatedAssessmentValue!,
                municipal: updatedProperty.municipal, // Use the updated municipality object
              }
            : prop
        )
      );
  
      setIsModalVisible(false);
      alert("Property updated successfully!");
    } catch (error) {
      console.error("Error updating property:", error);
      alert("Failed to update property.");
    }
  };
  
  const handleDelete = async (propertyId: number) => {
    if (!window.confirm("Are you sure you want to delete this property?")) {
      return;
    }
  
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/property-assessment/properties/${propertyId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${auth.token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to delete property");
      }
  
      // Remove deleted property from state
      setProperties((prev) => prev.filter((property) => property.id !== propertyId));
  
      alert("Property deleted successfully!");
    } catch (error) {
      console.error("Error deleting property:", error);
      alert("Failed to delete property.");
    }
  };
  

  return (
    <div className="p-6 bg-blue-100 min-h-screen">
      <Modal
        title="Edit Property"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleUpdate}>
            Save Changes
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Assessment Value">
            <InputNumber
              value={updatedAssessmentValue}
              onChange={(value) => setUpdatedAssessmentValue(value!)}
              min={0}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item label="Municipality">
            <Select
              value={selectedMunicipal}
              onChange={(value) => setSelectedMunicipal(value)}
              style={{ width: "100%" }}
            >
              {municipalities.map((municipal) => (
                <Select.Option key={municipal.municipal_id} value={municipal.municipal_id}>
                  {municipal.municipal_name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Properties</h2>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate("/municipalities")}
              className="pl-4 pr-4 bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition"
            >
              Go to Municipalities
            </button>
            <button
              onClick={() => navigate("/home")}
              className="pl-4 pr-4 bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-house-door-fill"
                viewBox="0 0 16 16"
              >
                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="flex space-x-4">
          <button className="mb-4 bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition">
            Import from CSV
          </button>
          <button className="mb-4 bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition">
            Add a Property
          </button>
        </div>

        {/* Scrollable Table Container */}
        <div className="overflow-x-auto border border-gray-300 rounded-lg max-h-[78vh] overflow-y-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-200 text-gray-700 sticky top-0">
              <tr>
                <th className="py-3 px-4 text-left"></th>
                <th className="py-3 px-4 text-left">Assessment Roll Number</th>
                <th className="py-3 px-4 text-left">Assessment Value</th>
                <th className="py-3 px-4 text-left">Municipality</th>
                <th className="py-3 px-4 text-left">Actions</th>
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
                    <td className="py-3 px-4">{property.municipal.municipal_name} (ID: {property.municipal.municipal_id})</td>
                    <td className="py-3 px-4 flex space-x-2">
                    <button
                      onClick={() => handleEdit(property)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(property.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                    </td>
                  </tr>

                  {/* Expanded Row */}
                  {expandedRows.has(property.assessment_roll_number) && (
                    <tr className="bg-gray-50">
                      <td colSpan={4} className="py-4 px-6 text-gray-700">
                        <div className="flex flex-col space-y-2">
                          <p className="font-semibold text-gray-900">Municipality:</p>
                          <p>{property.municipal.municipal_name} (ID: {property.municipal.municipal_id})</p>
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

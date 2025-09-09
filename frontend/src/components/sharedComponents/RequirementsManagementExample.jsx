import React, { useState } from "react";
import { useSelector } from "react-redux";
import EditRequirementsModal from "./EditRequirementsModal";

/**
 * Example component demonstrating how to use the requirements update modal
 * This component shows how to integrate the modal into your pages
 */
const RequirementsManagementExample = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState({
    type: "programs",
    id: "123",
    name: "Example Program",
    requirements: {
      past_experience: true,
      education_level: "bachelors",
      max_income_level: "75000",
      min_income: "25000",
      max_age: "65",
      min_age: "18",
      gender: "male",
      experience_level: "intermediate",
      city: "New York",
      zipcode: "10001",
      radius: "25",
    },
  });

  const userId = "user123"; // Replace with actual user ID

  // Example entities for demonstration
  const exampleEntities = [
    {
      type: "programs",
      id: "123",
      name: "Coding Bootcamp",
      requirements: {
        past_experience: true,
        education_level: "high_school",
        max_income_level: "50000",
        min_income: "20000",
        max_age: "35",
        min_age: "18",
        gender: "",
        experience_level: "beginner",
        city: "New York",
        zipcode: "10001",
        radius: "25",
      },
    },
    {
      type: "events",
      id: "456",
      name: "Tech Meetup",
      requirements: {
        past_experience: false,
        education_level: "",
        max_income_level: "",
        min_income: "",
        max_age: "",
        min_age: "18",
        gender: "",
        experience_level: "",
        city: "San Francisco",
        zipcode: "94102",
        radius: "10",
      },
    },
    {
      type: "resources",
      id: "789",
      name: "Mentorship Program",
      requirements: {
        past_experience: true,
        education_level: "bachelors",
        max_income_level: "100000",
        min_income: "30000",
        max_age: "50",
        min_age: "25",
        gender: "",
        experience_level: "advanced",
        city: "Los Angeles",
        zipcode: "90210",
        radius: "50",
      },
    },
  ];

  const handleEditRequirements = (entity) => {
    setSelectedEntity(entity);
    setModalOpen(true);
  };

  const formatRequirements = (requirements) => {
    if (!requirements || Object.keys(requirements).length === 0) {
      return "No requirements specified";
    }

    const formatted = [];
    
    if (requirements.past_experience) {
      formatted.push("Past experience required");
    }
    
    if (requirements.education_level) {
      const educationMap = {
        high_school: "High School",
        associates: "Associate's Degree",
        bachelors: "Bachelor's Degree",
        masters: "Master's Degree",
        doctorate: "Doctorate",
        other: "Other",
      };
      formatted.push(`Education: ${educationMap[requirements.education_level] || requirements.education_level}`);
    }
    
    if (requirements.min_age || requirements.max_age) {
      const ageRange = [];
      if (requirements.min_age) ageRange.push(`Min: ${requirements.min_age}`);
      if (requirements.max_age) ageRange.push(`Max: ${requirements.max_age}`);
      formatted.push(`Age: ${ageRange.join(" - ")}`);
    }
    
    if (requirements.min_income || requirements.max_income_level) {
      const incomeRange = [];
      if (requirements.min_income) incomeRange.push(`Min: $${requirements.min_income}`);
      if (requirements.max_income_level) incomeRange.push(`Max: $${requirements.max_income_level}`);
      formatted.push(`Income: ${incomeRange.join(" - ")}`);
    }
    
    if (requirements.gender) {
      const genderMap = {
        male: "Male",
        female: "Female",
        non_binary: "Non-binary",
        other: "Other",
      };
      formatted.push(`Gender: ${genderMap[requirements.gender] || requirements.gender}`);
    }
    
    if (requirements.experience_level) {
      const experienceMap = {
        beginner: "Beginner",
        intermediate: "Intermediate",
        advanced: "Advanced",
        expert: "Expert",
      };
      formatted.push(`Experience: ${experienceMap[requirements.experience_level] || requirements.experience_level}`);
    }
    
    if (requirements.city || requirements.zipcode) {
      const location = [];
      if (requirements.city) location.push(requirements.city);
      if (requirements.zipcode) location.push(requirements.zipcode);
      if (requirements.radius) location.push(`${requirements.radius} miles`);
      formatted.push(`Location: ${location.join(", ")}`);
    }
    
    return formatted.length > 0 ? formatted.join(" • ") : "No specific requirements";
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Requirements Management Example</h1>
      
      <div className="grid gap-6">
        {exampleEntities.map((entity, index) => (
          <div key={index} className="border rounded-lg p-4 bg-white shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {entity.name}
                </h2>
                <p className="text-sm text-gray-600 capitalize">
                  Type: {entity.type}
                </p>
              </div>
              <button
                onClick={() => handleEditRequirements(entity)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Edit Requirements
              </button>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Current Requirements:</h3>
              <p className="text-sm text-gray-600">
                {formatRequirements(entity.requirements)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Requirements Modal */}
      <EditRequirementsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        entityType={selectedEntity.type}
        entityId={selectedEntity.id}
        currentRequirements={selectedEntity.requirements}
        entityName={selectedEntity.name}
        userId={userId}
      />
    </div>
  );
};

export default RequirementsManagementExample; 
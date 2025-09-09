import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  changeProgramRequirements, 
  changeEventRequirements, 
  changeResourceRequirements, 
  changeRequirements,
  clearRequirementsStatus 
} from "../../redux/requirements/updateRequirementsSlice";

const EditRequirementsModal = ({
  isOpen,
  onClose,
  entityType, // 'programs', 'events', 'resources'
  entityId,
  currentRequirements ,
  entityName,
  userId,
}) => {
  const dispatch = useDispatch();
  const [requirements, setRequirements] = useState({
    past_experience: false,
    education_level: "",
    max_income_level: "",
    min_income: "",
    max_age: "",
    min_age: "",
    gender: "",
    experience_level: "",
    city: "",
    zipcode: "",
    radius: "",
  });
  const [errors, setErrors] = useState({});
  
  const requirementsStatus = useSelector((state) => state.updateRequirements);
  const { status, error, programRequirementsStatus, eventRequirementsStatus, resourceRequirementsStatus } = requirementsStatus;

  // Get the appropriate status based on entity type
  const getStatus = () => {
    switch (entityType) {
      case 'programs':
        return programRequirementsStatus;
      case 'events':
        return eventRequirementsStatus;
      case 'resources':
        return resourceRequirementsStatus;
      default:
        return status;
    }
  };

  const currentStatus = getStatus();

  useEffect(() => {
    if (isOpen) {
      // Merge current requirements with defaults
      setRequirements({
        past_experience: currentRequirements.past_experience || false,
        education_level: currentRequirements.education_level || "",
        max_income_level: currentRequirements.max_income_level || "",
        min_income: currentRequirements.min_income || "",
        max_age: currentRequirements.max_age || "",
        min_age: currentRequirements.min_age || "",
        gender: currentRequirements.gender || "",
        experience_level: currentRequirements.experience_level || "",
        city: currentRequirements.city || "",
        zipcode: currentRequirements.zipcode || "",
        radius: currentRequirements.radius || "",
        ...currentRequirements,
      });
      setErrors({});
      dispatch(clearRequirementsStatus());
    }
  }, [isOpen, currentRequirements, dispatch]);

  useEffect(() => {
    if (currentStatus === "success") {
      alert(`${entityType.charAt(0).toUpperCase() + entityType.slice(1)} requirements updated successfully!`);
      window.location.reload();
      onClose();
    }
  }, [currentStatus, onClose, entityType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    
    // Validate numeric fields
    if (requirements.max_income_level && isNaN(requirements.max_income_level)) {
      newErrors.max_income_level = "Must be a valid number";
    }
    if (requirements.min_income && isNaN(requirements.min_income)) {
      newErrors.min_income = "Must be a valid number";
    }
    if (requirements.max_age && isNaN(requirements.max_age)) {
      newErrors.max_age = "Must be a valid number";
    }
    if (requirements.min_age && isNaN(requirements.min_age)) {
      newErrors.min_age = "Must be a valid number";
    }
    if (requirements.zipcode && isNaN(requirements.zipcode)) {
      newErrors.zipcode = "Must be a valid zipcode";
    }
    
    // Validate age range
    if (requirements.min_age && requirements.max_age && 
        parseInt(requirements.min_age) > parseInt(requirements.max_age)) {
      newErrors.age_range = "Minimum age cannot be greater than maximum age";
    }
    
    // Validate income range
    if (requirements.min_income && requirements.max_income_level && 
        parseInt(requirements.min_income) > parseInt(requirements.max_income_level)) {
      newErrors.income_range = "Minimum income cannot be greater than maximum income level";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clean up empty string values
    const cleanedRequirements = Object.fromEntries(
      Object.entries(requirements).map(([key, value]) => [
        key, 
        value === "" ? null : value
      ])
    );

    // Dispatch the appropriate action based on entity type
    switch (entityType) {
      case 'programs':
        dispatch(changeProgramRequirements({
          program_id: entityId,
          requirements: cleanedRequirements,
          user_id: userId,
        }));
        break;
      case 'events':
        dispatch(changeEventRequirements({
          event_id: entityId,
          requirements: cleanedRequirements,
          user_id: userId,
        }));
        break;
      case 'resources':
        dispatch(changeResourceRequirements({
          resource_id: entityId,
          requirements: cleanedRequirements,
          user_id: userId,
        }));
        break;
      default:
        dispatch(changeRequirements({
          entity_type: entityType,
          entity_id: entityId,
          requirements: cleanedRequirements,
          user_id: userId,
        }));
    }
  };

  const handleCancel = () => {
    setRequirements({
      past_experience: false,
      education_level: "",
      max_income_level: "",
      min_income: "",
      max_age: "",
      min_age: "",
      gender: "",
      experience_level: "",
      city: "",
      zipcode: "",
      radius: "",
      ...currentRequirements,
    });
    setErrors({});
    onClose();
  };

  const handleInputChange = (field, value) => {
    setRequirements(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Update {entityType.charAt(0).toUpperCase() + entityType.slice(1)} Requirements
          </h2>
          <button
            onClick={handleCancel}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {entityName && (
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              <span className="font-medium">{entityType.charAt(0).toUpperCase() + entityType.slice(1)}:</span> {entityName}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Experience Section */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Experience Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={requirements.past_experience}
                    onChange={(e) => handleInputChange('past_experience', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    Past Experience Required
                  </span>
                </label>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Experience Level
                </label>
                <select
                  value={requirements.experience_level}
                  onChange={(e) => handleInputChange('experience_level', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Experience Level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Education Requirements</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Education Level
              </label>
              <select
                value={requirements.education_level}
                onChange={(e) => handleInputChange('education_level', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Education Level</option>
                <option value="high_school">High School</option>
                <option value="associates">Associate's Degree</option>
                <option value="bachelors">Bachelor's Degree</option>
                <option value="masters">Master's Degree</option>
                <option value="doctorate">Doctorate</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Income Section */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Income Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Income ($)
                </label>
                <input
                  type="number"
                  value={requirements.min_income}
                  onChange={(e) => handleInputChange('min_income', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.min_income ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="e.g., 25000"
                />
                {errors.min_income && (
                  <p className="text-red-500 text-sm mt-1">{errors.min_income}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Maximum Income Level ($)
                </label>
                <input
                  type="number"
                  value={requirements.max_income_level}
                  onChange={(e) => handleInputChange('max_income_level', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.max_income_level ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="e.g., 75000"
                />
                {errors.max_income_level && (
                  <p className="text-red-500 text-sm mt-1">{errors.max_income_level}</p>
                )}
              </div>
            </div>
            {errors.income_range && (
              <p className="text-red-500 text-sm mt-1">{errors.income_range}</p>
            )}
          </div>

          {/* Age Section */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Age Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Age
                </label>
                <input
                  type="number"
                  value={requirements.min_age}
                  onChange={(e) => handleInputChange('min_age', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.min_age ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="e.g., 18"
                  min="0"
                  max="120"
                />
                {errors.min_age && (
                  <p className="text-red-500 text-sm mt-1">{errors.min_age}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Maximum Age
                </label>
                <input
                  type="number"
                  value={requirements.max_age}
                  onChange={(e) => handleInputChange('max_age', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.max_age ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="e.g., 65"
                  min="0"
                  max="120"
                />
                {errors.max_age && (
                  <p className="text-red-500 text-sm mt-1">{errors.max_age}</p>
                )}
              </div>
            </div>
            {errors.age_range && (
              <p className="text-red-500 text-sm mt-1">{errors.age_range}</p>
            )}
          </div>

          {/* Demographics Section */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Demographics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  value={requirements.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Any Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non_binary">Non-binary</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Location Section */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Location Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={requirements.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., New York"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Zipcode
                </label>
                <input
                  type="text"
                  value={requirements.zipcode}
                  onChange={(e) => handleInputChange('zipcode', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.zipcode ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="e.g., 10001"
                  maxLength="5"
                />
                {errors.zipcode && (
                  <p className="text-red-500 text-sm mt-1">{errors.zipcode}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Radius
                </label>
                <select
                  value={requirements.radius}
                  onChange={(e) => handleInputChange('radius', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Radius</option>
                  <option value="5">5 miles</option>
                  <option value="10">10 miles</option>
                  <option value="25">25 miles</option>
                  <option value="50">50 miles</option>
                  <option value="100">100 miles</option>
                </select>
              </div>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              disabled={currentStatus === "loading"}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentStatus === "loading"}
            >
              {currentStatus === "loading" ? "Updating..." : "Update Requirements"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRequirementsModal; 
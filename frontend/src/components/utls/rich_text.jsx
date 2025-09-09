import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const Rich_Text = ({ formData, setFormData, type, errors, setErrors }) => {
  const [textareaValue, setTextareaValue] = useState(formData[type] || "");

  function handleChange(e) {
    const value = e.target.value;
    setFormData({ ...formData, [type]: value });
    setTextareaValue(value);
    if (errors[type]) {
      setErrors({
        ...errors,
        [type]: false
      });
    }
  }

  return (
    <div className="flex mb-[50px] pt-1 w-full">
      <textarea
        value={textareaValue}
        onChange={handleChange}
        className="rounded text-pink-500 min-h-[20vh] w-full text-tkh-grayscale-10 text-xl font-normal p-3 border border-gray-300 resize-none"
        placeholder="Type here..."
        rows={8}
      />
    </div>
  );
};

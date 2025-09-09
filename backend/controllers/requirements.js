require("dotenv").config();
const { Op } = require("sequelize");
const {
  Requirements,
  Program,
  Event,
  User
} = require("../models");

/*-------------REQUIREMENTS-CONTROLLERS-------------*/

// Get all requirements
const getAllRequirements = async (req, res) => {
  try {
    const requirements = await Requirements.findAll({
      include: [
        {
          model: Program,
          as: "program_requirements",
          attributes: ["program_id", "name"]
        },
        {
          model: Event,
          as: "event_requirements",
          attributes: ["event_id", "name"]
        }
      ]
    });

    return res.status(200).json({
      requirements: requirements,
      total: requirements.length
    });
  } catch (error) {
    console.error("Error getting all requirements:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Get requirements by ID
const getRequirementsById = async (req, res) => {
  const { requirements_id } = req.params;
  
  try {
    const requirements = await Requirements.findOne({
      where: { requirements_id: requirements_id },
      include: [
        {
          model: Program,
          as: "program_requirements",
          attributes: ["program_id", "name", "description"]
        },
        {
          model: Event,
          as: "event_requirements",
          attributes: ["event_id", "name", "description"]
        }
      ]
    });

    if (!requirements) {
      return res.status(404).json({ message: "Requirements not found!" });
    }

    return res.status(200).json(requirements);
  } catch (error) {
    console.error("Error getting requirements by ID:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Get requirements by program ID
const getRequirementsByProgramId = async (req, res) => {
  const { program_id } = req.params;
  
  try {
    const program = await Program.findOne({
      where: { program_id: program_id },
      include: [
        {
          model: Requirements,
          as: "program_requirements"
        }
      ]
    });

    if (!program) {
      return res.status(404).json({ message: "Program not found!" });
    }

    return res.status(200).json({
      program_id: program.program_id,
      program_name: program.name,
      requirements: program.program_requirements
    });
  } catch (error) {
    console.error("Error getting requirements by program ID:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Get requirements by event ID
const getRequirementsByEventId = async (req, res) => {
  const { event_id } = req.params;
  
  try {
    const event = await Event.findOne({
      where: { event_id: event_id },
      include: [
        {
          model: Requirements,
          as: "event_requirements"
        }
      ]
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found!" });
    }

    return res.status(200).json({
      event_id: event.event_id,
      event_name: event.name,
      requirements: event.event_requirements
    });
  } catch (error) {
    console.error("Error getting requirements by event ID:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Update requirements by ID
const updateRequirements = async (req, res) => {
  const { requirements_id } = req.params;
  const {
    past_experience,
    education_level,
    max_income_level,
    min_income,
    max_age,
    min_age,
    gender,
    experience_Level,
    city,
    zipcode,
    radius
  } = req.body;

  try {
    const requirements = await Requirements.findOne({
      where: { requirements_id: requirements_id }
    });

    if (!requirements) {
      return res.status(404).json({ message: "Requirements not found!" });
    }

    // Update only provided fields
    if (past_experience !== undefined) requirements.past_experience = past_experience;
    if (education_level !== undefined) requirements.education_level = education_level;
    if (max_income_level !== undefined) requirements.max_income_level = max_income_level;
    if (min_income !== undefined) requirements.min_income = min_income;
    if (max_age !== undefined) requirements.max_age = max_age;
    if (min_age !== undefined) requirements.min_age = min_age;
    if (gender !== undefined) requirements.gender = gender;
    if (experience_Level !== undefined) requirements.experience_Level = experience_Level;
    if (city !== undefined) requirements.city = city;
    if (zipcode !== undefined) requirements.zipcode = zipcode;
    if (radius !== undefined) requirements.radius = radius;

    await requirements.save();

    return res.status(200).json({
      message: "Requirements updated successfully!",
      requirements: requirements
    });
  } catch (error) {
    console.error("Error updating requirements:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Update requirements by program ID
const updateRequirementsByProgramId = async (req, res) => {
  const { program_id } = req.params;
  const {
    past_experience,
    education_level,
    max_income_level,
    min_income,
    max_age,
    min_age,
    gender,
    experience_Level,
    city,
    zipcode,
    radius
  } = req.body;

  try {
    const program = await Program.findOne({
      where: { program_id: program_id },
      include: [
        {
          model: Requirements,
          as: "program_requirements"
        }
      ]
    });

    if (!program) {
      return res.status(404).json({ message: "Program not found!" });
    }

    if (!program.program_requirements || program.program_requirements.length === 0) {
      return res.status(404).json({ message: "No requirements found for this program!" });
    }

    const requirements = program.program_requirements[0];

    // Update only provided fields
    if (past_experience !== undefined) requirements.past_experience = past_experience;
    if (education_level !== undefined) requirements.education_level = education_level;
    if (max_income_level !== undefined) requirements.max_income_level = max_income_level;
    if (min_income !== undefined) requirements.min_income = min_income;
    if (max_age !== undefined) requirements.max_age = max_age;
    if (min_age !== undefined) requirements.min_age = min_age;
    if (gender !== undefined) requirements.gender = gender;
    if (experience_Level !== undefined) requirements.experience_Level = experience_Level;
    if (city !== undefined) requirements.city = city;
    if (zipcode !== undefined) requirements.zipcode = zipcode;
    if (radius !== undefined) requirements.radius = radius;

    await requirements.save();

    return res.status(200).json({
      message: "Program requirements updated successfully!",
      program_id: program.program_id,
      program_name: program.name,
      requirements: requirements
    });
  } catch (error) {
    console.error("Error updating program requirements:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Update requirements by event ID
const updateRequirementsByEventId = async (req, res) => {
  const { event_id } = req.params;
  const {
    past_experience,
    education_level,
    max_income_level,
    min_income,
    max_age,
    min_age,
    gender,
    experience_Level,
    city,
    zipcode,
    radius
  } = req.body;

  try {
    const event = await Event.findOne({
      where: { event_id: event_id },
      include: [
        {
          model: Requirements,
          as: "event_requirements"
        }
      ]
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found!" });
    }

    if (!event.event_requirements || event.event_requirements.length === 0) {
      return res.status(404).json({ message: "No requirements found for this event!" });
    }

    const requirements = event.event_requirements[0];

    // Update only provided fields
    if (past_experience !== undefined) requirements.past_experience = past_experience;
    if (education_level !== undefined) requirements.education_level = education_level;
    if (max_income_level !== undefined) requirements.max_income_level = max_income_level;
    if (min_income !== undefined) requirements.min_income = min_income;
    if (max_age !== undefined) requirements.max_age = max_age;
    if (min_age !== undefined) requirements.min_age = min_age;
    if (gender !== undefined) requirements.gender = gender;
    if (experience_Level !== undefined) requirements.experience_Level = experience_Level;
    if (city !== undefined) requirements.city = city;
    if (zipcode !== undefined) requirements.zipcode = zipcode;
    if (radius !== undefined) requirements.radius = radius;

    await requirements.save();

    return res.status(200).json({
      message: "Event requirements updated successfully!",
      event_id: event.event_id,
      event_name: event.name,
      requirements: requirements
    });
  } catch (error) {
    console.error("Error updating event requirements:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Delete requirements by ID
const deleteRequirements = async (req, res) => {
  const { requirements_id } = req.params;

  try {
    const requirements = await Requirements.findOne({
      where: { requirements_id: requirements_id }
    });

    if (!requirements) {
      return res.status(404).json({ message: "Requirements not found!" });
    }

    await requirements.destroy();

    return res.status(200).json({
      message: "Requirements deleted successfully!"
    });
  } catch (error) {
    console.error("Error deleting requirements:", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllRequirements,
  getRequirementsById,
  getRequirementsByProgramId,
  getRequirementsByEventId,
  updateRequirements,
  updateRequirementsByProgramId,
  updateRequirementsByEventId,
  deleteRequirements
}; 
import axios from "axios";

/**
 * Update requirements for an entity (event, program, resource)
 * @param {Object} params - Parameters for updating requirements
 * @param {string} params.entity_type - The entity type ('events', 'programs', 'resources')
 * @param {string} params.entity_id - The entity ID
 * @param {Object} params.requirements - The requirements object
 * @param {boolean} params.requirements.past_experience - Whether past experience is required
 * @param {string} params.requirements.education_level - Required education level
 * @param {number} params.requirements.max_income_level - Maximum income level
 * @param {number} params.requirements.min_income - Minimum income
 * @param {number} params.requirements.max_age - Maximum age
 * @param {number} params.requirements.min_age - Minimum age
 * @param {string} params.requirements.gender - Required gender
 * @param {string} params.requirements.experience_level - Required experience level
 * @param {string} params.requirements.city - Required city
 * @param {number} params.requirements.zipcode - Required zipcode
 * @param {string} params.requirements.radius - Search radius
 * @param {string} params.user_id - The user ID making the update
 * @returns {Promise} - API response
 */
export async function updateRequirements({
  entity_type,
  entity_id,
  requirements,
  user_id,
}) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;

  const results = axios({
    config,
    method: "PUT",
    data: {
      past_experience: requirements.past_experience,
      education_level: requirements.education_level,
      max_income_level: requirements.max_income_level,
      min_income: requirements.min_income,
      max_age: requirements.max_age,
      min_age: requirements.min_age,
      gender: requirements.gender,
      experience_Level: requirements.experience_Level,
      city: requirements.city,
      zipcode: requirements.zipcode,
      radius: requirements.radius,
      user_id: user_id,
    },
    url: `${apiDomain}/requirements/${entity_type}/${entity_id}`,
  }).then((res) => {
    return res.data;
  });
  return results;
}

/**
 * Update requirements for a program
 * @param {Object} params - Parameters for updating program requirements
 * @param {string} params.program_id - The program ID
 * @param {Object} params.requirements - The requirements object
 * @param {string} params.user_id - The user ID making the update
 * @returns {Promise} - API response
 */
export async function updateProgramRequirements({
  program_id,
  requirements,
  user_id,
}) {
  return updateRequirements({
    entity_type: "programs",
    entity_id: program_id,
    requirements,
    user_id,
  });
}

/**
 * Update requirements for an event
 * @param {Object} params - Parameters for updating event requirements
 * @param {string} params.event_id - The event ID
 * @param {Object} params.requirements - The requirements object
 * @param {string} params.user_id - The user ID making the update
 * @returns {Promise} - API response
 */
export async function updateEventRequirements({
  event_id,
  requirements,
  user_id,
}) {
  return updateRequirements({
    entity_type: "events",
    entity_id: event_id,
    requirements,
    user_id,
  });
}

/**
 * Update requirements for a resource
 * @param {Object} params - Parameters for updating resource requirements
 * @param {string} params.resource_id - The resource ID
 * @param {Object} params.requirements - The requirements object
 * @param {string} params.user_id - The user ID making the update
 * @returns {Promise} - API response
 */
export async function updateResourceRequirements({
  resource_id,
  requirements,
  user_id,
}) {
  return updateRequirements({
    entity_type: "resources",
    entity_id: resource_id,
    requirements,
    user_id,
  });
} 
import axios from "axios";

/**
 * Update a category
 * @param {Object} params - Parameters for updating a category
 * @param {string} params.category_id - The category ID to update
 * @param {string} params.name - The new category name
 * @param {string} params.description - The new category description (optional)
 * @param {string} params.type - The new category type (optional)
 * @returns {Promise} - API response
 */
export async function updateCategory({ category_id, name, description, type }) {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  
  // Build data object with only provided fields
  const data = {};
  if (name !== undefined) data.name = name;
  if (description !== undefined) data.description = description;
  if (type !== undefined) data.type = type;

  const res = axios({
    method: "PUT",
    data: data,
    url: `${apiDomain}/categories/${category_id}`,
  }).then((res) => {
    return res.data;
  });

  return res;
} 
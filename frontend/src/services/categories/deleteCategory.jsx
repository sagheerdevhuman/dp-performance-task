import axios from "axios";

/**
 * Delete a category
 * @param {Object} params - Parameters for deleting a category
 * @param {string} params.category_id - The category ID to delete
 * @returns {Promise} - API response
 */
export async function deleteCategory({ category_id }) {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = await axios
    .delete(`${apiDomain}/categories/${category_id}/delete`)
    .then((res) => {
      return res.data;
    });

  return res;
} 
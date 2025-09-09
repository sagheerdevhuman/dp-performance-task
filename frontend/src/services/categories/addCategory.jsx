import axios from "axios";

/**
 * Add a new category
 * @param {Object} params - Parameters for adding a category
 * @param {string} params.name - The category name
 * @returns {Promise} - API response
 */
export async function addCategory({ name }) {
  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
  const res = axios({
    method: "POST",
    data: {
      title: name,      
    },
    url: `${apiDomain}/category/addCategory/`,
  }).then((res) => {
    return res.data;
  });

  return res;
} 
import axios from "axios";

/**
 * Fetch all categories
 * @returns {Promise} - API response with categories data
 */
export async function getCategories() {
  try {
    const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;
    const res = await axios.get(`${apiDomain}/categories`);
    return res.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    if (error.response) {
      // Server responded with error status
      throw new Error(`Failed to fetch categories: ${error.response.status} ${error.response.statusText}`);
    } else if (error.request) {
      // Network error
      throw new Error("Network error: Unable to connect to server");
    } else {
      // Other error
      throw new Error(`Error fetching categories: ${error.message}`);
    }
  }
} 
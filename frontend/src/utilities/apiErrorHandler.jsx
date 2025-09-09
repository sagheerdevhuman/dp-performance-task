/**
 * Utility functions for handling API errors consistently
 */

/**
 * Handle axios errors and return user-friendly error messages
 * @param {Error} error - The error object from axios
 * @param {string} operation - Description of what operation failed
 * @returns {string} User-friendly error message
 */
export const handleApiError = (error, operation = "operation") => {
  console.error(`Error in ${operation}:`, error);
  
  if (error.response) {
    // Server responded with error status
    const status = error.response.status;
    const statusText = error.response.statusText;
    
    switch (status) {
      case 400:
        return `Invalid request: ${statusText}`;
      case 401:
        return "Authentication required. Please log in again.";
      case 403:
        return "Access denied. You don't have permission to perform this action.";
      case 404:
        return "The requested resource was not found.";
      case 429:
        return "Too many requests. Please try again later.";
      case 500:
        return "Server error. Please try again later.";
      case 502:
        return "Service temporarily unavailable. Please try again later.";
      case 503:
        return "Service temporarily unavailable. Please try again later.";
      default:
        return `Server error (${status}): ${statusText}`;
    }
  } else if (error.request) {
    // Network error
    return "Network error: Unable to connect to server. Please check your internet connection.";
  } else {
    // Other error
    return `Error: ${error.message}`;
  }
};

/**
 * Retry a function with exponential backoff
 * @param {Function} fn - Function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} baseDelay - Base delay in milliseconds
 * @returns {Promise} Promise that resolves with the function result
 */
export const retryWithBackoff = async (fn, maxRetries = 3, baseDelay = 1000) => {
  let lastError;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (attempt === maxRetries) {
        throw lastError;
      }
      
      // Don't retry on client errors (4xx)
      if (error.response && error.response.status >= 400 && error.response.status < 500) {
        throw lastError;
      }
      
      // Wait before retrying with exponential backoff
      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError;
};

/**
 * Validate API response data
 * @param {any} data - Data to validate
 * @param {string} expectedType - Expected type of data
 * @returns {boolean} Whether data is valid
 */
export const validateApiResponse = (data, expectedType = "array") => {
  if (expectedType === "array") {
    return Array.isArray(data);
  } else if (expectedType === "object") {
    return data && typeof data === "object" && !Array.isArray(data);
  } else if (expectedType === "string") {
    return typeof data === "string";
  }
  return true;
}; 
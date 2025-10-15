/**
 * Utility functions for sanitizing user input to prevent XSS attacks
 */

/**
 * Sanitize text content to prevent XSS
 * @param {string} text - Text to sanitize
 * @returns {string} Sanitized text
 */
export const sanitizeText = (text) => {
  if (typeof text !== "string") return "";

  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
};

/**
 * Sanitize HTML content using DOMPurify (if available)
 * @param {string} html - HTML to sanitize
 * @returns {string} Sanitized HTML
 */
export const sanitizeHTML = (html) => {
  if (typeof html !== "string") return "";

  try {
    // If DOMPurify is available, use it
    if (
      typeof window !== "undefined" &&
      window.DOMPurify &&
      typeof window.DOMPurify.sanitize === "function"
    ) {
      return window.DOMPurify.sanitize(html);
    }
  } catch (error) {
    console.warn(
      "DOMPurify sanitization failed, using fallback:",
      error.message
    );
  }

  // Fallback to basic text sanitization
  return sanitizeText(html);
};

/**
 * Sanitize URL to prevent javascript: and data: URLs
 * @param {string} url - URL to sanitize
 * @returns {string} Sanitized URL or empty string if invalid
 */
export const sanitizeURL = (url) => {
  if (typeof url !== "string") return "";

  const trimmedURL = url.trim().toLowerCase();

  // Block dangerous protocols using array for better readability
  const dangerousProtocols = [
    "javascript:",
    "data:",
    "vbscript:",
    "file:",
    "ftp:",
  ];

  if (dangerousProtocols.some((protocol) => trimmedURL.startsWith(protocol))) {
    return "";
  }

  return url.trim();
};

/**
 * Validate and sanitize email address
 * @param {string} email - Email to validate
 * @returns {string} Sanitized email or empty string if invalid
 */
export const sanitizeEmail = (email) => {
  if (typeof email !== "string") return "";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const trimmedEmail = email.trim();

  if (!emailRegex.test(trimmedEmail)) {
    return "";
  }

  return trimmedEmail;
};

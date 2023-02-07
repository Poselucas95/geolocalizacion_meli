export default {
  API_BASE_URI:
    process.env.ENVIRONMENT === "production"
      ? "api/api"
      : "http://127.0.0.1:3001/api",
};

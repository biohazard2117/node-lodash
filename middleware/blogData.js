const axios = require("axios");

const api_request = async (req, res, next) => {
  const url = "https://intent-kit-16.hasura.app/api/rest/blogs";
  const headers = {
    "x-hasura-admin-secret":
      "32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6",
  };

  try {
    const response = await axios.get(url, { headers });
    req.data = response.data;
    next();
  } catch (err) {
    console.error("Error updating user", err);
    throw err;
  }
};

module.exports = {
  api_request,
};

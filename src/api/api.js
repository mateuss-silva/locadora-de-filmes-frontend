import axios from "axios";

const api = axios.create({
  baseURL: "https://db-locadora:3306/api/",
  useDefaultAuth: true,
  prettyJson: true,
  enableCors: true,
  defaultHeaders: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  },
});

export default api;
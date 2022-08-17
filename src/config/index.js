export const env = process.env.REACT_APP_ENV || 'A';

const config = require(`./${env}`).default;
export default config;
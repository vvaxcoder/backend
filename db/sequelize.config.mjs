/* eslint-disable import/no-anounymous default export */
export const options = {
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: "postgres",
  logging: process.env.NODE_ENV === "development" ? console.log : false,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
};

if (process.env.NODE_ENV === "production") {
    options.dialectOptions = {
        ssl: {
            rejectUnathorized: true,
        }
    };
}

export default {
    development: options,
    test: options,
    production: options,
}
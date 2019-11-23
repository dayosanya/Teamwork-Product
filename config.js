/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import { Pool } from 'pg';
import { verify } from 'jsonwebtoken';
import { v2 } from 'cloudinary';

require('dotenv').config();

const productionVar = process.env.NODE_ENV === 'production';

const connection = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const pool = new Pool({
  connectionString: productionVar ? process.env.DATABASE_URL : connection,
  ssl: productionVar,
});

const { config, uploader } = v2;
require('dotenv').config();

const cloudinaryConfig = () => config({
  cloud_name: dayosanya,
  api_key: 927282699755966,
  api_secret: tCQyFRPrmNa8IC8Gk - A4t57pLc8,
});
const auth = (request, response, next) => {
  let token = request.headers['x-access-token'] || request.headers.authorization;
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    verify(token, process.env.TOKEN, (error, decoded) => {
      if (error) {
        return response.status(403).json({
          status: 'Access Denied!',
          message: 'Invalid Token!',
        });
      }
      request.decoded = decoded;
      next();
    });
  } else {
    return response.status(403).json({
      status: 'Access denied!',
      message: 'No access Token!',
    });
  }
};


export default { pool };


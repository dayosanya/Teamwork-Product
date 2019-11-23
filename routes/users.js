/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
import { hash as _hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { pool } from '../pgconnect';

require('dotenv').config();

export function signup(request, response) {
  _hash(request.body.password, 10)
    .then((hash) => {
      const values = [request.body.username, request.body.firstname, request.body.lastname, request.body.email, hash, request.body.genderid, request.body.departmentid, request.body.jobrole_id, request.body.address];
      pool.query(`INSERT INTO users (username, firstname, lastname, email, password, genderid, departmentid, roleid, address, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, now())`, [...values], (error) => {
        if (error) {
          response.status(400).json({
            message: 'Failed to create User!',
          });
        } else {
          response.send({
            status: 'Success',
            message: 'User created successfully!',
          });
        }
      });
    }).catch((error) => {
      response.status(500).json({ error });
    });
}

export function login(request, response) {
  try {
    const values = request.body.email;
    pool.query('SELECT u.userid, u.email, u.password FROM users u WHERE u.email = $1 LIMIT 1', [values], (error, results) => {
      if (results.rows.length === 0) {
        console.log(error);
        return response.json({
          error: 'Invalid email',
        });
      }

      const token = sign(
        { userId: request.body.userid },
        process.env.TOKEN,
        { expiresIn: '24h' },
      );


      compare(request.body.password, results.rows[0].password, (_error, result) => {
        if (result === false) {
          return response.send({
            status: 'Failed!',
            error: 'Invalid password',
          });
        }

        return response.json({
          status: 'Success!',
          message: 'Log in Successful!',
          token,
          userid: results.rows[0].userid,
        });
      });
    });
  } catch (error) {
    return response.send({
      error: 'Ooops... Something went wrong!',
    });
  }
}

import generateAuthToken from '../db/auth';
import checkIfUserNameExists from '../db/checkIfUserNameExists';
import getUserRole from '../db/get-user-role';
import hashPassword from '../utils/hash-password';
import addUserDetails from '../db/add-user-details';
import express from 'express';

export default async function(req: express.Request,
                              res:express.Response,
                              validationResult: (req: Express.Request) => { isEmpty: () => {}}) {
  try {
    // check validation result
    const errors = validationResult(req);
    // unhash password from DB
    if(errors.isEmpty()) {
      const { username, password } = req.body;
      const token = await generateAuthToken();

      if(token) {

      } else {
        res.status(400).json({ message: 'Token Service Unavailable - Cannot Generate Auth Token' });
      }

    } else {
      res.status(400).json({ message: 'unsafe input' });
    }
    // check if the user details match
    // if they match send appropriate response with appropriate viewing permissions

  }
  catch (error) {
    console.error('Error during request handling:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
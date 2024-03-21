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
    const errors = validationResult(req);

    if( errors.isEmpty() ) {
      const { username, password } = req.body;
      const { role } = req.params;
      const token = await generateAuthToken();

      if(token) {
        const usernameExists = await checkIfUserNameExists(username);

        if(usernameExists) {
          return res.status(409).json({ error: 'username already exists' });
        }
        else {
          const userRole = getUserRole(role || '');
          const hashedPassword = await hashPassword(password);
          const userDetails = {
            password: hashedPassword,
            roles: [userRole],
            username
          }

          await addUserDetails(userDetails)

          res.writeHead(201);
          res.end(JSON.stringify({ message: 'User Registered Successfully' }));
        }
      }
    } else {
      res.status(400).json({ message: 'unsafe input' })
    }
  }
  catch (error) {
    console.error('Error during request handling:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
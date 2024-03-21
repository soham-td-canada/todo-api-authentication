import express from 'express';
import bodyParser from 'body-parser'
import { body, validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';
import register from './routes/register';
import login from './routes/login';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// validate inputs - more of a FE thingy

// use https - vercel or heroku should be able to give that


// Create a rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later."
});

// Apply the rate limiter to all requests
app.use(limiter);


app.post('/api/auth/register/:role?', [
  body('username').trim().isAlphanumeric().withMessage('Username must be alphanumeric'),
  body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], async ( req: express.Request, res: express.Response ) => {
    return register(req, res, validationResult)
});

app.post('/api/auth/login', [
  body('username').trim().isAlphanumeric().withMessage('Username must be alphanumeric'),
  body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], async ( req: express.Request, res: express.Response ) => {
  return login(req, res, validationResult)
});

const PORT = 7230;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
})
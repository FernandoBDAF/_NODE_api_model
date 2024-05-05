import express from 'express';
import {router} from './router';
import morgan from 'morgan';
import cors from 'cors';
import { protect } from './modules/auth';
import { createUser, signin } from './handlers/user';

declare module 'express-serve-static-core' {
  interface Request {
    shhhh_secret?: string;  // Make it optional or required based on your use case
  }
}

export const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.json({message: "Hello world"});
})

app.use("/api", protect, router);

app.post("/user", createUser)
app.post("/signin", signin)

app.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401).json({message: "Unauthorized"});
  } else if (err.type === "input") {
    res.status(400).json({message: "Invalid input"});
  } else {
    res.status(500).json({message: "Internal Server Error"});
  }
})
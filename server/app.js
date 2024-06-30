import express from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import cors from "cors";
import { userRouter } from "./modules/user/routes/user-routes.js";
import { dbConnectionLoad } from "./shared/sharedDB/connection.js";
dotenv.config();

const app = express();
app.use(cors(
  {
    origin:[ "https://restaurant-app-ine.vercel.app","http://localhost:5173","http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }
));
app.use(express.json());
// app.get("/", (req, res) => {
//   res.send("server is up and running");
// })
app.use("/", userRouter); 
//middleware it just a function

app.use("*", (req, res) => { 
  res.status(404).send("heloo page not found");
} )
const promise = dbConnectionLoad();

promise
  .then((result) => {
    console.log("db connection build");
    const server = app.listen(process.env.PORT,process.env.HOST, (err) => {
      if (err) {
        chalk.red(err);
      } else {
        console.log(
          chalk.green("server is running on port ", server.address().port)
        );
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });

import express from "express"
import colors from "colors"
import dotenv from "dotenv"
import connectDB from "./config/connectDB.js";
import cors from "cors"
import morgan from "morgan"
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js"
import otpRoutes from "./routes/otpRoutes.js"
import flightRoutes from "./routes/flightRoutes.js"

import path from "path";
import { fileURLToPath } from "url";

export const app = express();

dotenv.config();
connectDB();

app.use(express.static('uploads'));  
//ES module fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const buildpath = path.join(__dirname, "../client/dist")
app.use(express.static(buildpath));

//middleware

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));



//routing
app.use('/api/v1/flights', flightRoutes);  
app.use("/api/v1/otp", otpRoutes);
app.use("/api/v1/auth", authRoutes);

app.use("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });



app.use("/api/v1/otp", (req, res) => {
    res.send("welcome");
})
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`.bgCyan.white);
})
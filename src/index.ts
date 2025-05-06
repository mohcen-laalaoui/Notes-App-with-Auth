import express from "express";
import authRoutes from "./routes/authRoutes";; 

const app = express();

app.use(express.json());

// Use the router for authentication routes
app.use("/auth", authRoutes); // Now all /auth/signup and /auth/login will work

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

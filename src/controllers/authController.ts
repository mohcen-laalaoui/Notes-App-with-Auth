import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Fake in-memory database
const users: any[] = [];

export const signup = (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = { username, email, password: hashedPassword };
    users.push(newUser);
    res.status(201).json({ message: "User created successfully" });
};

export const login = (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = users.find((user) => user.email === email);

    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ email }, "secret", { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
};

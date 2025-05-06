import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

const PORT = 3000;




app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';  
import authRoutes from './routes/authRoutes';
import notesRoutes from './routes/notesRoutes';

const app = express();
app.use(express.json());
app.use(bodyParser.json());
const PORT = 3000;

app.use('/auth' , authRoutes)



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

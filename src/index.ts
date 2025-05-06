import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

const PORT = 3000;

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

let todos: Todo[] = [
  { id: 1, title: 'Learn REST', completed: false },
  { id: 2, title: 'Build a TypeScript API', completed: false },
];

// GET all todos
app.get('/todos', (req: Request, res: Response) => {
  res.json(todos);
});

// GET single todo
app.get('/todos/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  todo ? res.json(todo) : res.status(404).json({ error: 'Not found' });
});

// POST new todo
app.post('/todos', (req: Request, res: Response) => {
  const { title, completed = false } = req.body;
  const newTodo: Todo = {
    id: todos.length + 1,
    title,
    completed
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT update todo
app.put('/todos/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  if (index !== -1) {
    todos[index] = { ...todos[index], ...req.body };
    res.json(todos[index]);
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

// DELETE todo
app.delete('/todos/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  if (index !== -1) {
    const deleted = todos.splice(index, 1);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

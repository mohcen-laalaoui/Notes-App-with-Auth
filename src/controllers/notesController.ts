import { Request, Response } from 'express';

// Fake in-memory notes store (use a database in a real app)
const notes: any[] = [];

// Create a note
export const createNote = (req: Request, res: Response) => {
  const { title, content } = req.body;

  const newNote = {
    id: notes.length + 1,
    title,
    content,
    userId: req.user.username, 
  };

  notes.push(newNote);
  res.status(201).json(newNote);
};

// Get all notes for the authenticated user
export const getAllNotes = (req: Request, res: Response) => {
  const userNotes = notes.filter(note => note.userId === req.user.username);
  res.json(userNotes);
};

// Get a single note by ID
export const getNote = (req: Request, res: Response) => {
  const note = notes.find(n => n.id === parseInt(req.params.id) && n.userId === req.user.username);
  
  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }

  res.json(note);
};

// Update a note by ID
export const updateNote = (req: Request, res: Response) => {
  const note = notes.find(n => n.id === parseInt(req.params.id) && n.userId === req.user.username);

  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }

  note.title = req.body.title || note.title;
  note.content = req.body.content || note.content;

  res.json(note);
};

// Delete a note by ID
export const deleteNote = (req: Request, res: Response) => {
  const index = notes.findIndex(n => n.id === parseInt(req.params.id) && n.userId === req.user.username);

  if (index === -1) {
    return res.status(404).json({ error: 'Note not found' });
  }

  const deletedNote = notes.splice(index, 1);
  res.json(deletedNote[0]);
};

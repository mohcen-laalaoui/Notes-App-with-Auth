import { Request, Response } from 'express';

// Fake in-memory notes store (use a database in a real app)
const notes: any[] = [];

// Create a note
export const createNote = (req: Request, res: Response): void => {
  const { title, content } = req.body;
  const newNote = {
    id: notes.length + 1,
    title,
    content,
    userId: req.user?.username,
  };
  notes.push(newNote);
  res.status(201).json(newNote);
};

// Get all notes
export const getAllNotes = (req: Request, res: Response): void => {
  const userNotes = notes.filter(note => note.userId === req.user?.username);
  res.status(200).json(userNotes);
};

// Get a single note
export const getNote = (req: Request, res: Response): void => {
  const note = notes.find(
    n => n.id === parseInt(req.params.id) && n.userId === req.user?.username
  );

  if (!note) {
    res.status(404).json({ error: 'Note not found' });
    return;
  }

  res.status(200).json(note);
};

// Update a note
export const updateNote = (req: Request, res: Response): void => {
  const note = notes.find(
    n => n.id === parseInt(req.params.id) && n.userId === req.user?.username
  );

  if (!note) {
    res.status(404).json({ error: 'Note not found' });
    return;
  }

  note.title = req.body.title || note.title;
  note.content = req.body.content || note.content;

  res.status(200).json(note);
};

// Delete a note
export const deleteNote = (req: Request, res: Response): void => {
  const index = notes.findIndex(
    n => n.id === parseInt(req.params.id) && n.userId === req.user?.username
  );

  if (index === -1) {
    res.status(404).json({ error: 'Note not found' });
    return;
  }

  const deletedNote = notes.splice(index, 1)[0];
  res.status(200).json(deletedNote);
};

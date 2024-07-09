import { Request, Response } from 'express';
import { taskModel } from '../models';
import { Task } from '../models/task';

interface CreateTaskRequest extends Request {
  body: {
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
  };
}

interface UpdateTaskRequest extends Request {
  body: Partial<Task>;
}

export const getTasks = async (req: Request, res: Response): Promise<Response> => {
  const { status, priority } = req.query;
  const tasks = await taskModel.getAllTasks();
  const filteredTasks = tasks.filter(task => {
    return (!status || task.status === status) && (!priority || task.priority === priority);
  });
  return res.json(filteredTasks);
};

export const getTaskById = async (req: Request, res: Response): Promise<Response> => {
  const task = await taskModel.getTaskById(req.params.id);
  if (task) {
    return res.json(task);
  } else {
    return res.status(404).json({ message: 'Task not found' });
  }
};

export const createTask = async (req: CreateTaskRequest, res: Response): Promise<Response> => {
  const newTask: Task = { id: Date.now().toString(), ...req.body };
  await taskModel.addTask(newTask);
  return res.status(201).json(newTask);
};

export const updateTask = async (req: UpdateTaskRequest, res: Response): Promise<Response> => {
  const updatedTask = req.body;
  const task = await taskModel.getTaskById(req.params.id);
  if (task) {
    await taskModel.updateTask(req.params.id, updatedTask);
    return res.json({ message: 'Task updated' });
  } else {
    return res.status(404).json({ message: 'Task not found' });
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<Response> => {
  const task = await taskModel.getTaskById(req.params.id);
  if (task) {
    await taskModel.deleteTask(req.params.id);
    return res.json({ message: 'Task deleted' });
  } else {
    return res.status(404).json({ message: 'Task not found' });
  }
};

export const patchTask = async (req: UpdateTaskRequest, res: Response): Promise<Response> => {
  const updatedFields = req.body;
  const task = await taskModel.getTaskById(req.params.id);
  if (task) {
    await taskModel.updateTask(req.params.id, updatedFields);
    return res.json({ message: 'Task updated' });
  } else {
    return res.status(404).json({ message: 'Task not found' });
  }
};

import fs from 'fs/promises';
import path from 'path';

const dataPath = path.join(__dirname, '../data/task.json');

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
}

const readJSONFile = async (): Promise<Task[]> => {
  try {
    const data = await fs.readFile(dataPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading tasks.json:', error);
    return [];
  }
};

const writeJSONFile = async (data: Task[]): Promise<void> => {
  try {
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing tasks.json:', error);
  }
};

export const getAllTasks = async (): Promise<Task[]> => {
  return await readJSONFile();
};

export const getTaskById = async (id: string): Promise<Task | undefined> => {
  const tasks = await readJSONFile();
  return tasks.find(task => task.id === id);
};

export const addTask = async (task: Task): Promise<void> => {
  const tasks = await readJSONFile();
  tasks.push(task);
  await writeJSONFile(tasks);
};

export const updateTask = async (id: string, updatedTask: Partial<Task>): Promise<void> => {
  const tasks = await readJSONFile();
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updatedTask };
    await writeJSONFile(tasks);
  }
};

export const deleteTask = async (id: string): Promise<void> => {
  const tasks = await readJSONFile();
  const filteredTasks = tasks.filter(task => task.id !== id);
  await writeJSONFile(filteredTasks);
};

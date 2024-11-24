import fs from 'fs/promises';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const usersFilePath = path.join(__dirname, '../data/users.json');

export async function findUserByUsername(username) {
  const data = await fs.readFile(usersFilePath, 'utf8');
  const { users } = JSON.parse(data);
  return users.find(user => user.username === username);
}

export async function createUser(username, password) {
  const data = await fs.readFile(usersFilePath, 'utf8');
  const { users } = JSON.parse(data);
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: Date.now().toString(),
    username,
    password: hashedPassword,
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  await fs.writeFile(usersFilePath, JSON.stringify({ users }, null, 2));
  return newUser;
}

export async function verifyPassword(user, password) {
  return bcrypt.compare(password, user.password);
}
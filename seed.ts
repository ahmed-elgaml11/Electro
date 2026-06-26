import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './src/api/auth/auth.model';
import { Project } from './src/api/projects/projects.model';
import { Task } from './src/api/tasks/tasks.model';
import bcrypt from 'bcrypt';

dotenv.config({ path: './.env' }); 

const seedDB = async () => {
  try {
    const mongoUri = process.env.DATABASE || 'mongodb://localhost:27017/todoapp';
    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected for Seeding');

    // Clear existing data
    await User.deleteMany();
    await Project.deleteMany();
    await Task.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    // Create Admin
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'Admin',
    });

    // Create Member
    const member = await User.create({
      name: 'Member User',
      email: 'member@example.com',
      password: hashedPassword,
      role: 'Member',
    });

    // Create a project for Member
    const project1 = await Project.create({
      title: 'Member Project',
      description: 'This is a project created by the member.',
      status: 'pending',
      owner: member._id,
    });

    // Create a task in that project
    await Task.create({
      title: 'First Task',
      description: 'First task for member project',
      status: 'pending',
      priority: 'high',
      dueDate: new Date(Date.now() + 86400000), // tomorrow
      project: project1._id,
    });

    console.log('Database Seeded Successfully!');
    console.log('Admin Email: admin@example.com | Password: password123');
    console.log('Member Email: member@example.com | Password: password123');
    process.exit(0);
  } catch (err) {
    console.error('Seeding Failed:', err);
    process.exit(1);
  }
};

seedDB();

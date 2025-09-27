import mongoose from 'mongoose';
import User from '../models/User';
import Issue from '../models/Issue';
import dotenv from 'dotenv';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/issue_tracker');
    
    // Clear existing data
    await User.deleteMany({});
    await Issue.deleteMany({});

    // Create demo user
    const user = await User.create({
      email: 'admin@test.com',
      password: '123456'
    });

    // Create demo issues
    await Issue.create([
      {
        title: 'Login page not responsive',
        description: 'The login form breaks on mobile devices',
        status: 'open',
        priority: 'high',
        createdBy: user._id
      },
      {
        title: 'Add dark mode',
        description: 'Users are requesting a dark theme option',
        status: 'in_progress',
        priority: 'medium',
        createdBy: user._id
      },
      {
        title: 'Fix typo in footer',
        description: 'There is a spelling mistake in the footer text',
        status: 'closed',
        priority: 'low',
        createdBy: user._id
      }
    ]);

    console.log('Seed data created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedData();
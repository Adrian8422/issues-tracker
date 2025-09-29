import { connectDB, disconnectDB } from '../config/database';

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await disconnectDB();
});
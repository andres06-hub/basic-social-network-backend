import { config } from 'dotenv';

config({ path: 'app.env' });

export const JWTKEYS = {
  secret: process.env.JWT_SECRET,
};

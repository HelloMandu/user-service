import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  KEY: process.env.JWT_SECRET_KEY,
}));

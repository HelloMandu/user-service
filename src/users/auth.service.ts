import authConfig from '../config/auth.config';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { UserInfo } from './UserInfo';

@Injectable()
export class AuthService {
  constructor(
    @Inject(authConfig.KEY) private config: ConfigType<typeof authConfig>,
  ) {}

  login(user: UserInfo) {
    return jwt.sign(user, this.config.KEY, { expiresIn: '1d' });
  }
}

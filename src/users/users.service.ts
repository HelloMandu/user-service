import * as uuid from 'uuid';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { EmailService } from 'src/email/email.service';
import { UserInfo } from './UserInfo';
import { UserEntity } from './entity/user.entity';
import { AuthService } from './auth.service';

@Injectable()
export class UsersService {
  constructor(
    private emailService: EmailService,
    private authService: AuthService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private dataSource: DataSource,
  ) {}

  async createUser(
    name: string,
    email: string,
    password: string,
  ): Promise<void> {
    const userExist = await this.checkUserExists(email);
    if (userExist) {
      throw new Error('이미 가입된 이메일입니다.');
    }

    const signupVerifyToken = uuid.v1();

    await this.saveUser(name, email, password, signupVerifyToken);
    await this.sendMemberJoinEmail(email, signupVerifyToken);
  }

  private async checkUserExists(email: string): Promise<boolean> {
    return !!(await this.userRepository.findOne({ where: { email } }));
  }

  private async saveUser(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ): Promise<UserEntity> {
    const user = new UserEntity();
    user.name = name;
    user.email = email;
    user.password = password;
    user.signupVerifyToken = signupVerifyToken;

    return await this.userRepository.save(user);
  }

  private async sendMemberJoinEmail(
    email: string,
    signupVerifyToken: string,
  ): Promise<void> {
    await this.emailService.sendMemberJoinVerification(
      email,
      signupVerifyToken,
    );
  }

  async verifyEmail(signupVerifyToken: string): Promise<string> {
    const user = await this.userRepository.findOne({
      where: { signupVerifyToken },
    });
    if (!user) {
      throw new Error('가입되지 않은 이메일입니다.');
    }
    return this.authService.login({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findOne({
      where: { email, password },
    });
    if (!user) {
      throw new Error('가입되지 않은 이메일입니다.');
    }
    return this.authService.login(user);
  }

  async getUserInfo(userId: string): Promise<UserInfo> {
    // 1. userId를 가진 유저가 존재하는지 DB에서 확인하고 없다면 에러 처리
    // 2. 조회된 데이터를 UserInfo 타입으로 응답

    throw new Error('Method not implemented.');
  }

  // private async saveUserUsingQueryRunner(
  //   name: string,
  //   email: string,
  //   password: string,
  //   signupVerifyToken: string,
  // ): Promise<void> {
  //   const queryRunner = this.dataSource.createQueryRunner();
  //
  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();
  //
  //   try {
  //     const user = new UserEntity();
  //     user.name = name;
  //     user.email = email;
  //     user.password = password;
  //     user.signupVerifyToken = signupVerifyToken;
  //
  //     await queryRunner.manager.save(user);
  //
  //     await queryRunner.commitTransaction();
  //   } catch (err) {
  //     await queryRunner.rollbackTransaction();
  //   } finally {
  //     await queryRunner.release();
  //   }
  // }
  //
  // private async saveUserUsingTransaction(
  //   name: string,
  //   email: string,
  //   password: string,
  //   signupVerifyToken: string,
  // ): Promise<void> {
  //   await this.dataSource.transaction(async (manager) => {
  //     const user = new UserEntity();
  //     user.name = name;
  //     user.email = email;
  //     user.password = password;
  //     user.signupVerifyToken = signupVerifyToken;
  //     await manager.save(user);
  //   });
  // }
}

import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('User')
export class UserEntity {
  @PrimaryColumn()
  id: number;

  @Column({ length: 300 })
  name: string;

  @Column({ length: 60 })
  email: string;

  @Column({ length: 30 })
  password: string;

  @Column({ length: 60 })
  signupVerifyToken: string;
}

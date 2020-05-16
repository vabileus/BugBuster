import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserRole } from './../model/user-role.enum';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  username: string;

  @Column({ enum: UserRole, default: UserRole.User })
  userRole?: UserRole;

  @Column()
  userProjectRole: string;
}
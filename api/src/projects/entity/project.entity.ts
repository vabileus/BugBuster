import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/users/entity/user.entity';
import { Bug } from 'src/bugs/entity/bug.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(type => User, user => user.projects)
  user: User;

  @OneToMany(type => Bug, bug => bug.project)
  bugs: Bug[];
}


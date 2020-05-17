import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BugStatus } from '../model/bug-status.enum';
import { Project } from 'src/projects/entity/project.entity';

@Entity()
export class Bug {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column({
    type: 'enum',
    enum: BugStatus,
    default: BugStatus.OPEN
  })
  status: BugStatus;

  @ManyToOne(type => Project, project => project.bugs)
  project: Project;
}


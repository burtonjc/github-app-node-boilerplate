import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { Installation } from './installation';

@Entity()
export class InstallationAccessToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('timestamp')
  expiresAt: Date;

  @ManyToOne(type => Installation)
  installation: number;

  @Column()
  token: string;
}

import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Installation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  githubAccountId: string;

  @Column()
  installationId: string;
}

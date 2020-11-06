import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import User from "../models/User";
@Entity("tasks")
export default class Tasks {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  due_date: string;

  @Column()
  has_finished: boolean;

  @Column()
  is_archived: boolean;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({name: 'user_id'})
  user_id: User
}

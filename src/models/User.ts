import {Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, JoinColumn} from 'typeorm';
import bcrypt from 'bcryptjs';
import Tasks from './Task';
@Entity("users")
export default class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @JoinColumn({name: 'user_id'})
  user_id: Tasks;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 14)
  }
}

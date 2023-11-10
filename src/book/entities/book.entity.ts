import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '../../user/entities';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  author: string;

  @Column()
  yearOfPublishing: number;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.books)
  user: User;
}

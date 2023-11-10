import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Book } from '../../book/entities';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  displayName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Book, (book) => book.user)
  books?: Book[];
}

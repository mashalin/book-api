import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { Book } from './entities';
import { CreateBookDto, PageOptionsDto, UpdateBookDto } from './dto';
import { IUser } from '../user/interfaces';

export interface IFindAll {
  books: Book[];
  count: number;
}

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async findAll(query: PageOptionsDto): Promise<IFindAll> {
    const [books, count] = await this.bookRepository.findAndCount({
      where: query.author ? { author: Like(`%${query.author}%`) } : undefined,
      order: { id: query.order },
      take: query.take,
      skip: query.skip,
    });
    return {
      books,
      count,
    };
  }

  async findOneById(id: number): Promise<Book | null> {
    return await this.bookRepository.findOneBy({ id });
  }

  async create(user: IUser, dto: CreateBookDto) {
    const createdBook = this.bookRepository.create({ ...dto, user });
    await this.bookRepository.save(createdBook);
    return {
      ...dto,
      userId: createdBook.user.id,
    };
  }

  async update(id: number, dto: UpdateBookDto) {
    await this.bookRepository.update({ id }, dto);
    return { id, ...dto };
  }

  async checkUserAccess(id: number, userId: number): Promise<boolean> {
    const book = await this.bookRepository.findOneBy({
      id,
      user: { id: userId },
    });
    return !!book;
  }

  async delete(id: number) {
    await this.bookRepository.delete({ id });
    return id;
  }
}

import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import { BookService } from './book.service';
import { CreateBookDto, PageOptionsDto, UpdateBookDto } from './dto';
import { JwtAuthGuard } from '../auth/guards';
import { IUser } from '../user/interfaces';

@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  getAll(@Query() query: PageOptionsDto) {
    return this.bookService.findAll(query);
  }

  @Get(':id')
  getOne(@Param() params: { id: number }) {
    return this.bookService.findOneById(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req: { user: IUser }, @Body() dto: CreateBookDto) {
    return this.bookService.create(req.user, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param() params: { id: number },
    @Req() req: { user: IUser },
    @Body() dto: UpdateBookDto,
  ) {
    const hasAccess = await this.bookService.checkUserAccess(
      params.id,
      req.user.id,
    );
    if (!hasAccess) {
      throw new ForbiddenException(['No access']);
    }
    return this.bookService.update(params.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param() params: { id: number }, @Req() req: { user: IUser }) {
    const hasAccess = await this.bookService.checkUserAccess(
      params.id,
      req.user.id,
    );
    if (!hasAccess) {
      throw new ForbiddenException(['No access']);
    }
    return this.bookService.delete(params.id);
  }
}

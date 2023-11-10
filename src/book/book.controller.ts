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
import { JwtAuthGuard } from '../user/guards';
import { IUser } from '../user/interfaces';

@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  getAll(@Query() query: PageOptionsDto) {
    return this.bookService.findAll(query);
  }

  @Get(':id')
  getOne(@Param() params: { id: string }) {
    return this.bookService.findOneById(Number(params.id));
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req: { user: IUser }, @Body() dto: CreateBookDto) {
    return this.bookService.create(req.user, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param() params: { id: string },
    @Req() req: { user: IUser },
    @Body() dto: UpdateBookDto,
  ) {
    const hasAccess = await this.bookService.checkUserAccess(
      Number(params.id),
      req.user.id,
    );
    if (!hasAccess) {
      throw new ForbiddenException(['No access']);
    }
    return this.bookService.update(Number(params.id), dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param() params: { id: string }, @Req() req: { user: IUser }) {
    const hasAccess = await this.bookService.checkUserAccess(
      Number(params.id),
      req.user.id,
    );
    if (!hasAccess) {
      throw new ForbiddenException(['No access']);
    }
    return this.bookService.delete(Number(params.id));
  }
}

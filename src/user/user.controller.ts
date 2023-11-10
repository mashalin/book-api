import {
  Body,
  ConflictException,
  Controller,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';

import { UserService } from './user.service';
import { RegisterDto, LoginDto } from './dto';
import { AuthService } from './auth.service';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('/login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.validateUser(dto);
    if (!user) {
      throw new UnauthorizedException(['Incorrect email or password']);
    }
    const tokens = await this.authService.generateTokens(user);
    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return tokens;
  }

  @Post('/register')
  async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const candidate = await this.userService.findOneByEmail(dto.email);
    if (candidate) {
      throw new ConflictException(['User with this email already exists']);
    }
    const tokens = await this.authService.register(dto);
    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return tokens;
  }
}

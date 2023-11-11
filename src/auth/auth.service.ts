import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { UserService } from '../user/user.service';
import { LoginDto, RegisterDto } from '../user/dto';
import { User } from '../user/entities';
import { IJwtData } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async register(dto: RegisterDto) {
    const hashPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.userService.create({
      ...dto,
      password: hashPassword,
    });
    const userData = await this.generateTokens(user);
    return userData;
  }

  async generateTokens(user: User) {
    const payload: IJwtData = {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
    };
    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '5m' }),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '30d' }),
    };
  }

  async validateUser(dto: LoginDto) {
    const user = await this.userService.findOneByEmail(dto.email);
    const passwordEquals = await bcrypt.compare(dto.password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    return null;
  }
}

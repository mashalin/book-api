import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entities';
import { JwtStrategy } from './strategies';
import { getJwtConfig } from '../configs';
import { AuthService } from './auth.service';

@Module({
  controllers: [UserController],
  providers: [UserService, JwtStrategy, AuthService],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync(getJwtConfig()),
  ],
})
export class UserModule {}

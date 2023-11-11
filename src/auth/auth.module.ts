import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { JwtStrategy } from './strategies';
import { AuthService } from './auth.service';
import { getJwtConfig } from '../configs';
import { UserModule } from '../user/user.module';

@Module({
  providers: [JwtStrategy, AuthService],
  imports: [
    JwtModule.registerAsync(getJwtConfig()),
    forwardRef(() => UserModule),
  ],
  exports: [AuthService],
})
export class AuthModule {}

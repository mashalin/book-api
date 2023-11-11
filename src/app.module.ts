import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { getTypeOrmConfig } from './configs';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRootAsync(getTypeOrmConfig()),
    UserModule,
    BookModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

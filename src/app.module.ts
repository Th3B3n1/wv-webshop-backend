import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './endpoints/products/products.module';
import { UsersModule } from './endpoints/users/users.module';
import { CartModule } from './endpoints/cart/cart.module';
import { LoginModule } from './endpoints/login/login.module';
import { RegisterModule } from './endpoints/register/register.module';
import { SecretService } from './auth/secret/secret.service';
import { AccessGuard } from './guards/access.guard';
import { APP_GUARD } from '@nestjs/core';
import { Tokens } from './auth/entities/tokens.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: 'test',
      password: 'test',
      database: 'wv-webshop',
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([Tokens]),
    ProductsModule,
    UsersModule,
    CartModule,
    LoginModule,
    RegisterModule,
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: AccessGuard,
  }, SecretService],
})
export class AppModule { }

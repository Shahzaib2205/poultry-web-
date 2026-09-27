import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // ✅ Add this import
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { StockModule } from './stock/stock.module';
import { TodoModule } from './todo/todo.module';
import { BirdModule } from './birds/birds.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'breakfast', // ✅ Change this to your actual database name
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    StockModule,
    TodoModule,
    BirdModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
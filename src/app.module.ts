import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MensagensController } from './mensagens/mensagens.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MensagensService } from './mensagens/mensagens.service';
import { Mensagem } from './mensagens/entities/mensagem.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'mydb',
      password: 'app',
      database: 'sendmeapp_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Mensagem]),
  ],
  controllers: [AppController, MensagensController],
  providers: [AppService, MensagensService],
})
export class AppModule {}

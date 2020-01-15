import { Injectable } from '@nestjs/common';
import { Mensagem } from './entities/mensagem.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CriarMensagemDto } from './dto/criar-mensagem-dto';

@Injectable()
export class MensagensService {
    constructor(
        @InjectRepository(Mensagem)
        private readonly mensagemRepository: Repository<Mensagem>,
    ) { }

    async getAll(): Promise<Mensagem[]> {
        return await this.mensagemRepository.find();
    }

    async getOne(idMensagem: number): Promise<Mensagem> {
        return await this.mensagemRepository.findOne(idMensagem);
    }

    async criarMensagem(novaMensagem: CriarMensagemDto): Promise<Mensagem> {
        const nova = new Mensagem();
        nova.nick = novaMensagem.nick;
        nova.mensagem = novaMensagem.mensagem;

        return this.mensagemRepository.save(nova);
    }

    async updateMensagem(idMensagem: number, mensagemAtualizar: CriarMensagemDto): Promise<Mensagem> {
        const mensagemUpdate = await this.mensagemRepository.findOne(idMensagem);
        mensagemUpdate.nick = mensagemAtualizar.nick;
        mensagemUpdate.mensagem = mensagemAtualizar.mensagem;

        return await this.mensagemRepository.save(mensagemUpdate);
    }

    async deleteMensagem(idMensagem: number): Promise<any> {
        return await this.mensagemRepository.delete(idMensagem);
    }
}

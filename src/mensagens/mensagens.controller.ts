import { Controller, Post, Body, Get, Put, Delete, Res, HttpStatus, Param } from '@nestjs/common';
import { CriarMensagemDto } from './dto/criar-mensagem-dto';
import { MensagensService } from './mensagens.service';
import { response } from 'express';

@Controller('mensagens')
export class MensagensController {
    constructor(private mensagensServices: MensagensService) {

    }

    @Post()
    criar(@Body() criarMensagemDto: CriarMensagemDto, @Res() response) {
        this.mensagensServices.criarMensagem(criarMensagemDto).then(mensagem => {
            response.status(HttpStatus.CREATED).json(mensagem);
        }).catch(() => {
            response.status(HttpStatus.FORBIDDEN).json({ mensagem: 'error na criação da mensagem' });
        });
    }
    @Get()
    getAll(@Res() response) {
        this.mensagensServices.getAll().then(mensagensList => {
            response.status(HttpStatus.OK).json(mensagensList);
        }).catch(() => {
            response.status(HttpStatus.FORBIDDEN).json({ mensagem: 'error na obtenção da mensagem' });
        });
    }

    @Get(':id')
    getOne(@Res() response, @Param('id') idMensagem) {
        this.mensagensServices.getOne(idMensagem).then(mensagem => {
            response.status(HttpStatus.OK).json(mensagem);
        }).catch(() => {
            response.status(HttpStatus.FORBIDDEN).json({ mensagem: 'error na obtenção da mensagem' });
        });
    }

    @Put(':id')
    update(@Body() atualizaMensagemDto: CriarMensagemDto, @Res() response, @Param('id') idMensagem) {
        this.mensagensServices.updateMensagem(idMensagem, atualizaMensagemDto).then(mensagem => {
            response.status(HttpStatus.OK).json(mensagem);
        }).catch(() => {
            response.status(HttpStatus.FORBIDDEN).json({ mensagem: 'error na atualização da mensagem' });
        });

    }

    @Delete(':id')
    delete(@Res() response, @Param('id') idMensagem) {
        this.mensagensServices.deleteMensagem(idMensagem).then(res => {
            response.status(HttpStatus.OK).json(res);
        }).catch(() => {
            response.status(HttpStatus.FORBIDDEN).json({ mensagem: 'error na eliminação da mensagem' });
        });
    }

}

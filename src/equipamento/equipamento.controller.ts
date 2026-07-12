import { Controller, Body, Get, Post, Patch, Delete, ParseIntPipe, Param, Query, DefaultValuePipe, HttpCode, UseInterceptors, UploadedFile, ParseFilePipeBuilder, HttpStatus } from '@nestjs/common';
import { CreateEquipDto } from './dtos/create-equip.dto';
import { EquipamentoService } from './equipamento.service';
import { UpdateEquipDto } from './dtos/update-equip.dto';
import { FileInterceptor } from '@nestjs/platform-express';

const TAMANHO_MAXIMO_IMAGEM = 2 * 1024 * 1024

@Controller('equipamento')
export class EquipamentoController {
    constructor(private readonly equipamentoService: EquipamentoService) {}
    
    @Post()
    criar(@Body() body: CreateEquipDto) {
        return this.equipamentoService.criar(body);
    }

    @Post('com-arquivo')
    @UseInterceptors(
        FileInterceptor('imagem', {
            limits: {
                fileSize: TAMANHO_MAXIMO_IMAGEM
            }
        })
    )
    criarComArquivo(
        @Body() body: CreateEquipDto,
        @UploadedFile(
            new ParseFilePipeBuilder()
            .addFileTypeValidator({
                fileType: /^(image\/png|image\/jpeg)$/,
            })
            .addMaxSizeValidator({
                maxSize: TAMANHO_MAXIMO_IMAGEM
            })
            .build({
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
            })
        )
        imagem: Express.Multer.File
    ) {
        return this.equipamentoService.criarComArquivo(body, imagem)
    }
    
    @Get()
    listar(
        @Query('status') status?: string,
        @Query('limite', new DefaultValuePipe(10), ParseIntPipe) limite?: number,
        @Query('pagina', new DefaultValuePipe(1), ParseIntPipe) pagina?: number 
    ) {
        return this.equipamentoService.listar(status, limite, pagina);
    }

    @Get(":id")
    buscarId(@Param('id', ParseIntPipe) id: number) {
        return this.equipamentoService.buscarId(id)
    }

    @Patch(':id')
    atualizarParcial(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: UpdateEquipDto) {
        return this.equipamentoService.atualizarParcial(id, body);
    }
    
    @Delete(':id')
    @HttpCode(204)
    remover(@Param('id', ParseIntPipe) id: number) {
        this.equipamentoService.remover(id);
    }
}

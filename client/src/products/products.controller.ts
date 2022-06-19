import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  OnModuleInit,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { microServiceOptions } from './grpc.options';

@Controller('products')
export class ProductsController implements OnModuleInit {
  @Client(microServiceOptions)
  private client: ClientGrpc;

  private grpcService;

  onModuleInit() {
    this.grpcService = this.client.getService('AppController');
  }

  @ApiTags('Products')
  @Post()
  create(@Body('name') name: string) {
    return this.grpcService.create({ name });
  }

  @ApiTags('Products')
  @Get()
  findAll() {
    return this.grpcService.findAll();
  }

  @ApiTags('Products')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.grpcService.findOne({ id });
  }

  @ApiTags('Products')
  @Patch(':id')
  update(@Param('id') id: string, @Body('name') name: string) {
    return this.grpcService.update({ id, name });
  }

  @ApiTags('Products')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.grpcService.remove({ id });
  }
}

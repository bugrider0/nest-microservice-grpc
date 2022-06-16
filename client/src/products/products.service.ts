import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        url: 'redis://127.0.0.1:6379',
      },
    });
  }

  async create(createProductDto: CreateProductDto) {
    return this.client.send('create', createProductDto);
  }

  async findAll() {
    return this.client.send('findAll', {});
  }

  async findOne(id: number) {
    return this.client.send('findOne', id);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return this.client.send('update', { id, ...updateProductDto });
  }

  async remove(id: number) {
    return this.client.send('remove', id);
  }
}

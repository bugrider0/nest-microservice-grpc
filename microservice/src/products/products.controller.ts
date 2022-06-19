import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @GrpcMethod('ProductsController', 'create')
  create({ name }) {
    return this.productsService.create(name);
  }

  @GrpcMethod('ProductsController', 'findAll')
  findAll() {
    return this.productsService.findAll();
  }

  @GrpcMethod('ProductsController', 'findOne')
  findOne({ id }) {
    return this.productsService.findOne(+id);
  }

  @GrpcMethod('ProductsController', 'update')
  update({ id, name }) {
    return this.productsService.update(+id, name);
  }

  @GrpcMethod('ProductsController', 'remove')
  remove({ id }) {
    return this.productsService.remove(+id);
  }
}

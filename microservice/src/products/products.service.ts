import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(name) {
    const productExist = await this.prisma.product.findUnique({
      where: {
        name: name,
      },
    });
    if (productExist) {
      return new ConflictException('This product is already Exists');
    }

    const product = await this.prisma.product.create({
      data: {
        name: name,
      },
    });
    const productId = product.id;

    return { productId };
  }

  async findAll() {
    const products = await this.prisma.product.findMany();

    return { products };
  }

  async findOne(id: number) {
    const productExist = await this.prisma.product.findUnique({
      where: {
        id,
      },
    });
    if (!productExist) {
      return new NotFoundException('This product is not found');
    }

    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
    });

    return { product };
  }

  async update(id: number, name: string) {
    const productExist = await this.prisma.product.findUnique({
      where: {
        id,
      },
    });
    if (!productExist) {
      return new NotFoundException('This product is not found');
    }

    const product = await this.prisma.product.update({
      where: {
        id,
      },
      data: {
        name: name,
      },
    });
    const productId = product.id;

    return { productId };
  }

  async remove(id: number) {
    const productExist = await this.prisma.product.findUnique({
      where: {
        id,
      },
    });
    if (!productExist) {
      return new NotFoundException('This product is not found');
    }

    const product = await this.prisma.product.delete({
      where: {
        id,
      },
    });
    const productId = product.id;

    return { productId };
  }
}

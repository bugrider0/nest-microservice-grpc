import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const microServiceOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'products',
    protoPath: join(__dirname, '../../../_proto/products.proto'),
  },
};

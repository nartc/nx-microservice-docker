import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderApiConfigFeatureModule } from '@nx-microservice-docker/order-api/config-feature';
import { OrderApiOrderFeatureModule } from '@nx-microservice-docker/order-api/order-feature';
import {
  DbConfiguration,
  dbConfiguration,
} from '@nx-microservice-docker/shared/config-utils';

@Module({
  imports: [
    OrderApiConfigFeatureModule,
    MongooseModule.forRootAsync({
      useFactory: (dbConfig: DbConfiguration) => ({
        uri: `mongodb://${dbConfig.host}/`,
        dbName: dbConfig.name,
      }),
      inject: [dbConfiguration.KEY],
    }),
    OrderApiOrderFeatureModule,
  ],
})
export class AppModule {}

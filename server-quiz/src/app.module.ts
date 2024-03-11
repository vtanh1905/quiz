import { Module } from '@nestjs/common';

import { ApiModule } from './api/api.module';
import { GlobalModule } from './global/global.module';
import { ProviderModule } from './provider/provider.module';

@Module({
  imports: [GlobalModule, ProviderModule, ApiModule],
})
export class AppModule {}

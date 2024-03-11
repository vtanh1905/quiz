import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('meta')
@Controller('meta')
export class MetaController {
  @Get('liveness')
  async liveness() {
    return 'OK';
  }

  @Get('readiness')
  async readiness() {
    return 'READY';
  }
}

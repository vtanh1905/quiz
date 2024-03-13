import { SetMetadata, applyDecorators, UseGuards } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'

import { AuthGuard } from 'src/common/guards'

export const Auth = () =>
  applyDecorators(ApiBearerAuth(), UseGuards(AuthGuard))

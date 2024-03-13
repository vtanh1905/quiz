import { Global, Module } from '@nestjs/common'
import { JwtModule as NestJwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

@Global()
@Module({
  imports: [
    NestJwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') },
      }),
    }),
  ],
  exports: [NestJwtModule],
})
export class JwtModule {}
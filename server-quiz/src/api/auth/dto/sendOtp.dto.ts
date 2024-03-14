import { ApiProperty } from '@nestjs/swagger'
import { IsMobilePhone } from 'class-validator'

export class SendOtpDto {
  @ApiProperty()
  @IsMobilePhone('vi-VN')
  mobilePhone: string
}

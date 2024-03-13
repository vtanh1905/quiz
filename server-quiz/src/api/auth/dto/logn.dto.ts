import { ApiProperty } from '@nestjs/swagger'
import { IsMobilePhone, Length } from 'class-validator'

export class LoginDto {
  @ApiProperty()
  @IsMobilePhone('vi-VN')
  mobilePhone: string

  @ApiProperty()
  @Length(6, 15)
  password: string
}
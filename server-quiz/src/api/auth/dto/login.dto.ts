import { ApiProperty } from '@nestjs/swagger'
import { IsMobilePhone, Length, IsNotEmpty } from 'class-validator'

export class LoginDto {
  @ApiProperty()
  @IsMobilePhone('vi-VN')
  mobilePhone: string

  @ApiProperty()
  @Length(6, 15)
  password: string

  @ApiProperty()
  @IsNotEmpty()
  otp: string
}
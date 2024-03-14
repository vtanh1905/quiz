import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, Length, IsMobilePhone } from 'class-validator'

export class RegisterDto {
  @ApiProperty()
  @IsMobilePhone('vi-VN')
  mobilePhone: string

  @ApiProperty()
  @Length(6, 15)
  password: string

  @ApiProperty()
  @Length(6, 30)
  fullName: string

  @ApiProperty()
  @IsNotEmpty()
  otp: string
}

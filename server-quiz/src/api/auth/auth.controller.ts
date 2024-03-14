import { Body, Controller, Post, Request } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { AuthService } from './auth.service'
import { LoginDto } from './dto/logn.dto'
import { RegisterDto } from './dto/register.dto'
import { Auth } from '../../common/decorators'
import { SendOtpDto } from './dto/sendOtp.dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<any> {
    const { mobilePhone, password, otp } = loginDto;

    return {
      message: 'Login Successfully',
      data: await this.authService.login(mobilePhone, password, otp),
    };
  }

  @Post('/register')
  async registry(@Body() registerDto: RegisterDto): Promise<any> {
    const { mobilePhone, password, fullName, otp } = registerDto;

    await this.authService.register(mobilePhone, password, fullName, otp);

    return {
      message: 'Register Successfully',
    };
  }

  @Auth()
  @Post('/profile')
  async profile(@Request() req): Promise<any> {
    const { encryptedMobilePhone } = req.user

    await this.authService.validateProfie(encryptedMobilePhone);

    return {
      message: 'Successfully',
    }
  }

  @Post('/send-otp')
  async sendOtp(@Body() sendOtpDTO: SendOtpDto): Promise<any> {
    const { mobilePhone } = sendOtpDTO;

    await this.authService.sendOtp(mobilePhone);

    return {
      message: 'Successfully',
    }
  }
}

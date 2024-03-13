import { Body, Controller, Post, Request } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { AuthService } from './auth.service'
import { LoginDto } from './dto/logn.dto'
import { RegisterDto } from './dto/register.dto'
import { Auth } from '../../common/decorators'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<any> {
    const { mobilePhone, password } = loginDto;

    return {
      message: 'Login Successfully',
      data: await this.authService.login(mobilePhone, password),
    };
  }

  @Post('/register')
  async registry(@Body() registerDto: RegisterDto): Promise<any> {
    const { mobilePhone, password, fullName } = registerDto;

    await this.authService.register(mobilePhone, password, fullName);

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
}

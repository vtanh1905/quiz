import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

import { UserRepository } from '../../model/user/user.repository'
import { ConfigService } from '@nestjs/config'
import { User } from '../../model/user/user.schema'

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) { }

  async login(mobilePhone: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ mobilePhone });

    // Validate Username exists and Password is correct
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException({ message: 'Username or Password is not correct!' })
    }

    // Update lastSignInAt
    await this.userRepository.update(user['_id'], { lastSignInAt: Date.now() });

    return {
      accessToken: await this.jwtService.signAsync({ encryptedMobilePhone: user.mobilePhone }),
      expireAt: Date.now() + Number(this.configService.get('JWT_EXPIRES_IN')),
    }
  }

  async register(
    mobilePhone: string,
    password: string,
    fullName: string,
  ): Promise<User> {
    // Validate duplicated mobilePhone
    const user = await this.userRepository.findOne({ mobilePhone });
    if (user) {
      throw new BadRequestException('The mobile phone exists!');
    }

    return this.userRepository.create({ mobilePhone, password, fullName });
  }

  async validateProfie(
    encryptedMobilePhone: string,
  ) {
    // Validate duplicated mobilePhone
    const user = await this.userRepository.find({ mobilePhone: encryptedMobilePhone }, {}, { limit: 1 });
    if (!user.length) {
      throw new UnauthorizedException('The user is not valid!');
    }
  }
}

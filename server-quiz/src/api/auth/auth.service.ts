import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import * as twilio from 'twilio';

import { UserRepository } from '../../model/user/user.repository'
import { ConfigService } from '@nestjs/config'
import { User } from '../../model/user/user.schema'
import { convertToVietnamesePhone } from 'src/common/utils';

@Injectable()
export class AuthService {
  twilioClient: twilio.Twilio;

  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.twilioClient = twilio(this.configService.get('TWILIO_ACCOUNT_SID'), this.configService.get('TWILIO_AUTH_TOKEN'))
  }

  async login(mobilePhone: string, password: string, otp: string): Promise<any> {
    const user = await this.userRepository.findOne({ mobilePhone });

    // Validate Username exists and Password is correct
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException({ message: 'Username or Password is not correct!' })
    }

    // Validate Otp
    await this.verifyOtp(mobilePhone, otp);

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
    otp: string,
  ): Promise<User> {
    // Validate duplicated mobilePhone
    const user = await this.userRepository.findOne({ mobilePhone });
    if (user) {
      throw new BadRequestException('The mobile phone exists!');
    }

    // Validate Otp
    await this.verifyOtp(mobilePhone, otp);

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

  async sendOtp(
    mobilePhone: string,
  ) {
    /* Covert to Vietnamese Phone */
    const vietnameseMobilePhone = convertToVietnamesePhone(mobilePhone);

    /* Trigger Twillo send OTP */
    await this.twilioClient.verify.v2.services(this.configService.get('TWILIO_VERIFY_SID')).verifications.create({ to: vietnameseMobilePhone, channel: "sms" });
  }

  async verifyOtp(
    mobilePhone: string,
    otp: string,
  ) {
    const errorMsg = 'OTP is not valid!';
    /* Covert to Vietnamese Phone */
    const vietnameseMobilePhone = convertToVietnamesePhone(mobilePhone);

    try {
      /* Trigger Twillo send OTP */
      const response = await this.twilioClient.verify.v2.services(this.configService.get('TWILIO_VERIFY_SID')).verificationChecks.create({ to: vietnameseMobilePhone, code: otp });
      if (!response.valid) {
        throw new BadRequestException(errorMsg);
      }
    } catch (error) {
      throw new BadRequestException(errorMsg);
    }
  }
}

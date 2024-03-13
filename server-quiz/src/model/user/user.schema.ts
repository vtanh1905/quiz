import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class User {
  @Prop()
  fullName: string;

  @Prop()
  mobilePhone: string;

  @Prop()
  password: string;

  @Prop()
  createdAt?: Date;

  @Prop({ default: null })
  lastSignInAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

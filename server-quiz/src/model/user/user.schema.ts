import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class User {
  @Prop()
  fullname: string;

  @Prop()
  mobilePhone: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

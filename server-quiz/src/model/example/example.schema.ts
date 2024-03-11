import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class Example {
  @Prop()
  name: string;

  @Prop()
  address: string;

  @Prop()
  age: number;
}

export const ExampleSchema = SchemaFactory.createForClass(Example);

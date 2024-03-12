import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class Question {
  @Prop()
  quizId: string;

  @Prop()
  body: string;

  @Prop()
  hint: boolean;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class Answer {
  @Prop()
  questionId: string;

  @Prop()
  body: string;

  @Prop()
  isCorrect: boolean;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);

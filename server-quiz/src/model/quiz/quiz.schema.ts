import { Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class Quiz {}

export const QuizSchema = SchemaFactory.createForClass(Quiz);

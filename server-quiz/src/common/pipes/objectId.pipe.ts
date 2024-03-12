import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ObjectIdPipe implements PipeTransform {
  transform(value: string) {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException('Id params is invalid!');
    }

    return value;
  }
}

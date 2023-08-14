import { PipeTransform, Injectable, ForbiddenException } from '@nestjs/common';

@Injectable()
export class searchValidationPipe implements PipeTransform<any> {
  async transform(value: string): Promise<string> {
    if (!value || value.length < 3) {
      return undefined; // API를 호출하지 않도록 undefined를 반환
    }

    return value;
  }
}

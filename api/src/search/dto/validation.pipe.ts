import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class searchValidationPipe implements PipeTransform<any> {
  async transform(value: string): Promise<string> {
    if (!value || value.length < 3) {
      throw new BadRequestException(
        'Keyword should be at least 3 characters long.',
      );
    }

    return value;
  }
}

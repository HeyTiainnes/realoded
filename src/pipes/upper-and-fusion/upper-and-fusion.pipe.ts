// import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";

@Injectable()
export class DateConversionPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata): any {
    if (metadata.type !== 'body') {
      return value;
    }

    const date = new Date(value);

    if (isNaN(date.getTime())) {
      throw new BadRequestException('Validation failed (date string is expected)');
    }

    return date;
  }
}

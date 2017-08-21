import {
    PipeTransform, Pipe, ArgumentMetadata,
    HttpStatus
} from '@nestjs/common';
import { HttpException } from '@nestjs/core'

@Pipe()
export class CustomPipe implements PipeTransform {
    public transform(value, metadata: ArgumentMetadata) {
        return value;
    }
}

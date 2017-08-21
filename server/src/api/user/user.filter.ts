import { Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';

export class UserNotFoundException {}
export class OrderNotFoundException {}

@Catch(UserNotFoundException, OrderNotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
    public catch(exception, response) {
        response.status(HttpStatus.NOT_FOUND).send();
    }
}

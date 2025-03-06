import { ArgumentsHost, Catch, ExceptionFilter, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { EntityNotFoundError } from 'typeorm';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
	constructor(private readonly logger: Logger) { }
	catch(exception: any, host: ArgumentsHost) {
		const response = host.switchToHttp().getResponse<Response>();

		this.logger.error(exception, 'GlobalExceptionFilter');

		if (exception instanceof EntityNotFoundError) {
			exception = new NotFoundException;
		}

		if (typeof exception.getStatus !== 'function' || exception.response == undefined || exception.response.message == undefined) {
			exception = new InternalServerErrorException;
		}

		response.status(exception.getStatus()).json({
			statusCode: exception.getStatus(),
			message: exception.response.message,
		});
	}
}
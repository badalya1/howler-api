import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import HttpException from '../exceptions/HttpException';

const validationMiddleware = (type: any, value: string | 'body' | 'query' | 'params' = 'body', skipMissingProperties = false): RequestHandler => {
  return (req, res, next) => {
    const dto = plainToClass(type, req[value]);
    validate(dto, { skipMissingProperties, whitelist: true }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
        next(new HttpException(400, message));
      } else {
        req.body = dto;
        next();
      }
    });
  };
};

export default validationMiddleware;

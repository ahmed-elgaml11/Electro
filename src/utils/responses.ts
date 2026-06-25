import { Response } from 'express';
import { errorResponse as ErrorResponseType } from '../types/errorResponse';

export const successResponse = (res: Response, statusCode: number, message: string, data: any = null) => {
  const responseData: any = {
    status: 'success',
    message,
  };
  
  if (data) {
    responseData.data = data;
  }
  
  return res.status(statusCode).json(responseData);
};

export const errorResponse = (res: Response<ErrorResponseType>, statusCode: number, message: string, additionalProps: any = {}) => {
  return res.status(statusCode).json({
    status: 'error',
    message,
    ...additionalProps
  });
};

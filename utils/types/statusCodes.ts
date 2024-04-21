export interface StatusCode {
  code: number;
  name: string;
  description: string;
}

export interface StatusCodes {
  [statusCode: string]: StatusCode;
}

export const httpStatusCodes: StatusCodes = {
  '200': {
    code: 200,
    name: 'OK',
    description: 'The request has succeeded.',
  },
  '201': {
    code: 201,
    name: 'Created',
    description:
      'The request has been fulfilled and resulted in a new resource being created.',
  },
  '204': {
    code: 204,
    name: 'No Content',
    description:
      'The server successfully processed the request, but is not returning any content.',
  },
  '400': {
    code: 400,
    name: 'Bad Request',
    description: 'The server cannot process the request due to a client error.',
  },
  '401': {
    code: 401,
    name: 'Unauthorized',
    description: 'The request requires user authentication.',
  },
  '403': {
    code: 403,
    name: 'Forbidden',
    description:
      'The server understood the request but refuses to authorize it.',
  },
  '404': {
    code: 404,
    name: 'Not Found',
    description: 'The server cannot find the requested resource.',
  },
  '409': {
    code: 409,
    name: 'Conflict',
    description:
      'The request could not be completed due to a conflict with the current state of the resource.',
  },
  '500': {
    code: 500,
    name: 'Internal Server Error',
    description:
      'The server encountered an unexpected condition that prevented it from fulfilling the request.',
  },
  '503': {
    code: 503,
    name: 'Service Unavailable',
    description:
      'The server is currently unable to handle the request due to temporary overloading or maintenance of the server.',
  },
};

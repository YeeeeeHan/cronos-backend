export interface StatusCode {
  code: number;
  name: string;
  description: string;
}

export const STATUS_CODE_200: StatusCode = {
  code: 200,
  name: 'OK',
  description: 'The request has succeeded.',
};

export const STATUS_CODE_201: StatusCode = {
  code: 201,
  name: 'Created',
  description:
    'The request has been fulfilled and resulted in a new resource being created.',
};

export const STATUS_CODE_204: StatusCode = {
  code: 204,
  name: 'No Content',
  description:
    'The server successfully processed the request, but is not returning any content.',
};

export const STATUS_CODE_400: StatusCode = {
  code: 400,
  name: 'Bad Request',
  description: 'The server cannot process the request due to a client error.',
};

export const STATUS_CODE_401: StatusCode = {
  code: 401,
  name: 'Unauthorized',
  description: 'The request requires user authentication.',
};

export const STATUS_CODE_403: StatusCode = {
  code: 403,
  name: 'Forbidden',
  description: 'The server understood the request but refuses to authorize it.',
};

export const STATUS_CODE_404: StatusCode = {
  code: 404,
  name: 'Not Found',
  description: 'The server cannot find the requested resource.',
};

export const STATUS_CODE_409: StatusCode = {
  code: 409,
  name: 'Conflict',
  description:
    'The request could not be completed due to a conflict with the current state of the resource.',
};

export const STATUS_CODE_500: StatusCode = {
  code: 500,
  name: 'Internal Server Error',
  description:
    'The server encountered an unexpected condition that prevented it from fulfilling the request.',
};

export const STATUS_CODE_503: StatusCode = {
  code: 503,
  name: 'Service Unavailable',
  description:
    'The server is currently unable to handle the request due to temporary overloading or maintenance of the server.',
};

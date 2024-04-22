import swaggerJsdoc, { Options } from 'swagger-jsdoc';
import { version } from '../package.json';

// Options for the swagger jsdoc
const options: Options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'REST API Docs',
      version,
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description: 'Bearer token to access these api endpoints',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // Path to the API docs
  apis: ['./routes/*.ts'], // Path to the API files to be documented
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;

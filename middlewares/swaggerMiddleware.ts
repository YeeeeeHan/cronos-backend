import { Express } from 'express';
import swaggerJsdoc, { Options } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
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
          type: 'http',
          in: 'header',
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

export function swagger(app: Express) {
  app.use(`/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

export default swaggerSpec;

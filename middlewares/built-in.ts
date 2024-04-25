import express, { Express } from 'express';

export function parserMiddlewares(app: Express) {
  app.use(express.json()); // Informs express to recognise incoming request object as JSON object
  app.use(express.urlencoded({ extended: false })); // Informs express to recognise incoming request object as JSON object
}

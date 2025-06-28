import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        role?: string;
        [key: string]: any;
      };
    }
  }
}

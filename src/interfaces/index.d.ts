declare global {
  namespace Express {
    interface Request {
      _id: string;
      name: string;
    }
  }
}


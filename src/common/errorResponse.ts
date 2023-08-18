import { Response } from 'express';

// handleErrorResponse
export const handleErrorResponse = (res: Response, error: unknown) => {
  if (error instanceof Error) {
    return res.status(500).json({ error: error.message });
  } else {
    return res.status(500).json({ error: 'An unknown error occurred.' });
  }
};

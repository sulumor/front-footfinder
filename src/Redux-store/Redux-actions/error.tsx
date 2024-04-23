/* eslint-disable @typescript-eslint/no-explicit-any */
export const RESPONSE_ERROR = 'RESPONSE_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';

export const loadErrors = (error: any) => ({ 
  type: RESPONSE_ERROR,
  error
});

export const clearError = () => ({
  type: CLEAR_ERROR
});
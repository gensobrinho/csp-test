export type TErrorInfo = {
    type: string;
    message: string;
    status?: number;
  };
  
  export type TServerErrorDictionary = {
    unknown: {
      type: 'unknown';
      message: string;
      status?: 500;
    };
    empty: {
      type: 'empty';
      message: string;
      status?: 200;
    };
    notFound: {
      type: 'notFound';
      message: string;
      status?: 404;
    };
  };
  
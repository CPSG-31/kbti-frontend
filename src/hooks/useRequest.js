import { useReducer, useCallback } from 'react';
import axios from 'axios';

const httpReducer = (state, { type, errorMessage, data }) => {
  switch (type) {
    case 'SEND':
      return {
        data: undefined,
        error: null,
        status: 'pending',
      };
    case 'SUCCESS':
      return {
        data,
        error: null,
        status: 'completed',
      };
    case 'ERROR':
      return {
        data: null,
        error: errorMessage,
        status: 'error',
      };
    default:
      return state;
  }
};

const useRequest = (startPending) => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    status: startPending ? 'pending' : null,
    data: undefined,
    error: null,
  });
  
  const sendRequest = useCallback(async ({
    requestUrl,
    method = 'GET',
    data = null,
    token = null,
  }) => {
    const headers = {
      'Content-Type': 'application/json',
      ...(!!token) && {
        Authorization: `Bearer ${token}`,
      },
    };
    
    const bodyDataRequest = JSON.stringify(data);
    
    dispatchHttp('SEND');
    try {
      let responseData;
      switch (method) {
        case 'GET':
          responseData = await axios.get(requestUrl, {
            headers,
          });
          break;
        case 'POST':
          responseData = await axios.post(requestUrl, bodyDataRequest, {
            headers,
          });
          break;
        case 'PUT':
          responseData = await axios.put(requestUrl, bodyDataRequest, {
            headers,
          });
          break;
        case 'DELETE':
          responseData = await axios.delete(requestUrl, {
            headers,
          });
          break;
        default:
          return;
      }
      
      dispatchHttp({
        type: 'SUCCESS',
        data: responseData.data,
      });
    } catch (error) {
      dispatchHttp({
        type: 'ERROR',
        errorMessage: error,
      });
    }
  }, []);
  
  return {
    sendRequest,
    ...httpState,
  };
};

export default useRequest;

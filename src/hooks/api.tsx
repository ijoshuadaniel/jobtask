import axios from "axios";
import { useState } from "react";

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const baseUrl: string = "https://gorest.co.in/public/";
  const headers = {
    "content-type": "application/json; charset=utf-8",
    authorization:
      "Bearer 93037f63fa208843fd4a2a6fb00461a9ff1ccee4109b0fa505370d241e8770be",
  };

  const getMethod = async (url: string) => {
    try {
      setLoading(true);
      const response: any = axios({
        method: "GET",
        url: baseUrl + url,
        headers,
      });
      setLoading(false);
      return response;
    } catch (error) {
      setError(true);
      setLoading(true);
    }
  };

  const postMethod = async (url: string, data: object) => {
    try {
      setLoading(true);
      const response: any = axios({
        method: "POST",
        url: baseUrl + url,
        headers,
        data,
      });
      setLoading(false);
      return response;
    } catch (error) {
      setError(true);
      setLoading(true);
    }
  };

  return {
    loading,
    error,
    getMethod,
    postMethod,
  };
};

export default useApi;

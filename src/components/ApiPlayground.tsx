import React, { useState, useEffect } from 'react';
import LeftSidebar from './LeftApiSidebar';
import MainApiArea from './MainApiArea';
import { Endpoint, QueryParams } from '../types/endpoint';
import { ResponseState } from '../types/response';
import styles from './ApiPlayground.module.css';

const API_BASE_URL = 'http://localhost:3007';


const ApiPlayground: React.FC = () => {
  const [endpoints, setEndpoints] = useState<Endpoint[]>([]);
  const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint | null>(null);
  const [requestBody, setRequestBody] = useState<string>('');
  const [queryParams, setQueryParams] = useState<QueryParams>({});
  const [response, setResponse] = useState<ResponseState | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingEndpoints, setLoadingEndpoints] = useState<boolean>(true);
  const [errorEndpoints, setErrorEndpoints] = useState<string | null>(null);

  // Загрузка эндпоинтов из JSON
  useEffect(() => {
    const fetchEndpoints = async () => {
      try {
        const res = await fetch('/endpoints.json');
        console.log('Статус загрузки endpoints.json:', res.status, res.url)
        if (!res.ok) throw new Error('Ошибка загрузки эндпоинтов');
        const data = await res.json();
        setEndpoints(data);
        if (data.length > 0) {
          const first = data[0];
          setSelectedEndpoint(first);
          setRequestBody(JSON.stringify(first.requestSchema || {}, null, 2));
          setQueryParams(first.queryParams ? { ...first.queryParams } : {});
        }
      } catch (err) {
        setErrorEndpoints(err instanceof Error ? err.message : 'Неизвестная ошибка');
      } finally {
        setLoadingEndpoints(false);
      }
    };
    fetchEndpoints();
  }, []);

  const handleEndpointChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const ep = endpoints.find(ep => ep.id === e.target.value);
    if (!ep) return;
    setSelectedEndpoint(ep);
    setRequestBody(JSON.stringify(ep.requestSchema || {}, null, 2));
    setQueryParams(ep.queryParams ? { ...ep.queryParams } : {});
    setResponse(null);
    setError(null);
  };

  const handleSendRequest = async () => {
    if (!selectedEndpoint) return;
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      let url = `${API_BASE_URL}${selectedEndpoint.path}`;
      const options: RequestInit = {
        method: selectedEndpoint.method,
        headers: { 'Content-Type': 'application/json' },
      };

      if (selectedEndpoint.method === 'GET') {
        const params = new URLSearchParams();
        for (const [key, value] of Object.entries(queryParams)) {
          params.append(key, value);
        }
        url += `?${params.toString()}`;
      } else {
        options.body = requestBody;
      }

      const startTime = Date.now();
      const res = await fetch(url, options);
      const endTime = Date.now();

      const data = await res.json();

      setResponse({
        status: res.status,
        statusText: res.statusText,
        time: endTime - startTime,
        headers: Object.fromEntries(res.headers.entries()),
        data,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
    } finally {
      setLoading(false);
    }
  };

  const handleQueryParamChange = (key: string, value: string) => {
    setQueryParams(prev => ({ ...prev, [key]: value }));
  };

  if (loadingEndpoints) return <div>Загрузка эндпоинтов...</div>;
  if (errorEndpoints) return <div style={{ color: 'red' }}>Ошибка: {errorEndpoints}</div>;
  if (!selectedEndpoint) return <div>Нет доступных эндпоинтов</div>;

  return (
    <div className={styles.container}>
      <LeftSidebar
        endpoints={endpoints}
        selectedId={selectedEndpoint.id}
        selectedEndpoint={selectedEndpoint}
        onSelect={handleEndpointChange}
      />
      <MainApiArea
        selectedEndpoint={selectedEndpoint}
        requestBody={requestBody}
        setRequestBody={setRequestBody}
        queryParams={queryParams}
        handleQueryParamChange={handleQueryParamChange}
        handleSendRequest={handleSendRequest}
        loading={loading}
        response={response}
        error={error}
      />
    </div>
  );
};

export default ApiPlayground;
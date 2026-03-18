import React from 'react';
import { Endpoint, QueryParams } from '../types/endpoint';
import { ResponseState } from '../types/response';
import RequestSection from './MainApiArea.RequestSection';
import ResponseSection from './MainApiArea.ResponseSection';
import SchemaExamples from './MainApiArea.SchemaExamples';
import styles from './ApiPlayground.module.css';

interface MainApiAreaProps {
  selectedEndpoint: Endpoint;
  requestBody: string;
  setRequestBody: (value: string) => void;
  queryParams: QueryParams;
  handleQueryParamChange: (key: string, value: string) => void;
  handleSendRequest: () => void;
  loading: boolean;
  response: ResponseState | null;
  error: string | null;
}

const MainApiArea: React.FC<MainApiAreaProps> = ({
  selectedEndpoint,
  requestBody,
  setRequestBody,
  queryParams,
  handleQueryParamChange,
  handleSendRequest,
  loading,
  response,
  error,
}) => {
  return (
    <div className={styles.main}>
      <h2>{selectedEndpoint.name}</h2>

      <RequestSection
        selectedEndpoint={selectedEndpoint}
        requestBody={requestBody}
        setRequestBody={setRequestBody}
        queryParams={queryParams}
        handleQueryParamChange={handleQueryParamChange}
        handleSendRequest={handleSendRequest}
        loading={loading}
      />

      <ResponseSection response={response} error={error} />

      <SchemaExamples selectedEndpoint={selectedEndpoint} />
    </div>
  );
};

export default MainApiArea;
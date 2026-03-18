import React from 'react';
import { Endpoint, QueryParams } from '../types/endpoint';
import styles from './ApiPlayground.module.css';

interface RequestSectionProps {
  selectedEndpoint: Endpoint;
  requestBody: string;
  setRequestBody: (value: string) => void;
  queryParams: QueryParams;
  handleQueryParamChange: (key: string, value: string) => void;
  handleSendRequest: () => void;
  loading: boolean;
}

const RequestSection: React.FC<RequestSectionProps> = ({
  selectedEndpoint,
  requestBody,
  setRequestBody,
  queryParams,
  handleQueryParamChange,
  handleSendRequest,
  loading,
}) => {
  return (
    <div style={{ marginBottom: '30px' }}>
      <h3>Запрос</h3>

      {(selectedEndpoint.method === 'GET' || selectedEndpoint.method === 'DELETE' || selectedEndpoint.method === 'PUT') && selectedEndpoint.queryParams && (
        <div style={{ marginBottom: '15px' }}>
          <strong>Query параметры:</strong>
          {Object.keys(selectedEndpoint.queryParams).map((key) => (
            <div key={key} className={styles.queryParamRow}>
              <label>
                {key}:
                <input
                  type="text"
                  value={queryParams[key] || ''}
                  onChange={(e) => handleQueryParamChange(key, e.target.value)}
                />
              </label>
            </div>
          ))}
        </div>
      )}

      {selectedEndpoint.method === 'POST' && (
        <div>
          <strong>Тело запроса (JSON):</strong>
          <textarea
            value={requestBody}
            onChange={(e) => setRequestBody(e.target.value)}
            rows={10}
            className={styles.textarea}
          />
        </div>
      )}

      <button
        onClick={handleSendRequest}
        disabled={loading}
        className={styles.button}
      >
        {loading ? 'Отправка...' : 'Отправить запрос'}
      </button>
    </div>
  );
};

export default RequestSection;
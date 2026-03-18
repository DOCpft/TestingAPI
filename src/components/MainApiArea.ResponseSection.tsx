import React from 'react';
import { ResponseState } from '../types/response';
import styles from './ApiPlayground.module.css';

interface ResponseSectionProps {
  response: ResponseState | null;
  error: string | null;
}

const ResponseSection: React.FC<ResponseSectionProps> = ({ response, error }) => {
  const renderJsonBlock = (label: string, data: unknown) => (
    <>
      <p>
        <strong>{label}</strong>
      </p>
      <pre className={styles.preBlock}>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
  return (
    <div>
      <h3>Ответ</h3>
      {error && (
        <div className={styles.errorBox}>
          <strong>Ошибка:</strong> {error}
        </div>
      )}
      {response && (
        <div className={styles.responseBox}>
          <p>
            <strong>Статус:</strong> {response.status} {response.statusText}
          </p>
          <p>
            <strong>Время:</strong> {response.time} мс
          </p>
          {renderJsonBlock('Заголовки', response.headers)}
          {renderJsonBlock('Тело ответа', response.data)}
        </div>
      )}
    </div>
  );
};

export default ResponseSection;
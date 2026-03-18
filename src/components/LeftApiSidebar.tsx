import React from 'react';
import { Endpoint } from '../types/endpoint';
import styles from './ApiPlayground.module.css';

interface LeftSidebarProps {
  endpoints: Endpoint[];
  selectedId: string;
  selectedEndpoint: Endpoint;
  onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({
  endpoints,
  selectedId,
  selectedEndpoint,
  onSelect,
}) => {
  const blocks = [
    { title: "Описание", value: selectedEndpoint.description},
    { title: "Метод", value: selectedEndpoint.method},
    { title: "Путь", value: selectedEndpoint.path},
    { title: "Примечание", value: selectedEndpoint.notes ?? null}
  ];
  return (
    <div className={styles.sidebar}>
      <h3>Эндпоинты</h3>
      <select value={selectedId} onChange={onSelect}>
        {endpoints.map((ep) => (
          <option key={ep.id} value={ep.id}>
            {ep.name}
          </option>
        ))}
      </select>
      <div>
        <strong>Описание:</strong>
        <p>{selectedEndpoint.description}</p>
        <p>
          <strong>Метод:</strong> {selectedEndpoint.method}
        </p>
        <p>
          <strong>Путь:</strong> {selectedEndpoint.path}
        </p>
        {selectedEndpoint.notes && (
          <p>
            <strong>Примечание:</strong> {selectedEndpoint.notes}
          </p>
        )}
      </div>
    </div>
  );
};

export default LeftSidebar;
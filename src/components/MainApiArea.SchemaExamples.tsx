// SchemaExamples.tsx
import React from 'react';
import { Endpoint } from '../types/endpoint';
import styles from './ApiPlayground.module.css';

interface SchemaExamplesProps {
  selectedEndpoint: Endpoint;
}

const SchemaExamples: React.FC<SchemaExamplesProps> = ({ selectedEndpoint }) => {
  const blocks: Array<{title:string, schema: object | null}> = [
    { title: 'Пример запроса (ожидаемая схема)', schema: selectedEndpoint.requestSchema },
    { title: 'Пример ответа (ожидаемая схема)', schema: selectedEndpoint.responseSchema }
  ];
  return (
    <div className={styles.schemaSection}>
      {blocks.map((block, index) => (
        <React.Fragment key={index}>
          <h3>{block.title}</h3>
          <pre className={styles.schemaPre}>
            {JSON.stringify(block.schema, null, 2)}
          </pre>
        </React.Fragment>
      ))}
    </div>
  );
};

export default SchemaExamples;
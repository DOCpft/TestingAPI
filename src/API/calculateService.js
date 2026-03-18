// src/services/deliveryService.js

const API_BASE_URL = 'http://localhost:3007';

/**
 * Универсальная функция для POST-запросов к API
 * @param {string} endpoint - путь эндпоинта (например, '/api/delivery/gaz/calculate')
 * @param {object} data - тело запроса
 * @returns {Promise<object>} - поле data из ответа
 */
async function postRequest(endpoint, data) {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    // Пытаемся получить текст ошибки от сервера
    let errorText = '';
    try {
      const errorData = await response.json();
      errorText = errorData.message || JSON.stringify(errorData);
    } catch {
      errorText = await response.text();
    }
    throw new Error(`Ошибка ${response.status}: ${errorText}`);
  }

  const result = await response.json();
  // Предполагаем, что успешный ответ всегда содержит поле data
  if (result.status !== 'ok' || !result.data) {
    throw new Error('Неожиданный формат ответа от сервера');
  }
  return result.data;
}

// 1. Газели, шаланды, манипуляторы
export function calculateGazDelivery(data) {
  return postRequest('/api/delivery_gaz', data);
}

// 2. Железобетонные изделия
export function calculateJbiDelivery(data) {
  return postRequest('/api/delivery_jbi', data);
}

// 3. Общестроительные материалы
export function calculateOsDelivery(data) {
  return postRequest('/api/delivery_os', data);
}

// 4. Бетонные смеси (миксеры)
export function calculateMixDelivery(data) {
  return postRequest('/api/delivery_mix', data);
}

// 5. Нерудные материалы
export function calculateNrDelivery(data) {
  return postRequest('/api/delivery_ner', data);
}

// 6. Пиломатериалы
export function calculatePmDelivery(data) {
  return postRequest('/api/delivery_pilmat', data);
}

// 7. Грандлайн
export function calculateGrandlineDelivery(data) {
  return postRequest('/api/delivery_grandline', data);
}



/**
 * Получить доступные методы доставки для указанного региона
 * @param {string} region - код региона (например, "СПБ", "МСК", "КРД")
 * @returns {Promise<Array>} - список методов доставки
 */
export async function getDeliveryMethods(region) {
  const url = `${API_BASE_URL}/api/deliveryMethods?region=${encodeURIComponent(region)}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);

  const result = await response.json();
  console.log('Ответ от /api/deliveryMethods:', result); // для отладки

  // Проверяем, что ответ успешный и содержит данные
  if (result.success && result.data) {
    return result.data; // возвращаем весь объект с категориями
  } else {
    throw new Error(result.message || 'Неверный формат ответа от сервера');
  }
}
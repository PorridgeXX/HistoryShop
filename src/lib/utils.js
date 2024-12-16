import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function loadFromLocalStorage(key) {
  const value = localStorage.getItem(key);
  if (value && value[0] !== '{' && value[0] !== '[') {
    // Если значение не похоже на JSON, вернуть строку
    return value;
  }
  try {
    return JSON.parse(value);
  } catch (e) {
    console.error(`Ошибка загрузки ${key}:`, e);
    return null;
  }
}


export function saveToLocalStorage(key, value) {
  try {
    if (typeof value === 'string') {
      localStorage.setItem(key, value); // Для строк, например токена
    } else {
      localStorage.setItem(key, JSON.stringify(value)); // Для сложных объектов
    }
  } catch (e) {
    console.error(`Ошибка сохранения ${key}:`, e);
  }
}

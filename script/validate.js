// Валидация Card Holder
export const isValidCardHolder = (str) => {
  if (str) {
    // приводим к строке тестовые данные
    const test = str.toString();
    // только кириллица зате пробел затем кирилица (2 слова)
    const regExpNumber = /^[а-яё]+\s+[а-яё]+$/gi;
    // ищем совпадения по регулярному выражению
    const result = regExpNumber.test(test);
    return result;
  } else return false;
};

// Валидация Card Number
export const isValidCardNumber = (str) => {
  if (str) {
    // приводим к строке тестовые данные
    const test = str.toString();
    // убирает пробелы в строке
    const noProbelTest = test.replaceAll(' ', '');
    // только 15 цифр
    const regExpNumber = /^\d{15}$/g;
    // ищем совпадения по регулярному выражению
    const result = regExpNumber.test(noProbelTest);
    return result;
  } else return false;
};

// Валидация CVV/CVC
export const isValidCardCVC = (str) => {
  if (str) {
    // приводим к строке тестовые данные
    const test = str.toString();
    // только 3 цифры
    const regExpNumber = /^\d{3}$/g;
    // ищем совпадения по регулярному выражению
    const result = regExpNumber.test(test);
    return result;
  } else return false;
};

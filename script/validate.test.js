// Валидация Card Holder
const isValidCardHolder = (str) => {
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
const isValidCardNumber = (str) => {
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
const isValidCardCVC = (str) => {
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


describe('Функция для валидации банковской карты', () => {
  const holder = [
    'Иван',
    'Иван Петров',
    'Ivan Petrov',
    'Иван1965 Петров',
    'Ivan',
  ];

  const number = [
    '1111 1111 1111 111',
    '5',
    '9999 9999 9999 99 999',
    '',
    'l000 l000 l000 l000',
  ];

  const cvc = [
    '1111',
    '55',
    '',
    '598',
    '53O',
    '!!!'
  ];

  it('на одно слово, кириллицу, содержание цифр', () => {
    expect(isValidCardHolder(holder[0])).toBe(false);
    expect(isValidCardHolder(holder[1])).toBe(true);
    expect(isValidCardHolder(holder[2])).toBe(false);
    expect(isValidCardHolder(holder[3])).toBe(false);
    expect(isValidCardHolder(holder[4])).toBe(false);
  });

  it('проверка цифр на карте', () => {
    expect(isValidCardNumber(number[0])).toBe(true);
    expect(isValidCardNumber(number[1])).toBe(false);
    expect(isValidCardNumber(number[2])).toBe(false);
    expect(isValidCardNumber(number[3])).toBe(false);
    expect(isValidCardNumber(number[4])).toBe(false);
  });

  it('проверка cvc', () => {
    expect(isValidCardCVC(cvc[0])).toBe(false);
    expect(isValidCardCVC(cvc[1])).toBe(false);
    expect(isValidCardCVC(cvc[2])).toBe(false);
    expect(isValidCardCVC(cvc[3])).toBe(true);
    expect(isValidCardCVC(cvc[4])).toBe(false);
    expect(isValidCardCVC(cvc[5])).toBe(false);
  });
});

import {el, setChildren, mount, unmount} from 'redom';
import Cleave from '../node_modules/cleave.js/dist/cleave-esm.min.js';
import {isValidCardHolder, isValidCardNumber, isValidCardCVC} from './validate';

// обертка всего кода
const wrapper = el('div', {className: 'wrapper'});

/* создание карты */
const cardWrap = el('div', {className: 'card'});

/* создание внешнего вида карты */
const getCardDetails = () => {
  // получаем данные карты для отображения
  const cardNumber = el('span', {className: 'card__number'},
      'xxxx xxxx xxxx xxxx');
  const cardName = el('span', {className: 'card__name'}, 'John Doe');
  const cardDate = el('span', {className: 'card__date'}, '04/24');

  // создаем карту
  const card = el('div', {className: 'credit-card'}, [cardNumber, el('div',
      {className: 'card__personal'}, [cardName, cardDate])]);

  return {
    card,
    cardNumber,
    cardName,
    cardDate,
  };
};
// деструктуируем объект для получения card (отображение карты)
const {card, cardNumber, cardName, cardDate} = getCardDetails();

/* создание формы */
const getCardForm = () => {
  const form = el('form#form', {className: 'form', action: '#'});

  const inputWrapHolder = el('.form__input-wrap form__input-wrap_holder');
  const labelHolder = el('label.form__label form__holder-label', {for: '#'},
      'Card Holder');
  const inputHolder = el('input.input input__holder', {
    type: 'text',
    name: 'holder',
    oninput(e) {
      cardName.textContent = e.target.value;
    }});

  const inputWrapNumber = el('.form__input-wrap form__input-wrap_number');
  const labelNumber = el('label.form__label form__number-label', {for: '#'},
      'Card Number');
  const inputNumber = el('input.input input__number', {
    id: 'number',
    name: 'number',
    oninput(e) {
      cardNumber.textContent = e.target.value;
    }});
  // подключить маску библ. Cleave для номера карты
  new Cleave(inputNumber, {
    creditCard: true,
  });

  const inputWrapDate = el('.form__input-wrap form__input-wrap_date');
  const labelDate = el('label.form__label form__date-label', {for: '#'},
      'Card Expiry');
  const inputDate = el('input.input input__date', {
    type: 'date',
    oninput(e) {
      cardDate.textContent = e.target.value;
    }});

  const inputWrapCVV = el('.form__input-wrap form__input-wrap_cvv');
  const labelCVV = el('label.form__label form__cvv-label', {for: '#'}, 'CVV');
  const inputCVV = el('input.input input__cvv', {
    name: 'cvc',
    // разрешаем ввод только цифр
    oninput(e) {
      e.target.value = e.target.value.replace(/\D/g, '');
    }});

  const button = el('button.form__button', {name: 'formButton'}, 'CHECK OUT');

  setChildren(inputWrapHolder, [labelHolder, inputHolder]);
  setChildren(inputWrapNumber, [labelNumber, inputNumber]);
  setChildren(inputWrapDate, [labelDate, inputDate]);
  setChildren(inputWrapCVV, [labelCVV, inputCVV]);

  setChildren(form, [inputWrapHolder, inputWrapNumber, inputWrapDate,
    inputWrapCVV, button]);

  return {
    form,
  };
};

// деструктуируем объект для получения формы
const {form} = getCardForm();

// рендер в обертку всех данных карты
setChildren(cardWrap, [el('p', {className: 'secure'}, 'Secure Checkout'),
  card, form]);

// рендер в общую обертку обертку карты
setChildren(wrapper, cardWrap);

// рендер обертку в body
setChildren(document.body, wrapper);

// cоздаем кнопку валидации
const validateButton = el(
    'button',
    {className: 'validate-button'},
    'Отправить на валидацию',
);
mount(form, validateButton);

console.log(form);

// показать модалку если валидацию карточка не прошла
const showModal = (boolean) => {
  console.log('boolean: ', boolean);
  
  // создаем эл-т с текстом тестирования валидации
  const message = el('h2');
  // если прошел/не прошел валид то меняем текст
  if (boolean) {
    message.textContent = 'Введенные данные прошли валидацию!';
  } else {
    message.textContent = 'Введенные данные НЕ прошли валидацию!';
  }
  // монтируем сообщение о валидации
  mount(form, message);
  // показываем сообщение на 3 сек
  const tomerId = setTimeout(() => {
    unmount(form, message);
  }, 3000);
};
// слушаем клик по кнопке валидации
validateButton.addEventListener('click', (e) => {
  e.preventDefault();
  console.dir(form);
  console.log('form.name.value: ', form);
  // показываем сообщение в зависимости от валидации
  showModal(
      isValidCardHolder(form.holder.value) &&
        isValidCardNumber(form.number.value) &&
        isValidCardCVC(form.cvc.value)
  );
});

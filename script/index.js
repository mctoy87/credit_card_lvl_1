import {el, setChildren} from 'redom';
import Cleave from '../node_modules/cleave.js/dist/cleave-esm.min.js';

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
    oninput(e) {
      cardName.textContent = e.target.value;
    }});

  const inputWrapNumber = el('.form__input-wrap form__input-wrap_number');
  const labelNumber = el('label.form__label form__number-label', {for: '#'},
      'Card Number');
  const inputNumber = el('input.input input__number', {
    id: 'number',
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
    // разрешаем ввод только цифр
    oninput(e) {
      e.target.value = e.target.value.replace(/\D/g, '');
    }});

  const button = el('button.form__button', 'CHECK OUT');

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



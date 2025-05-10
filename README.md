# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm i
npm run start
```

## Сборка

```
npm run build
```


## Типы данных

- Покупатель
```
export interface ICustomerModel {
  customerFullInfo: ICustomer;
  validateCustomerAddress(data: string): boolean;
  validateCustomerEmail(data: string): boolean;
  validateCustomerPhoneNumber(data: string): boolean;
}
```

- Данные товара
```
export interface IItem {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number;
}
```


 - Оплата: 
 ```
export enum PaymentType {
  Online = 'online',
  Cash = 'cash',
}
```

- Данные покупателя

```
export interface ICustomer {
  paymentType: PaymentType;
  address: string;
  email: string;
  phoneNumber: string;
}
```

- Корзина
```
export interface ICartModel {
  items: Map<string, number>;
  add(id: string): void;
  remove(id: string): void;
}
```

 - Каталог
 ```
export interface IItemsData {
  items: IItem[];
  setItems(items: IItem[]): void;
  getItem(id: string): IItem;
  preview: string | null; // для отображения товара в попапе
}
```


- eventEmitter
```
export interface IEventEmitter {
  emit: (event: string, data: unknown) => void
}
```

- Интерфейс корзины
```
export interface ICartView {
  items: HTMLElement[];
  parentContainer: HTMLElement;
  container: HTMLElement;
  submitButton: HTMLButtonElement;
  cartButton: HTMLButtonElement;
  price: HTMLSpanElement;

  render(): HTMLElement
}
```

 - Форма с контактами
 ```
export interface IContactsFormView {
  form: HTMLFormElement;
  submitButton: HTMLButtonElement;
  emailInput: HTMLInputElement;
  phoneInput: HTMLInputElement;

  render(): void;
  toggleSubmitButton(): void;
}
```


- Форма с адресом и оплатой

```
export interface IOrderFormView {
  form: HTMLFormElement;
  paymentCashButton: HTMLButtonElement;
  paymentCardButton: HTMLButtonElement;
  submitButton: HTMLButtonElement;
  adressInput: HTMLInputElement;

  render(): HTMLFormElement;
}
```

 - Модальное окно
 ```
export interface IModalView {
  closeButton: HTMLElement;
  parentContainer: HTMLElement;
  container: HTMLElement;
  events: IEventEmitter;

  openModal: (element: HTMLElement) => void;
  closeModal: () => void;
}
```

## Архитектура
Приложение построено по принципу Model-View-Presenter (MVP) и состоит из трёх ключевых слоёв:

 - Модель : хранение и изменение данных.
  Классы : CartModel CustomerModel

- Представление, классы view, itemview, cartviev, modalview, orderformview



### Код

##### API
Запросы на сервер, принимает базовый URL сервера и объект с заголовками запросов
 - get - выполняет get запрос
 - post - выполняет post запрос


##### View
Пустой конструктор
 - on - обработчик на событие
 - emit - инициирует событие
 - trigger - возвращает функцию, при вызове которой иницализируется событие

##### ItemView
Наследует от View
 - render - разметка элемента

##### ModalView
Открытие модального окна + закрытие его
 - render - Рендер модального окна
 - openModal - Открытие модального окна
 - closeModal - Закрытие модального окна

##### CartView
Разметка корзины покупателя
 - render - разметка корзины

##### ContactFormView
Реализует события формы, генерируются события по клику на инпуты и кнопки сабмиты формы
 - render - Разметка формы
 - toggleSubmitButton - Активация/Деактивация кнопки сабмита

##### CartModel
Хранение/Изменение товаров в корзине

 - add - добавляет товар в массив товаров
 - remove - удаляет товар из массива товаров
 - items - геттер, возвращает объект типа Map, которые лежат в корзине

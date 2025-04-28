import './scss/styles.scss';
import { cloneTemplate } from './utils/utils';
import { EventEmitter } from './components/base/events';
import { ItemView } from './components/ItemView';
import { ModalView } from './components/ModalView';
import { CartView } from './components/CartView';
import { CartModel } from './components/CartModel';
import { CustomerModel } from './components/CustomerModel';
import { PaymentType, ModalOpenEventData, IItem } from './types';
import { OrderFormView } from './components/OrderFormView';
import { ContactsFormView } from './components/ContactsFormView';

const templateGalleryCard = document.querySelector('#card-catalog') as HTMLTemplateElement;


const events = new EventEmitter();

const cartData = new CartModel(events);

const cartView = new CartView(events);

const customerData = new CustomerModel();

const modalView = ModalView.getInstance(events);

const orderForm = new OrderFormView(events);

const contactsForm = new ContactsFormView(events);


const testItems = [
  {
  "id": "1",
  "description": "Если планируете решать задачи в тренажёре, берите два.",
  "image": "./images/bg1s.jpg",
  "title": "название1",
  "category": "софт-скил",
  "price": 350
  },

  {
    "id": "2",
    "description": "Если планируете решать задачи в тренажёре, берите два.",
    "image": "./images/bg1s.jpg",
    "title": "название2",
    "category": "софт-скил",
    "price": 50
    },

  {
    "id": "3",
    "description": "Если планируете решать задачи в тренажёре, берите два.",
    "image": "./images/bg1s.jpg",
    "title": "название3",
    "category": "софт-скил",
    "price": 100
    },

  {
    "id": "4",
    "description": "Если планируете решать задачи в тренажёре, берите два.",
    "image": "./images/bg1s.jpg",
    "title": "название4",
    "category": "софт-скил",
    "price": 7500
    }
];

const gallery = document.querySelector('.gallery') as HTMLElement;
const cards = testItems.map((item) => {
  const card = new ItemView(cloneTemplate(templateGalleryCard), item, events);
  gallery.prepend(card.render());
  return card;
})


events.on<ModalOpenEventData>('modal:open', (item) => {
  modalView.openModal(item.element as HTMLElement);
});

events.on<ModalOpenEventData>('cart:remove', (item) => {
  cartData.remove(item.data);
});
events.on<ModalOpenEventData>('cart:add', (item) => {
  console.log(item.data.price);
  cartData.add(item.data);
})

events.on<{items: string[]}>('cart:change', (data) => {
  cartView.clear();
  cards.forEach(item => {
    data.items.forEach(dataItem => {
      if(item.data.id === dataItem) {
        cartView.addItem(item.cartItemView, item.data.id, cartData.sum);
      }
    })
  })
})
events.on<[id: string]>('cart:submit', (data) => {
  cartData.orderedItems = data;
  modalView.openModal(orderForm.render());
})


import './scss/styles.scss';
import { cloneTemplate } from './utils/utils';
import { EventEmitter } from './components/base/events';
import { API_URL, CDN_URL } from './utils/constants';
import { DataApi } from './components/DataApi';
import { CartModel } from './components/CartModel';
import { OrderModel } from './components/OrderModel';
import { IEventData, IItem, IOrder } from './types';
import { ItemView } from './components/ItemView';
import { ModalView } from './components/ModalView';
import { CartView } from './components/CartView';
import { OrderFormView, ContactsFormView } from './components/FormView';
import { SuccessWindowView } from './components/SuccessWindowView';


const templateGalleryCard = document.querySelector('#card-catalog') as HTMLTemplateElement;
const cartTemplate = document.querySelector('#basket') as HTMLTemplateElement;
const contactsFormTemplate = document.querySelector('#contacts') as HTMLTemplateElement;
const orderFormTemplate = document.querySelector('#order') as HTMLTemplateElement;
const windowSuccessTemplate = document.querySelector('#success') as HTMLTemplateElement;
const templateCartCard = document.querySelector('#card-basket') as HTMLTemplateElement;


const events = new EventEmitter();


const cartData = new CartModel(events);

const cartView = new CartView(cloneTemplate(cartTemplate), events);

const orderData = new OrderModel();

const modalView = ModalView.getInstance(events);

const orderForm = new OrderFormView(cloneTemplate(orderFormTemplate), events);

const contactsForm = new ContactsFormView(
	cloneTemplate(contactsFormTemplate),
	events
);

const successWindow = new SuccessWindowView(
	cloneTemplate(windowSuccessTemplate),
	events
);

const gallery = document.querySelector('.gallery') as HTMLElement;
const items = new DataApi(API_URL);
let cards: ItemView[] = [];
items.getItems()
	.then((data) => {
		cards = data.items.map((item: IItem) => {
			item.image = CDN_URL + item.image;
			const card = new ItemView(cloneTemplate(templateGalleryCard), events, item);
			gallery.prepend(card.render());
			return card;
		});
		return cards
	})
		.catch ((err) => {
			console.log('Произошла ошибка:', err);
	});


events.on<IEventData>('modal:open', (item) => {
	modalView.openModal(item.element as HTMLElement);
});

events.on<IEventData>('modal:close', () => {
	modalView.closeModal();
});

events.on<IEventData>('cart:remove', (item) => {
	cartData.remove(item.data);
});

events.on<IEventData>('cart:add', (item) => {
	cartData.add(item.data);
});

events.on<{ items: string[] }>('cart:changed', (data) => {
	cartView.clear();
	cards.forEach((item) => {
		data.items.forEach((dataItem) => {
			if (item.data.id === dataItem) {
				cartView.addItem(
					item.getCartItemView(cloneTemplate(templateCartCard)),
					item.data.id,
					cartData.total
				);
			}
		});
	});
});

events.on<[id: string]>('cart:submit', (data) => {
	orderData.items = data;
	orderData.total = cartData.total;
	modalView.openModal(orderForm.render());
});

events.on<Partial<IOrder>>('orderData:changed', (data) => {
	orderData.address = data.address;
	orderData.payment = data.payment;
	modalView.openModal(contactsForm.render());
});

events.on<Partial<IOrder>>('orderData:finished', (data) => {
	orderData.phone = data.phone;
	orderData.email = data.email;
	items
		.sendOrder(orderData.customerFullInfo)
		.then(() => {
			modalView.openModal(successWindow.render(orderData.total));
			cartView.clear();
			cartData.clear();
		})
		.catch((err) => {
			console.log('Произошла ошибка:', err);
		});
});

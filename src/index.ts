import './scss/styles.scss';

import { cloneTemplate } from './utils/utils';
import { EventEmitter } from './components/base/events';
import { ItemView } from './components/ItemView';
import { ModalView } from './components/ModalView';
import { CartView } from './components/CartView';
import { CartModel } from './components/CartModel';
import { CustomerModel } from './components/CustomerModel';
import { PaymentType } from './types';
import { OrderFormView } from './components/OrderFormView';
import { ContactsFormView } from './components/ContactsFormView';


const events = new EventEmitter();
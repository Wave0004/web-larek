export enum PaymentType {
    Online = 'online',
    Cash = 'cash',
  }
  
  export interface IItem {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
  }
  
  export interface ICustomerModel {
    customerFullInfo: ICustomer;
    validateCustomerAddress(data: string): boolean;
    validateCustomerEmail(data: string): boolean;
    validateCustomerPhoneNumber(data: string): boolean;
  }
  
  export interface ICustomer {
    paymentType: PaymentType;
    address: string;
    email: string;
    phoneNumber: string;
  }
  

  export interface IItemsData {
    items: IItem[];
    setItems(items: IItem[]): void;
    getItem(id: string): IItem;
    preview: string | null; 
  }
  
  export type TItemBaseInfo = Pick<IItem, 'category' | 'title' | 'image' | 'price' | 'id'>;
  
  export type TItemShortInfo = Pick<IItem, 'title' | 'price' | 'id'>;
  
  export type TItemFullInfo = Pick<IItem, 'image' | 'category' | 'title' | 'description' | 'price' | 'id'>;
  

  export interface ICartModel {
    items: Map<string, number>;
    add(id: string): void;
    remove(id: string): void;
  }
  
  export interface IEventEmitter {
    emit: (event: string, data: unknown) => void
  }
  
  export interface ICartView {
    items: HTMLElement[];
    parentContainer: HTMLElement;
    container: HTMLElement;
    submitButton: HTMLButtonElement;
    cartButton: HTMLButtonElement;
    price: HTMLSpanElement;
  
    render(): HTMLElement
  }

  export interface IContactsFormView {
    form: HTMLFormElement;
    submitButton: HTMLButtonElement;
    emailInput: HTMLInputElement;
    phoneInput: HTMLInputElement;
  
    render(): void;
    toggleSubmitButton(): void;
  }

  export interface IOrderFormView {
    form: HTMLFormElement;
    paymentCashButton: HTMLButtonElement;
    paymentCardButton: HTMLButtonElement;
    submitButton: HTMLButtonElement;
    adressInput: HTMLInputElement;
  
    render(): HTMLFormElement;
  }
  
  export interface IItemView {
    render(data: Partial<IItem>): HTMLElement;
    category: HTMLSpanElement | null;
    title: HTMLHeadingElement | HTMLSpanElement | null;
    image: HTMLImageElement | null;
    price: HTMLSpanElement | null;
    description: HTMLParagraphElement | null;
  
    cartButton: HTMLButtonElement | null;
  }
  
  export interface IModalView {
    closeButton: HTMLElement;
    parentContainer: HTMLElement;
    container: HTMLElement;
    events: IEventEmitter;
  
    openModal: (element: HTMLElement) => void;
    closeModal: () => void;
  }
  
  export interface IView {
    element: HTMLElement,
    container: HTMLElement,
    render(data?: unknown): HTMLElement
  }
  
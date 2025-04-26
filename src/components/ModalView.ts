import { IEventEmitter, IItem, IModalView } from "../types";

export class ModalView implements IModalView {
  closeButton: HTMLElement;
  container: HTMLElement;
  parentContainer: HTMLElement;
  events: IEventEmitter;
  item?: IItem;

  constructor(parentContainer: HTMLElement, events: IEventEmitter) {
    this.parentContainer = parentContainer;
    this.events = events;
    this.container = parentContainer.querySelector('.modal__content') as HTMLElement;
    this.closeButton = parentContainer.querySelector('.modal__close') as HTMLButtonElement;


    this.closeButton.addEventListener(('click'), this.closeModal.bind(this));


    this.parentContainer.addEventListener(('mousedown'), (event) => {
      if(event.target === event.currentTarget) {
        this.closeModal();
      }
    })

    this.handleEscUp = this.handleEscUp.bind(this);
  }

  handleEscUp(event: KeyboardEvent) {
    if(event.key === "Escape") {
      this.closeModal()
    }
  }

  openModal(element: HTMLElement) {
    document.addEventListener(('keyup'), this.handleEscUp);
    this.parentContainer.style.display = 'block';
    this.render(element);
  }

  closeModal() {
    this.parentContainer.style.display = 'none';
    document.removeEventListener("keyup", this.handleEscUp);
  }

  render(element: HTMLElement) {
    this.container.append(element);
  }
}

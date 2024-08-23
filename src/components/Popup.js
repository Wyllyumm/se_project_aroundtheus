export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  _escToCloseListener = (e) => {
    if (e.key === "Escape" || e.key === "Esc") {
      e.preventDefault();
      this.close();
    }
  };

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._escToCloseListener);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._escToCloseListener);
  }

  setEventListeners() {
    this._popupCloseButton = this._popupElement.querySelector(".modal__close");
    this._popupCloseButton.addEventListener("click", () => this.close());
    this._popupElement.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal_opened")) {
        this.close();
      }
    });
  }
}

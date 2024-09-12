import Popup from "./Popup";

export default class PopupConfirmation extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._deleteConfirm = this._popupElement.querySelector(
      "#confirm-delete-button"
    );
    /*this._handleDeleteConfirm = null; */
  }

  setSubmit(confirmAction) {
    this._handleDeleteConfirm = confirmAction;
  }

  /*setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (this._handleDeleteConfirm) {
        this.setSubmit();
      } else {
        console.error();
      }
      this.close();
    });
  }*/

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleDeleteConfirm().then(() => this.close());
    });
  }
}

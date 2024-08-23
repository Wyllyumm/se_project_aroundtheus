import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._previewImage = this._popupElement.querySelector("#preview-image");
    this._previewCaption = this._popupElement.querySelector(
      "#preview-image-caption"
    );
  }
  open(data) {
    this._previewImage.src = data.link;
    this._previewImage.alt = data.name;
    this._previewCaption.textContent = data.name;
    super.open();
  }
}

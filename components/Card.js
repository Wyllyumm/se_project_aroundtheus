const previewImageModal = document.querySelector("#image-modal");
const previewImageModalCloseButton =
  previewImageModal.querySelector("#image-modal-close");

const previewImage = previewImageModal.querySelector("#preview-image");
const previewCaption = previewImageModal.querySelector(
  "#preview-image-caption"
);

function clickToCloseListener(event) {
  if (event.target.classList.contains("modal_opened")) {
    closePopUp(event.target);
  }
}

function escToCloseListener(event) {
  if (event.key === "Escape" || event.key === "Esc") {
    const modal = document.querySelector(".modal_opened");
    closePopUp(modal);
  }
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  modal.addEventListener("click", clickToCloseListener);
  document.addEventListener("keydown", escToCloseListener);
}

function closePopUp(modal) {
  modal.classList.remove("modal_opened");
  modal.removeEventListener("click", clickToCloseListener);
  document.removeEventListener("keydown", escToCloseListener);
}

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle("cards__like-button_active");
  }
  _handleDeleteButton() {
    this._deleteButton.closest(".card").remove();
  }
  _handlePreviewPicture(evt) {
    openModal(previewImageModal);
    previewImage.src = this._link;
    previewImage.alt = this._name;
    previewCaption.textContent = this._name;
  }
  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._handleLikeButton());
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteButton()
    );
    this._element
      .querySelector(".cards__image")
      .addEventListener("click", () => this._handlePreviewPicture(this));

    console.log("hi");
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }
  getView() {
    this._element = this._getTemplate();
    this._element
      .querySelector(".cards__image")
      .setAttribute("src", this._link);
    this._element.querySelector(".cards__title").textContent = this._name;
    this._element
      .querySelector(".cards__image")
      .setAttribute("alt", this._name);
    this._likeButton = this._element.querySelector(".cards__like-button");
    this._deleteButton = this._element.querySelector(".cards__delete-button");
    this._setEventListeners();

    return this._element;
  }
}

export default Card;

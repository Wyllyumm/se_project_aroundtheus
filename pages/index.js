import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];
/* Elements */

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#card-add-modal");
const profileEditCloseButton = profileEditModal.querySelector(
  "#profile-closed-button"
);
const previewImageModal = document.querySelector("#image-modal");
const previewImageModalCloseButton =
  previewImageModal.querySelector("#image-modal-close");
const previewCaption = previewImageModal.querySelector(
  "#preview-image-caption"
);
const addCardCloseButton = addCardModal.querySelector("#card-closed-button");
const addNewCardButton = document.querySelector("#card-add-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector("#profile-edit-form");
const addCardForm = addCardModal.querySelector("#add-card-form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardTitleInput = addCardForm.querySelector(".modal__input_type_title");
const cardUrlInput = addCardForm.querySelector(".modal__input_type_url");

const cardSelector = "#card-template";

/* Functions */
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

function renderCard(data, wrapper) {
  const card = new Card(data, "#card-template").getView();
  wrapper.prepend(card);
}

/* Handlers */

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopUp(profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closePopUp(addCardModal);
  addCardForm.reset();
  addFormValidator.resetValidation();
}

/* Event Listeners */

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});
profileEditCloseButton.addEventListener("click", () =>
  closePopUp(profileEditModal)
);
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);
addNewCardButton.addEventListener("click", () => openModal(addCardModal));
addCardCloseButton.addEventListener("click", () => closePopUp(addCardModal));
previewImageModalCloseButton.addEventListener("click", () =>
  closePopUp(previewImageModal)
);

initialCards.forEach((data) => renderCard(data, cardListEl));

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(settings, profileEditForm);
const addFormValidator = new FormValidator(settings, addCardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

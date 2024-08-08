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
const previewImageModal = document.querySelector("#image-modal");
const previewImage = previewImageModal.querySelector("#preview-image");
const previewCaption = previewImageModal.querySelector(
  "#preview-image-caption"
);
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

const modalCloseButtons = document.querySelectorAll(".modal__close");

/* Functions */
function clickToCloseListener(event) {
  if (event.target.classList.contains("modal_opened")) {
    closePopUp(event.target);
  }
}

function escToCloseListener(event) {
  if (event.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    event.preventDefault();
    if (modal) {
      closePopUp(modal);
    }
  }
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("click", clickToCloseListener);
  document.addEventListener("keydown", escToCloseListener);
}

function closePopUp(modal) {
  modal.classList.remove("modal_opened");
  modal.removeEventListener("click", clickToCloseListener);
  document.removeEventListener("keydown", escToCloseListener);
}

function createCard(data) {
  const cardElement = new Card(data, "#card-template", handleImageClick);
  return cardElement.getView();
}

function renderCard(data, wrapper) {
  const card = createCard(data);
  wrapper.prepend(card);
}

/* Handlers */

function handleImageClick(data) {
  previewImage.src = data.link;
  previewImage.alt = data.name;
  previewCaption.textContent = data.name;
  openModal(previewImageModal);
}

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
  addFormValidator._toggleButtonState();
}

/* Event Listeners */

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);
addNewCardButton.addEventListener("click", () => openModal(addCardModal));
modalCloseButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closePopUp(popup));
});

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

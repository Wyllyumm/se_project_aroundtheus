import FormValidator from "../components/FormValidator.js";
import { initialCards, settings } from "../utils/constants.js";
import Card from "../components/Card.js";
import "./index.css";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
("../components/PopupWithForm.js");

/* Elements */

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#card-add-modal");
const addNewCardButton = document.querySelector("#card-add-button");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector("#profile-edit-form");
const addCardForm = addCardModal.querySelector("#add-card-form");

/* Functions */

function createCard(data) {
  const cardElement = new Card(data, "#card-template", handleImageClick);
  return cardElement.getView();
}

const section = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = createCard(data);
      section.addItem(card);
    },
  },
  ".cards__list"
);
section.renderItems();

/* Handlers */
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const imagePopup = new PopupWithImage("#image-modal");

function handleImageClick(popupSelector, link, name) {
  imagePopup.open(popupSelector, link, name);
}
imagePopup.setEventListeners();

const newCardPopup = new PopupWithForm("#card-add-modal", handleCardFormSubmit);
newCardPopup.setEventListeners();

const newProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileFormSubmit
);
newProfilePopup.setEventListeners();

function handleCardFormSubmit(inputValues) {
  const card = createCard({ name: inputValues.title, link: inputValues.url });
  section.addItem(card);
  /*toggleButtonState no longer working */
  addFormValidator.toggleButtonState();
}

function handleProfileFormSubmit(inputValues) {
  userInfo.setUserInfo({
    name: inputValues.name,
    description: inputValues.description,
  });
}

/* Event Listeners */

profileEditButton.addEventListener("click", () => {
  const { name, description } = userInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = description;
  newProfilePopup.open();
  editFormValidator.resetValidation();
});

addNewCardButton.addEventListener("click", () => newCardPopup.open());

const editFormValidator = new FormValidator(settings, profileEditForm);
const addFormValidator = new FormValidator(settings, addCardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

import FormValidator from "../components/FormValidator.js";
import { settings } from "../utils/constants.js";
import Card from "../components/Card.js";
import "./index.css";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Api from "../components/Api.js";
import PopupConfirmation from "../components/PopupConfirmation.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "967eb4d1-2e88-4a75-bdf4-9be2dee67768",
    "Content-Type": "application/json",
  },
});

api
  .getProfileInfo()
  .then(({ name, about, avatar }) => {
    userInfo.setUserInfo({ name, about });
    userInfo.setAvatar({ avatar });
  })
  .catch((err) => {
    console.error(err);
  });

const section = new Section(
  {
    items: [],
    renderer,
  },
  ".cards__list"
);

api
  .getInitialCards()
  .then((cardData) => {
    /*const section = new Section({ items: cardData, renderer }, ".cards__list");*/
    section.renderItems(cardData);
  })
  .catch((err) => {
    console.error(err);
  });

/*api
  .getInitialCards()
  .then((cardData) => {
    const section = new Section({ items: [], renderer }, ".cards__list");
    section.renderItems(cardData);
  })
  .catch((err) => {
    console.error(err);
  });*/

/* Elements */
const imageEditButton = document.querySelector(".profile__image-edit-icon");
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#card-add-modal");
const profileImageModal = document.querySelector("#avatar-modal");
const addNewCardButton = document.querySelector("#card-add-button");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileImageForm = profileImageModal.querySelector("#avatar-edit-form");
const profileEditForm = profileEditModal.querySelector("#profile-edit-form");
const addCardForm = addCardModal.querySelector("#add-card-form");

const deleteConfirmPopup = new PopupConfirmation("#delete-modal");
deleteConfirmPopup.setEventListeners();
/* Functions */

function createCard(data) {
  const cardElement = new Card(
    data,
    "#card-template",
    handleImageClick,
    handleDeleteCard,
    handleLikeCard
  );
  return cardElement.getView();
}

function handleDeleteCard(data) {
  deleteConfirmPopup.open();
  deleteConfirmPopup.setSubmit(() => {
    return api.deleteCard(data.getId()).then(() => data.handleDeleteButton());
  });
}

function handleLikeCard(data) {
  if (!data.isLiked) {
    api
      .likeCard(data.getId())
      .then(() => {
        data.setIsLiked(true);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .dislikeCard(data.getId())
      .then(() => {
        data.setIsLiked(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

function renderer(data) {
  const card = createCard(data);
  section.addItem(card);
}

/* Handlers */
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

const imagePopup = new PopupWithImage("#image-modal");
imagePopup.setEventListeners();

function handleImageClick(data) {
  imagePopup.open(data);
}

const newCardPopup = new PopupWithForm("#card-add-modal", handleCardFormSubmit);
newCardPopup.setEventListeners();

const newProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileFormSubmit
);
newProfilePopup.setEventListeners();

const avatarPopup = new PopupWithForm("#avatar-modal", handleAvatarFormSubmit);
avatarPopup.setEventListeners();

function handleCardFormSubmit(inputValues) {
  return api
    .postCards(inputValues)
    .then((data) => {
      renderer(data);
    })
    .finally(() => {
      newCardPopup.setLoading(false);
    });
}
/*function handleCardFormSubmit({ inputValues }) {
  api
    .postCards(inputValues)
    .then(() => {
      renderer({ inputValues });
    })

    .finally(() => {
      newCardPopup.setLoading(false);
    });
}*/

function handleProfileFormSubmit(inputValues) {
  return api
    .patchProfileInfo(inputValues)
    .then(() => {
      userInfo.setUserInfo({
        name: inputValues.name,
        about: inputValues.about,
      });
    })
    .finally(() => {
      newProfilePopup.setLoading(false);
    });
}

function handleAvatarFormSubmit(inputValues) {
  return api
    .patchProfileAvatar(inputValues)
    .then(() => {
      userInfo.setAvatar({ avatar: inputValues.avatar });
    })
    .finally(() => {
      avatarPopup.setLoading(false);
    });
}

/*function handleProfileFormSubmit(inputValues) {
  userInfo.setUserInfo({
    name: inputValues.name,
    about: inputValues.about,
  });
}old code*/

/* Event Listeners */

profileEditButton.addEventListener("click", () => {
  const { name, about } = userInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = about;
  newProfilePopup.open();
  editFormValidator.resetValidation();
});

addNewCardButton.addEventListener("click", () => {
  newCardPopup.open();
  addFormValidator.toggleButtonState();
});

imageEditButton.addEventListener("click", () => {
  avatarPopup.open();
  avatarFormValidator.toggleButtonState();
});

const editFormValidator = new FormValidator(settings, profileEditForm);
const addFormValidator = new FormValidator(settings, addCardForm);
const avatarFormValidator = new FormValidator(settings, profileImageForm);
editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidator.enableValidation();

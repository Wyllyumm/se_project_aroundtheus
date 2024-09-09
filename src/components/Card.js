class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteCard,
    handleLikeCard
  ) {
    this._name = data.name;
    this._link = data.link;
    this.id = data._id;
    this.isLiked = data.isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard;
  }
  getId() {
    return this.id;
  }

  setIsLiked(isLiked) {
    this.isLiked = isLiked;
    this.handleLikeButton();
  }

  handleLikeButton() {
    if (
      this.isLiked
        ? this._likeButton.classList.add("cards__like-button_active")
        : this._likeButton.classList.remove("cards__like-button_active")
    );
  }
  handleDeleteButton() {
    this._deleteButton.closest(".card").remove();
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeCard(this);
    });
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard(this);
    });
    this._cardImage.addEventListener("click", () =>
      this._handleImageClick({ link: this._link, name: this._name })
    );
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }
  getView() {
    this._element = this._getTemplate();
    this._element.querySelector(".cards__title").textContent = this._name;
    this._likeButton = this._element.querySelector(".cards__like-button");
    this._deleteButton = this._element.querySelector(".cards__delete-button");
    this._cardImage = this._element.querySelector(".cards__image");
    this._cardImage.setAttribute("src", this._link);
    this._cardImage.setAttribute("alt", this._name);
    this.handleLikeButton();
    this._setEventListeners();
    return this._element;
  }
}

export default Card;

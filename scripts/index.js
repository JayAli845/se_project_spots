const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant Terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest connecting both sides",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Landscape view test",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
];

const cardTemplate = document.querySelector("#card-template");
const cardsContainer = document.querySelector(".cards__list");

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostForm = newPostModal.querySelector(".modal__form");
const cardImageInput = newPostModal.querySelector("#card-image-input");
const cardCaptionInput = newPostModal.querySelector("#profile-caption-input");

const previewModal = document.querySelector("#preview-image-modal");
const previewCloseBtn = previewModal.querySelector(".modal__close-btn");
const previewImage = previewModal.querySelector(".modal__preview-image");
const previewCaption = previewModal.querySelector(".modal__caption");

const profileNameElement = document.querySelector(".profile__name");
const profileDescriptionElement = document.querySelector(
  ".profile__description"
);

function getCardElement(data) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardListItem = cardElement.querySelector(".card");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  likeButton.addEventListener("click", function (evt) {
    evt.stopPropagation();
    this.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", function (evt) {
    evt.stopPropagation();
    if (confirm("Are you sure you want to delete this post?")) {
      cardListItem.remove();
    }
  });

  cardImage.addEventListener("click", function () {
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewCaption.textContent = data.name;

    openModal(previewModal);
  });

  return cardElement;
}

function renderCards() {
  initialCards.forEach(function (card) {
    const cardElement = getCardElement(card);
    cardsContainer.appendChild(cardElement);
  });
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.body.style.overflow = "hidden";
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.body.style.overflow = "auto";
}

editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameElement.textContent;
  editProfileDescriptionInput.value = profileDescriptionElement.textContent;
  openModal(editProfileModal);
});

editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

previewCloseBtn.addEventListener("click", function () {
  closeModal(previewModal);
});

previewModal.addEventListener("click", function (evt) {
  if (evt.target === previewModal) {
    closeModal(previewModal);
  }
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = editProfileNameInput.value;
  profileDescriptionElement.textContent = editProfileDescriptionInput.value;
  closeModal(editProfileModal);
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

function handleNewPostSubmit(evt) {
  evt.preventDefault();

  const cardName = cardCaptionInput.value;
  const cardLink = cardImageInput.value;

  if (!cardName.trim() || !cardLink.trim()) {
    alert("Please fill in both the caption and image link fields.");
    return;
  }

  const newCard = {
    name: cardName,
    link: cardLink,
  };
  const cardElement = getCardElement(newCard);
  cardsContainer.prepend(cardElement);

  newPostForm.reset();
  closeModal(newPostModal);
}

newPostForm.addEventListener("submit", handleNewPostSubmit);

renderCards();

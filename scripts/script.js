//navbar highlights
window.addEventListener("DOMContentLoaded", () => {
  let sections = document.querySelectorAll("section");
  let navLinks = document.querySelectorAll(".navbar__item");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - sectionHeight / 10) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((navLink) => {
      navLink.classList.remove("active");

      if (navLink.getAttribute("href").slice(1) === current) {
        navLink.classList.add("active");
      }
    });
  });
});

//doge parallax
document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("scroll", function () {
    var wrapperElement = document.querySelector(".doge__wrapper");
    var scrollPosition = window.scrollY - wrapperElement.offsetTop;
    var parallaxElement = wrapperElement.querySelector(".doge__parallax");
    parallaxElement.style.transform =
      "translate3d(0, " + -scrollPosition / 3 + "px, 0)";
  });
});

//products from API
let pageNumber = 1;
const pageSize = 8;
let fetchedData = [];
let fetchingData = false;

function createGreyBox(id) {
  const greyBoxDiv = document.createElement("div");
  greyBoxDiv.classList.add("product__box");

  const pElement = document.createElement("p");
  pElement.classList.add("product__box__paragraph");
  pElement.innerText = `ID: ${id}`;

  greyBoxDiv.appendChild(pElement);

  return greyBoxDiv;
}

function renderGreyBoxes(data) {
  const container = document.getElementById("products__list");

  data.forEach((item) => {
    const greyBox = createGreyBox(item.id);
    container.appendChild(greyBox);
  });
}

function fetchData() {
  if (fetchingData) return;

  const apiUrl = `https://brandstestowy.smallhost.pl/api/random?pageNumber=${pageNumber}&pageSize=${pageSize}`;

  fetchingData = true;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      fetchedData = fetchedData.concat(data.data);
      renderGreyBoxes(data.data);
      pageNumber++;
      fetchingData = false;
    });
}

//lazy loading
window.addEventListener("scroll", function () {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    fetchData();
  }
});

//modal
function openModal(id, value, name) {
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modal__content");
  modal.style.display = "block";
  modalContent.innerHTML = `
    <p class="modal__data">${id}</p>
    <p class="modal__data">Name: ${name}</p>
    <p class="modal__data">Value: ${value}</p>
  `;
}

document.addEventListener("click", function (event) {
  const clickedElement = event.target;

  if (clickedElement.classList.contains("product__box")) {
    const id = clickedElement.innerText.split(": ")[1];
    const dataItem = fetchedData.find((item) => item.id == id);

    if (dataItem) {
      openModal(dataItem.id, dataItem.value, dataItem.name);
    }
  }
});

document.addEventListener("click", function (event) {
  const clickedElement = event.target;

  if (clickedElement.classList.contains("close")) {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
  }

  if (
    !clickedElement.closest(".modal__content") &&
    !clickedElement.classList.contains("product__box")
  ) {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
  }
});

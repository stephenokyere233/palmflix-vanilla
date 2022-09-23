const btn = document.querySelector(".fa-sun");
const wrapper = document.querySelector(".wrapper");
const menu = document.querySelectorAll(".hamburger");
let tablet = document.querySelector("#tab");
let expanded = document.querySelector("#expand");
let showcase = document.querySelector(".showcase");
let movieCard = document.querySelectorAll(".card");
let moviePreview = document.querySelector("#movie-preview");
let movieSelect = document.querySelector("#movies-select");
let search = document.querySelector(".fa-magnifying-glass");
let backBtn = document.querySelector(".back");

const toggleMode = () => {
  document.body.classList.toggle("dark");
  if (btn.classList.contains("fa-sun")) {
    btn.classList.remove("fa-sun");
    btn.classList.add("fa-moon");
  } else {
    btn.classList.add("fa-sun");
    btn.classList.remove("fa-moon");
  }
};
btn.addEventListener("click", toggleMode);

const hideElements = (e) => {
  // let clicked = false;
  if (
    e.target.parentNode.id === "tab" ||
    e.target.classList.contains("hamburger") ||
    e.target.classList.contains("fa-bars")
  ) {
    // clicked = true;
    tablet.style.display = "none";
    expanded.style.display = "block";
    movieSelect.classList.add("opacity");
    moviePreview.classList.add("opacity");
    wrapper.classList.add("disablescroll");
    movieCard.forEach((element) => {
      element.removeEventListener("click", showMoviePreview);
    });
  } else {
    tablet.style.display = "flex";
    expanded.style.display = "none";
    movieSelect.classList.remove("opacity");
    moviePreview.classList.remove("opacity");
    wrapper.classList.remove("disablescroll");
    movieCard.forEach((element) => {
      element.addEventListener("click", showMoviePreview);
    });
  }
};
menu.forEach((element) => {
  element.addEventListener("click", hideElements);
});

const showMoviePreview = (e) => {
  if (e.target.parentNode.classList.contains("card")) {
    wrapper.scrollTo(0, 0);
    moviePreview.classList.remove("hide");
    movieSelect.classList.add("hide");
  }
};
movieCard.forEach((element) => {
  element.addEventListener("click", showMoviePreview);
});
const goBack = () => {
  moviePreview.classList.add("hide");
  movieSelect.classList.remove("hide");
};

backBtn.addEventListener("click", goBack);

const dontShow = (e) => {
  if (hideElements) {
    if (e.target !== expanded) {
      tablet.style.display = "flex";
      expanded.style.display = "none";
      movieSelect.classList.remove("opacity");
      moviePreview.classList.remove("opacity");
      wrapper.classList.remove("disablescroll");
      movieCard.forEach((element) => {
        element.addEventListener("click", showMoviePreview);
      });
    }
  }
};
movieSelect.addEventListener("click", dontShow);
moviePreview.addEventListener("click", dontShow);

search.addEventListener("click", hideElements);

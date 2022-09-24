const api_key = `49aadc9bda210df9f0d47e374c404fd5`;
const api_url = `https://api.themoviedb.org/3/`;
const img_path = `https://image.tmdb.org/t/p/w1280`;
const popular_movies = `${api_url}movie/popular?api_key=${api_key}&language=en-US`;
const discover_movies = `${api_url}discover/movie?api_key=${api_key}&language=en-US`;
const tv_shows = `${api_url}tv/popular?api_key=${api_key}&language=en-US`;
const trending_movies = `${api_url}trending/all/day?api_key=${api_key}&language=en-US`;
const search_url = `${api_url}search/multi?api_key=${api_key}&language=en-US&page=1`;

const btn = document.querySelector(".fa-sun");
const wrapper = document.querySelector(".wrapper");
const menu = document.querySelectorAll(".hamburger");
let tablet = document.querySelector("#tab");
let expanded = document.querySelector("#expand");
let showcase = document.querySelector(".showcase");
let moviePreview = document.querySelector("#movie-preview");
let movieSelect = document.querySelector("#movies-select");
let search = document.querySelector(".fa-magnifying-glass");
let backBtn = document.querySelector(".back");
let movieCardsSection = document.querySelector("#movie-cards");
let moviecardTemplate = document.getElementById("card-template");
let movieCard = document.getElementsByClassName("card");
let apiFetch = [popular_movies, trending_movies, tv_shows];
let cardslist = [];
let cardImages = [];
const maxCards = 20;
let home = document.getElementById("home");

const createCards = () => {
  for (let i = 0; i < maxCards; i++) {
    movieCard = document.createElement("div");
    movieCard.classList.add("card");
    movieCard.classList.add("skeleton");
    let cardImg = document.createElement("img");
    movieCard.append(cardImg);
    movieCardsSection.append(movieCard);
    cardslist.push(movieCard);
  }
};

window.addEventListener("load", createCards);

const getMovieCards = (e) => {
  cardslist.forEach((card, index) => {
    cardslist.innerHTML = "";
    if (e.target.classList.contains("fa-fire-flame-curved")) {
      fetch(`${apiFetch[1]}`)
        .then((res) => res.json())
        .then((movies) => {
          card.innerHTML = `<img src=${img_path}${movies.results[index].poster_path}>`;
        });
    } else if (e.target.classList.contains("fa-tv")) {
      fetch(`${apiFetch[2]}`)
        .then((res) => res.json())
        .then((movies) => {
          card.innerHTML = `<img src=${img_path}${movies.results[index].poster_path}>`;
        });
    } else if (e.target.classList.contains("fa-house")) {
      fetch(`${apiFetch[0]}`)
        .then((res) => res.json())
        .then((movies) => {
          card.innerHTML = `<img src=${img_path}${movies.results[index].poster_path}>`;
        });
    }
    // e.target.classList.add('active')

  });
};
tablet.addEventListener("click", getMovieCards);

window.addEventListener('load',()=>{
  home.classList.add('active')
  home.click()
})

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
    cardslist.forEach((element) => {
      console.log("moviecard");

      element.removeEventListener("click", showMoviePreview);
    });
  } else {
    tablet.style.display = "flex";
    expanded.style.display = "none";
    movieSelect.classList.remove("opacity");
    moviePreview.classList.remove("opacity");
    wrapper.classList.remove("disablescroll");
    cardslist.forEach((element) => {
      console.log("moviecard");

      element.addEventListener("click", showMoviePreview);
    });
  }
};
menu.forEach((element) => {
  element.addEventListener("click", hideElements);
});

let herosection = document.querySelector(".hero-section");
const showMoviePreview = (e) => {
  if (e.target.parentNode.classList.contains("card")) {
    wrapper.scrollTo(0, 0);
    moviePreview.classList.remove("hide");
    herosection.classList.add("hide");
  }
};
window.addEventListener("load", () => {
  cardslist.forEach((element) => {
    // console.log("moviecard");
    element.addEventListener("click", showMoviePreview);
  });
});

const goBack = () => {
  moviePreview.classList.add("hide");
  herosection.classList.remove("hide");
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
      cardslist.forEach((element) => {
        element.addEventListener("click", showMoviePreview);
      });
    }
  }
};
movieSelect.addEventListener("click", dontShow);
moviePreview.addEventListener("click", dontShow);

search.addEventListener("click", hideElements);

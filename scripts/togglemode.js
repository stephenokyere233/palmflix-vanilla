const api_key = `49aadc9bda210df9f0d47e374c404fd5`;
const api_url = `https://api.themoviedb.org/3/`;
const img_path = `https://image.tmdb.org/t/p/w1280`;
const popular_movies = `${api_url}movie/popular?api_key=${api_key}&language=en-US`;
const discover_movies = `${api_url}discover/movie?api_key=${api_key}&language=en-US`;
const tv_shows = `${api_url}tv/popular?api_key=${api_key}&language=en-US`;
const trending_movies = `${api_url}trending/all/day?api_key=${api_key}&language=en-US`;
const top_rated = `${api_url}discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=${api_key}&language=en-US`;
const search_url = `${api_url}search/multi?api_key=${api_key}&language=en-US&page=1`;

const btn = document.querySelector(".fa-sun");
const wrapper = document.querySelector(".wrapper");
const menu = document.querySelectorAll(".hamburger");
let tablet = document.querySelector("#tab");
let expanded = document.querySelector("#expand");

let moviePreview = document.querySelector("#movie-preview");
let movieSelect = document.querySelector("#movies-select");
let search = document.querySelector(".fa-magnifying-glass");
let backBtn = document.querySelector(".back");
let movieCardsSection = document.querySelector("#movie-cards");
let movieCard = document.getElementsByClassName("card");
let genreName = document.querySelector(".name-btn");
let cardsList = [];
const maxCards = 20;
let home = document.getElementById("home");
const form = document.querySelector(".searchForm");
const searchBox = document.querySelector("#searchBox");
let textOnBg = document.querySelector(".textonbg");
let rating = document.querySelector(".rating");
let movieDes = document.querySelector(".movie-description");
let spans = document.querySelectorAll(".span");
let movieName = document.querySelector(".name");
let heroSection = document.querySelector(".hero-section");
let fetchFrom;

let prev = document.querySelector(".prev");
let next = document.querySelector(".next");
let currentPage = 1;
let nextPage = 2;
let prevPage = 3;
let lastUrl = "";
let totalPages = 100;

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

function getMovies(url) {
  lastUrl = url;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.results.length !== 0) {
        showMovies(data.results);
        currentPage = data.page;
        nextPage = currentPage + 1;
        prevPage = currentPage - 1;
        totalPages = data.total_pages;
      } else {
        moviePreview.innerHTML = "NO MOVIES";
      }
    });
}
window.addEventListener("load", () => {
  home.classList.add("active");
  home.click();
});

function showMovies(data) {
  movieCardsSection.innerHTML = "";
  data.forEach((movie, index) => {
    const { title, poster_path, overview, vote_average } = movie;
    const movieCard = document.createElement("div");
    movieCard.classList.add("card");
    movieCard.classList.add("skeleton");
    movieCard.setAttribute("id", index);
    movieCard.innerHTML = `<img src=${img_path + poster_path}>`;
    movieCardsSection.appendChild(movieCard);
    cardsList.push(movieCard);
  });
}

function pageCall(page) {
  let split = lastUrl.split("?");
  let query = split[1].split("&");
  let key = query[query.length - 1].split("=");
  if (key[0] != "page") {
    let url = lastUrl + "&page=" + page;
    getMovies(url);
  } else {
    key[1] = page.toString();
    let newPage = key.join("=");
    query[query.length - 1] = newPage;
    let y = query.join("&");
    let url = split[0] + `?` + y;
    getMovies(url);
  }
}
next.addEventListener("click", () => {
  if (nextPage <= totalPages) {
    pageCall(nextPage);
  }
});
prev.addEventListener("click", () => {
  if (prevPage > 0) {
    pageCall(prevPage);
  }
});

function otherUrls(e) {
  if (
    e.target.classList.contains("fa-house") ||
    e.target.classList.contains("nav-item")
  ) {
    fetchFrom = popular_movies;
    getMovies(discover_movies);
    genreName.innerHTML = "Discover Movies";
  } else if (
    e.target.classList.contains("fa-fire-flame-curved") ||
    e.target.classList.contains("nav-item")
  ) {
    fetchFrom = trending_movies;
    getMovies(trending_movies);
    genreName.innerHTML = "Trending Movies";
  } else if (
    e.target.classList.contains("fa-tv") ||
    e.target.classList.contains("nav-item")
  ) {
    fetchFrom = tv_shows;
    getMovies(tv_shows);
    genreName.innerHTML = "TV Shows";
  } else if (
    e.target.classList.contains("fa-clapperboard") ||
    e.target.classList.contains("nav-item")
  ) {
    fetchFrom = top_rated;
    getMovies(top_rated);
    genreName.innerHTML = "Top Rated";
  }
}
tablet.addEventListener("click", otherUrls);
window.addEventListener("load", otherUrls);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  wrapper.scroll(0, 0);
  const searchValue = searchBox.value;
  if (searchValue) {
    movieSelect.click();
    genreName.innerHTML = "Search Results";
    getMovies(search_url + "&query=" + searchValue);
  } else {
    searchValue = "";
  }
});

let clicked = false;
function showSideBar(e) {
  clicked = true;
  if (
    e.target.classList.contains("fa-bars") ||
    e.target.classList.contains("hamburger") ||
    e.target.id === "menu-text" ||
    e.target.classList.contains("fa-magnifying-glass")
  ) {
    tablet.classList.toggle("hide");
    expanded.classList.toggle("hide");
    movieSelect.classList.toggle("opacity");
    cardsList.forEach((card) => {
      card.classList.add("dontPoint");
    });
    wrapper.classList.toggle("disablescroll");
  }
}
search.addEventListener("click", showSideBar);
search.addEventListener("click", () => {
  searchBox.focus();
});
menu.forEach((element) => {
  element.addEventListener("click", showSideBar);
});
function dontShow() {
  if (clicked === true) {
    tablet.classList.remove("hide");
    expanded.classList.add("hide");
    movieSelect.classList.remove("opacity");
    wrapper.classList.remove("disablescroll");
    cardsList.forEach((card) => {
      card.classList.remove("dontPoint");
    });
  }
}
movieSelect.addEventListener("click", dontShow);

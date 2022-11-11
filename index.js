import {
  API_KEY,
  api_url,
  img_path,
  popular_movies,
  discover_movies,
  tv_shows,
  trending_movies,
  top_rated,
  search_url,
} from "../keys.js";

import { btn,check,changeDark } from "./darkmode.js";

const wrapper = document.querySelector(".wrapper");
const menu = document.querySelectorAll(".hamburger");
let tablet = document.querySelector("#tab");
let expanded = document.querySelector("#expand");

let moviePreview = document.querySelector("#movie-preview");
let movieSelect = document.querySelector("#movies-select");
let search = document.querySelector(".fa-magnifying-glass");
let backBtn = document.querySelector(".back");
let movieCardsSection = document.querySelector("#movie-cards");
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
let trailerBtn = document.querySelector(".trailer");
let fetchFrom;

let prev = document.querySelector(".prev");
let next = document.querySelector(".next");
let currentPage = 1;
let nextPage = 2;
let prevPage = 3;
let lastUrl = "";
let totalPages = 100;
let dataType = "movie";

const showActive = (e) => {
  if (e.target.classList.contains("fa-house")) {
    e.target.classList.add("active");
    document.getElementById("tv").classList.remove("active");
    document.getElementById("movieb").classList.remove("active");
    document.getElementById("trend").classList.remove("active");
  } else if (e.target.classList.contains("fa-fire-flame-curved")) {
    e.target.classList.add("active");
    document.getElementById("tv").classList.remove("active");
    document.getElementById("movieb").classList.remove("active");
    document.getElementById("home").classList.remove("active");
  } else if (e.target.classList.contains("fa-tv")) {
    e.target.classList.add("active");
    document.getElementById("home").classList.remove("active");
    document.getElementById("movieb").classList.remove("active");
    document.getElementById("trend").classList.remove("active");
  } else if (e.target.classList.contains("fa-clapperboard")) {
    e.target.classList.add("active");
    document.getElementById("tv").classList.remove("active");
    document.getElementById("home").classList.remove("active");
    document.getElementById("trend").classList.remove("active");
  }
};
tablet.addEventListener("click", showActive);

if (localStorage.getItem("theme") === null) {
  localStorage.setItem("theme", "true");
}
check();
btn.addEventListener("click", changeDark);

function getMovies(url) {
  lastUrl = url;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.results.length !== 0) {
        showMovieCards(data.results);
        currentPage = data.page;
        nextPage = currentPage + 1;
        prevPage = currentPage - 1;
        totalPages = data.total_pages;
      } else {
        moviePreview.innerHTML = "NO MOVIES";
      }
    })
    .catch((err) => console.log(`can't fetch data`));
}
window.addEventListener("load", () => {
  home.classList.add("active");
  home.click();
});
function goBack() {
  moviePreview.classList.add("hide");
  heroSection.style.display = "flex";
}
backBtn.addEventListener("click", goBack);
async function showMovieCards(data, e) {
  movieCardsSection.innerHTML = "";
  data.forEach((movie) => {
    const { title, poster_path, name, id } = movie;
    const movieCard = document.createElement("div");
    movieCard.classList.add("card");
    movieCard.classList.add("skeleton");
    movieCard.setAttribute("id", id);
    movieCard.setAttribute("name", title ? title : name);
    movieCard.innerHTML = `<img src=${img_path + poster_path}>`;
    movieCardsSection.appendChild(movieCard);
    cardsList.push(movieCard);
  });

  let CastList = document.querySelector(".cast-list");

  async function getCast(id) {
    const credit = `https://api.themoviedb.org/3/${dataType}/${id}/credits?api_key=${API_KEY}&language=en-US`;
    fetch(`${credit}`)
      .then((res) => res.json())
      .then((casts) => {
        // console.log(casts);
        CastList.innerHTML = "";
        for (let i = 0; i < 10; i++) {
          const castCard = document.createElement("div");
          castCard.classList.add("cast-card");
          const img = document.createElement("img");
          castCard.append(img);
          const castName = document.createElement("p");
          castName.classList.add("cast-name");
          castCard.appendChild(castName);
          img.src = `${img_path + casts.cast[i].profile_path}`;
          castName.textContent = `${casts.cast[i].name}`;
          CastList.append(castCard);
        }
      });
  }

  cardsList.forEach((element) => {
    element.addEventListener("click", async function () {
      // loading();
      heroSection.style.display = "none";
      moviePreview.classList.remove("hide");
      wrapper.scroll(0, 0);
      try {
        const moviedata = await fetch(
          `https://api.themoviedb.org/3/movie/${element.id}?api_key=${API_KEY}&language=en-US`
        );
        const tvdata = await fetch(
          `https://api.themoviedb.org/3/tv/${element.id}?api_key=${API_KEY}&language=en-US`
        );
        if (!moviedata.ok && !tvdata.ok) throw new Error("eeeee");

        const movieDataRes = await moviedata.json();
        const tvDataRes = await tvdata.json();

        if (movieDataRes.results ?? tvDataRes.results) {
          const finalRes = [tvDataRes.results ?? movieDataRes.results]
            .concat(tvDataRes.results ?? movieDataRes.results)
            .filter((val) => val !== undefined);
          return finalRes;
        }

        // Merges the two objects
        const finalRes = Object.assign(movieDataRes, tvDataRes);
        // console.log(finalRes);
        const {
          poster_path,
          title,
          name,
          backdrop_path,
          status,
          vote_average,
          release_date,
          overview,
          runtime,
          first_air_date,
          episode_run_time,
        } = finalRes;
        backdrop_path === null
          ? (textOnBg.style.background = `url(${img_path + poster_path}`)
          : (textOnBg.style.background = `url(${img_path + backdrop_path}`);
        if (name === undefined) {
          movieName.innerHTML = `${title}`;
        } else {
          movieName.innerHTML = `${name}`;
        }
        rating.textContent = `${vote_average.toFixed(1)}`;
        movieDes.innerHTML = `${overview}`;
        spans[0].textContent = `${status}`;
        runtime === undefined
          ? (spans[1].textContent = `${episode_run_time}mins`)
          : (spans[1].textContent = `${runtime}mins`);
        if (release_date === undefined) {
          spans[2].textContent = `${first_air_date}`;
        } else {
          spans[2].textContent = `${release_date}`;
        }
      } catch {
        console.log((err) => err);
      }

      getCast(element.id);
      trailerBtn.addEventListener("click", () => {
        playTrailer(element.id, name);
      });
    });
  });
}
const loading = () => {
  movieCardsSection.innerHTML = `<div class="loading">
      <img src="./assets/loading.gif" alt="">
      <h1>
        Loading.....
      </h1>
    </div>`;
};

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
    loading();
    wrapper.scroll(0, 0);
    pageCall(nextPage);
  }
});
prev.addEventListener("click", () => {
  if (prevPage > 0) {
    loading();
    wrapper.scroll(0, 0);
    pageCall(prevPage);
  }
});

// let isClicked = false;
function otherUrls(e) {
  // isClicked = true;

  if (
    e.target.classList.contains("fa-house") ||
    e.target.classList.contains("home")
  ) {
    fetchFrom = popular_movies;
    getMovies(discover_movies);
    genreName.innerHTML = "Discover Movies";
    dataType = "movie";
    loading();
  } else if (
    e.target.classList.contains("fa-fire-flame-curved") ||
    e.target.classList.contains("trends")
  ) {
    fetchFrom = trending_movies;
    getMovies(trending_movies);
    genreName.innerHTML = "Trending Movies";
    dataType = "movie";
    loading();
  } else if (
    e.target.classList.contains("fa-tv") ||
    e.target.classList.contains("movies")
  ) {
    fetchFrom = tv_shows;
    getMovies(tv_shows);
    genreName.innerHTML = "TV Shows";
    dataType = "tv";
    loading();
  } else if (
    e.target.classList.contains("fa-clapperboard") ||
    e.target.classList.contains("shows")
  ) {
    fetchFrom = top_rated;
    getMovies(top_rated);
    genreName.innerHTML = "Top Rated";
    dataType = "movie";
    loading();
  }
}
tablet.addEventListener("click", otherUrls);
expanded.addEventListener("click", otherUrls);
expanded.addEventListener("click", (e) => {
  movieSelect.click();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  wrapper.scroll(0, 0);

  let searchValue = searchBox.value;
  if (searchValue) {
    loading();
    movieSelect.click();
    genreName.innerHTML = "Search Results";
    getMovies(search_url + "&query=" + searchValue);
  } else {
    searchValue = "";
  }
  searchValue = "";
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
const overlayContent = document.querySelector(".overlay-content");
let embed = [];
function playTrailer(id, names) {
  console.log("trailer playing");
  console.log(id);
  fetch(`${api_url}${dataType}/${id}/videos?api_key=${API_KEY}&language=en-US`)
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        openNav();
        if (data.results.length > 0) {
          data.results.forEach((video) => {
            let { name, key, site, type } = video;
            if (site === "YouTube" && type === "Trailer") {
              if (
                name === "Official Trailer" ||
                name.includes("Trailer" || name.includes(names))
              ) {
                console.log(video);
                console.log("data available");
                overlayContent.innerHTML = `<iframe id=iframe width="560" height="315" src="https://www.youtube.com/embed/${key}?enablejsapi=1" title=${name} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
                return;
              }
            }
          });
        } else {
          console.log("data unavailable");

          overlayContent.innerHTML = `<h1>Trailer Unavailable</h1>`;
        }
      }
    });
}

// overlay video
function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
  overlayContent.innerHTML = ``;
  // embed = [];
  // let iframe = document.getElementById("iframe").contentWindow;
  // overlayContent.style.display=state=='hide'?'none':"";
  // func=state=='hide'?'pauseVideo':'playVideo';
  // iframe.postMessage({'event':'command',"func":""+func+"","args":""},'*')
  // iframe.close()

  // console.log(iframe);
}
let overlayClose = document.querySelector(".closebtn");
overlayClose.addEventListener("click", closeNav);

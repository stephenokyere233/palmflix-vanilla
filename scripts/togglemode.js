const btn = document.querySelector(".fa-sun");
const wrapper = document.querySelector(".wrapper");
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

const menu = document.querySelectorAll(".hamburger");
// console.log(menu);
let tablet = document.querySelector("#tab");
let expanded = document.querySelector("#expand");
// let width = window.innerWidth;
let showcase = document.querySelector(".showcase");

const hideElements = (e) => {
  let clicked = false;
  if (
    e.target.parentNode.id === "tab" ||
    e.target.classList.contains("hamburger") ||
    e.target.classList.contains("fa-bars")
  ) {
    // console.log("a");
    clicked = true;
    tablet.style.display = "none";
    expanded.style.display = "block";
  } else {
    // console.log("b");
    tablet.style.display = "flex";
    expanded.style.display = "none";
  }
};
menu.forEach((element) => {
  element.addEventListener("click", hideElements);
});
window.addEventListener('click',(e)=>{
  if(e.target===showcase){
    expanded.style.display='none';
    console.log('expansion');
  }

})

let movieCard = document.querySelectorAll(".card");
let moviePreview = document.querySelector("#movie-preview");
let movieSelect = document.querySelector("#movies-select");

const showMoviePreview = (e) => {
  if (e.target.parentNode.classList.contains("card")) {
    console.log("found");
    moviePreview.classList.remove("hide");
    movieSelect.classList.add("hide");
  }
};
movieCard.forEach((element) => {
  element.addEventListener("click", showMoviePreview);
});
// console.log(movieCard);
let backBtn = document.querySelector(".back");
const goBack = () => {
  moviePreview.classList.add("hide");
  movieSelect.classList.remove("hide");
};

backBtn.addEventListener("click", goBack);

let search = document.querySelector(".fa-magnifying-glass");
const openSearch=(e)=>{
  if(e.target===search){
     tablet.style.display = "none";
     expanded.style.display = "block";
    //  console.log('search');
  }

}
search.addEventListener('click',openSearch)

// // test
// import { add } from "./test.js";

// // console.log(add(2,4));
// btn.addEventListener('click',add(5,4))
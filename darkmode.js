export const btn = document.querySelector(".fa-sun");
if (localStorage.getItem("theme") === null) {
  localStorage.setItem("theme", "true");
}
export function check() {
  let current = localStorage.getItem("theme");
  if (current === "false") {
    document.body.classList.add("light");
    btn.classList.remove("fa-sun");
    btn.classList.add("fa-moon");
  } else {
    document.body.classList.remove("light");
    btn.classList.add("fa-sun");
    btn.classList.remove("fa-moon");
  }
}
// check();
export function changeDark() {
  let current = localStorage.getItem("theme");
  if (current === "true") {
    localStorage.setItem("theme", "false");
    document.body.classList.add("light");
    btn.classList.remove("fa-sun");
    btn.classList.add("fa-moon");
  } else {
    localStorage.setItem("theme", "true");
    document.body.classList.remove("light");
    btn.classList.add("fa-sun");
    btn.classList.remove("fa-moon");
  }
}

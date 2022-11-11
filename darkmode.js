export const btn = document.querySelector(".fa-sun");

export const toggleMode = () => {
  document.body.classList.toggle("dark");
  if (btn.classList.contains("fa-sun")) {
    btn.classList.remove("fa-sun");
    btn.classList.add("fa-moon");
  } else {
    btn.classList.add("fa-sun");
    btn.classList.remove("fa-moon");
  }
};

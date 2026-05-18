const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");

burger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

const calendarButtons = document.querySelectorAll(".calendar-grid button");
const timeGrid = document.getElementById("timeGrid");
const selectedDate = document.getElementById("selectedDate");

const monthName = "január 2026";

function renderTimes(times) {
  timeGrid.innerHTML = "";

  times.forEach((time, index) => {
    const button = document.createElement("button");
    button.textContent = time;

    if (index === 0) {
      button.classList.add("active-time");
    }

    button.addEventListener("click", () => {
      document.querySelectorAll(".time-grid button").forEach(btn => {
        btn.classList.remove("active-time");
      });

      button.classList.add("active-time");
    });

    timeGrid.appendChild(button);
  });
}

calendarButtons.forEach(button => {
  button.addEventListener("click", () => {
    if (button.classList.contains("muted")) return;

    calendarButtons.forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");

    const day = button.dataset.day;
    const times = button.dataset.times.split(",");

    selectedDate.textContent = `Vybraný dátum: ${day}. ${monthName}`;
    renderTimes(times);
  });
});

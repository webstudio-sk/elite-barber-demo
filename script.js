const barberEmail = "elitebarber@email.sk";

// ========================
// MOBILE MENU
// ========================
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");

if (burger && navLinks) {
  burger.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");
    burger.classList.toggle("open", isOpen);
    burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    document.body.classList.toggle("menu-open", isOpen);
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      burger.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    });
  });
}

// ========================
// NAVBAR SCROLL EFFECT
// ========================
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    navbar.style.borderBottomColor = "rgba(201, 160, 82, 0.3)";
  } else {
    navbar.style.borderBottomColor = "rgba(201, 160, 82, 0.18)";
  }
}, { passive: true });

// ========================
// BOOKING LOGIC
// ========================
const calendarButtons = document.querySelectorAll(".calendar-grid button");
const timeGrid = document.getElementById("timeGrid");
const selectedDate = document.getElementById("selectedDate");
const bookingButton = document.getElementById("bookingButton");
const customerName = document.getElementById("customerName");
const customerPhone = document.getElementById("customerPhone");

const monthName = "január 2026";

let currentDate = "8. január 2026";
let currentTime = "09:00";

function getSelectedService() {
  const checkedService = document.querySelector('input[name="service"]:checked');
  return checkedService ? checkedService.value : "Nezvolená služba";
}

function updateBookingLink() {
  if (!bookingButton) return;

  const service = getSelectedService();
  const name = customerName.value.trim();
  const phone = customerPhone.value.trim();

  const subject = encodeURIComponent("Rezervácia termínu – Elite Barber Studio");

  const body = encodeURIComponent(
`Dobrý deň,

chcel by som si rezervovať termín.

Služba: ${service}
Dátum: ${currentDate}
Čas: ${currentTime}

Meno: ${name || "–"}
Telefón: ${phone || "–"}

Ďakujem.`
  );

  bookingButton.href = `mailto:${barberEmail}?subject=${subject}&body=${body}`;
}

function setActiveTimeButton(activeButton) {
  document.querySelectorAll(".time-grid button").forEach(btn => {
    btn.classList.remove("active-time");
  });
  activeButton.classList.add("active-time");
  currentTime = activeButton.textContent.trim();
  updateBookingLink();
}

function renderTimes(times) {
  if (!timeGrid) return;

  timeGrid.innerHTML = "";

  times.forEach((time, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = time;

    if (index === 0) {
      button.classList.add("active-time");
      currentTime = time;
    }

    button.addEventListener("click", () => setActiveTimeButton(button));
    timeGrid.appendChild(button);
  });

  updateBookingLink();
}

calendarButtons.forEach(button => {
  button.addEventListener("click", () => {
    if (button.disabled || button.classList.contains("muted")) return;

    calendarButtons.forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");

    const day = button.dataset.day;
    const times = button.dataset.times.split(",");

    currentDate = `${day}. ${monthName}`;
    selectedDate.textContent = `📅 ${currentDate}`;

    renderTimes(times);
  });
});

// Initial time grid click listeners (for the pre-rendered buttons)
document.querySelectorAll(".time-grid button").forEach(button => {
  button.addEventListener("click", () => setActiveTimeButton(button));
});

document.querySelectorAll('input[name="service"]').forEach(input => {
  input.addEventListener("change", updateBookingLink);
});

if (customerName) customerName.addEventListener("input", updateBookingLink);
if (customerPhone) customerPhone.addEventListener("input", updateBookingLink);

if (bookingButton) {
  bookingButton.addEventListener("click", event => {
    const name = customerName.value.trim();
    const phone = customerPhone.value.trim();

    if (!name || !phone) {
      event.preventDefault();
      alert("Prosím, vyplň meno a telefón pred odoslaním rezervácie.");
      if (!name) customerName.focus();
      else customerPhone.focus();
    }
  });
}

updateBookingLink();

// ========================
// SCROLL REVEAL (simple)
// ========================
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

  document.querySelectorAll(".card, .feature, .review, .gallery-item").forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = "opacity 0.55s ease, transform 0.55s ease";
    observer.observe(el);
  });
}

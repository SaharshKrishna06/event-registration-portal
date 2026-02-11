let step = 1;
const steps = document.querySelectorAll(".form-step");
const nav = document.querySelector(".nav");
const menuBtn = document.querySelector(".mobile-menu-toggle");

menuBtn.onclick = () => {
  nav.classList.toggle("active");
  menuBtn.classList.toggle("active");
};

document.querySelectorAll(".nav-link").forEach(link => {
  link.onclick = () => nav.classList.remove("active");
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.onclick = e => {
    e.preventDefault();
    document.querySelector(link.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  };
});

const eventDate = new Date("2026-03-15T10:00:00").getTime();

setInterval(() => {
  const diff = eventDate - Date.now();
  if (diff <= 0) return;

  days.innerText = Math.floor(diff / 86400000);
  hours.innerText = Math.floor(diff / 3600000) % 24;
  minutes.innerText = Math.floor(diff / 60000) % 60;
  seconds.innerText = Math.floor(diff / 1000) % 60;
}, 1000);


function showStep() {
  steps.forEach(s => s.classList.remove("active"));
  steps[step - 1].classList.add("active");
}

function nextStep() {
  if (validateStep()) {
    step++;
    showStep();
  }
}

function prevStep() {
  step--;
  showStep();
}

function validateStep() {
  let valid = true;
  steps[step - 1].querySelectorAll("[required]").forEach(input => {
    if (
      (input.type === "checkbox" && !input.checked) ||
      (!input.value && input.type !== "checkbox")
    ) {
      input.classList.add("error");
      valid = false;
    } else {
      input.classList.remove("error");
    }
  });
  return valid;
}

const form = document.getElementById("registrationForm");
const modal = document.getElementById("successModal");

form.onsubmit = e => {
  e.preventDefault();
  modal.classList.add("active");
  form.reset();
  step = 1;
  showStep();
};

function closeModal() {
  modal.classList.remove("active");
}

window.onscroll = () => {
  document.querySelectorAll(".detail-card, .contact-item").forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }
  });
};

showStep();

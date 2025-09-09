// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const open = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
}

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (!id || id === "#") return;
    const el = document.querySelector(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // close mobile nav after click
      navMenu?.classList.remove("open");
      navToggle?.setAttribute("aria-expanded", "false");
    }
  });
});

// Impact counters animation
const counters = document.querySelectorAll(".stat__num");
const animateCounters = () => {
  counters.forEach((el) => {
    const target = Number(el.dataset.target || "0");
    if (el.dataset.done) return;
    const rect = el.getBoundingClientRect();
    const visible = rect.top < window.innerHeight && rect.bottom > 0;
    if (!visible) return;

    el.dataset.done = "1";
    const duration = 1500;
    const start = performance.now();
    const startVal = 0;

    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const val = Math.floor(startVal + (target - startVal) * p);
      el.textContent = val.toLocaleString();
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
};
window.addEventListener("scroll", animateCounters);
window.addEventListener("load", animateCounters);

// Donation chips -> input binding
const donationInput = document.getElementById("donation");
const donateChips = document.querySelectorAll(".chip");
donateChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    donateChips.forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    const amt = Number(chip.dataset.amount || "0");
    if (donationInput) {
      donationInput.value = amt;
      donationInput.focus();
    }
  });
});

// Demo donate button
const donateNow = document.getElementById("donateNow");
donateNow?.addEventListener("click", () => {
  const val = Number(donationInput?.value || "0");
  if (!val || val < 500) {
    alert("Please enter at least ₦500 to proceed.");
    return;
  }
  alert(
    `Thank you! You are about to donate ₦${val.toLocaleString()}.\n\n(Connect Paystack/Flutterwave here.)`
  );
});

// Contact form (client-side only)
const form = document.getElementById("contactForm");
const note = document.getElementById("formNote");
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = (data.get("name") || "").toString().trim();
  const email = (data.get("email") || "").toString().trim();
  const message = (data.get("message") || "").toString().trim();

  if (!name || !email || !message) {
    note.textContent = "Please fill out all fields.";
    note.style.color = "#ef476f";
    return;
  }

  // Simple email check
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    note.textContent = "destinatravelsandtours@gmail.com";
    note.style.color = "#ef476f";
    return;
  }

  // Demo success
  note.textContent = "Thanks! Your message has been received.";
  note.style.color = "#67e0b7";
  form.reset();
  donateChips.forEach((c) => c.classList.remove("active"));
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

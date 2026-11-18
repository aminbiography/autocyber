document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".menu");
  const nav = document.querySelector(".nav");
  menu.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menu.setAttribute("aria-expanded", String(open));
    menu.textContent = open ? "✕" : "☰";
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
    menu.textContent = "☰";
  }));
  document.querySelector("#year").textContent = new Date().getFullYear();
  document.querySelector("#analyzerForm").addEventListener("submit", event => {
    event.preventDefault();
    const input = document.querySelector("#websiteUrl");
    const note = document.querySelector("#formNote");
    try {
      const value = input.value.trim();
      const url = new URL(/^https?:\\/\\//i.test(value) ? value : `https://${value}`);
      if (!url.hostname.includes(".")) throw new Error("Invalid hostname");
      note.textContent = `Thanks — ${url.hostname} is ready for a future AutoCyber analysis. Scanning is not connected in this prototype.`;
      note.style.color = "#8ee5df";
    } catch {
      note.textContent = "Please enter a valid website address, such as example.com.";
      note.style.color = "#ff9baf";
      input.focus();
    }
  });
});
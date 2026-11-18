
/* =========================================
   AUTOCYBER — MAIN JAVASCRIPT
   Version: Initial Prototype
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* -----------------------------------------
     1. MOBILE NAVIGATION
     ----------------------------------------- */

  const menu = document.querySelector(".menu");
  const nav = document.querySelector(".nav");

  if (menu && nav) {

    menu.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");

      menu.setAttribute("aria-expanded", String(isOpen));
      menu.textContent = isOpen ? "✕" : "☰";
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {

        nav.classList.remove("open");

        menu.setAttribute("aria-expanded", "false");
        menu.textContent = "☰";

      });
    });

  }


  /* -----------------------------------------
     2. AUTOMATIC FOOTER YEAR
     ----------------------------------------- */

  const yearElement = document.querySelector("#year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  /* -----------------------------------------
     3. WEBSITE ANALYZER — FORM ELEMENTS
     ----------------------------------------- */

  const analyzerForm = document.querySelector("#analyzerForm");
  const websiteInput = document.querySelector("#websiteUrl");
  const formNote = document.querySelector("#formNote");

  if (!analyzerForm || !websiteInput || !formNote) {
    return;
  }


  /* -----------------------------------------
     4. WEBSITE URL VALIDATION
     ----------------------------------------- */

  function validateWebsiteUrl(value) {

    const trimmedValue = value.trim();

    if (!trimmedValue) {
      throw new Error("Please enter a website address.");
    }

    // Add HTTPS when the user does not specify a protocol.
    const normalizedValue = /^https?:\/\//i.test(trimmedValue)
      ? trimmedValue
      : `https://${trimmedValue}`;

    const url = new URL(normalizedValue);

    // Only allow HTTP and HTTPS addresses.
    if (!["http:", "https:"].includes(url.protocol)) {
      throw new Error("Only HTTP and HTTPS website addresses are supported.");
    }

    // Require a hostname containing a valid domain structure.
    if (
      !url.hostname ||
      !url.hostname.includes(".") ||
      url.hostname.startsWith(".") ||
      url.hostname.endsWith(".")
    ) {
      throw new Error("Please enter a valid website domain.");
    }

    // Reject URLs containing embedded usernames or passwords.
    if (url.username || url.password) {
      throw new Error("Website addresses must not contain login credentials.");
    }

    return url;

  }


  /* -----------------------------------------
     5. DISPLAY FORM FEEDBACK
     ----------------------------------------- */

  function showMessage(message, color) {

    formNote.textContent = message;
    formNote.style.color = color;

  }


  /* -----------------------------------------
     6. ANALYZER FORM SUBMISSION
     ----------------------------------------- */

  analyzerForm.addEventListener("submit", (event) => {

    event.preventDefault();

    try {

      const websiteUrl = validateWebsiteUrl(websiteInput.value);

      // Display the normalized URL in the input.
      websiteInput.value = websiteUrl.href;

      // Prototype feedback — actual scanning is not connected yet.
      showMessage(
        `Thanks — ${websiteUrl.hostname} is ready for a future AutoCyber analysis. Website scanning is not connected yet.`,
        "#8ee5df"
      );

    } catch (error) {

      showMessage(
        error.message || "Please enter a valid website address, such as example.com.",
        "#ff9baf"
      );

      websiteInput.focus();

    }

  });

});

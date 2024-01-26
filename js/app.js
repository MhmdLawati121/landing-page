/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Global Variables
 *
 */

// Number of sections in the document - change this value if number of sections change
const number_of_sections = 4;

// Array to store elements
const sections = [];

// Navigation bar element
const nav_bar = document.getElementById("navbar__list");

// Array to store navigation bar anchor elements
const anchors = [];

// HTMLCollection to store all section headings
const section_titles = document.getElementsByTagName("h2");

// Creating list of all sections
for (let i = 1; i <= number_of_sections; i++) {
  const section = document.getElementById("section" + i);
  sections.push(section);
}

/**
 * End Global Variables
 *
 * Begin Main Functions
 */

/**
 * @description Creates a navigation bar dynamically
 * @param {HTMLCollection} headings
 */
function buildNav(headings) {
  for (let item of headings) {
    const section_id = item.parentElement.parentElement.id;

    // Creating list and anchor elements
    const list_item = document.createElement("li");
    const list_anchor = document.createElement("a");

    // Setting anchor content and id (id set to include section name for easier reference)
    list_anchor.textContent = item.textContent;
    list_anchor.classList.add("menu__link");
    list_anchor.id = "a" + section_id;

    anchors.push(list_anchor);

    list_item.appendChild(list_anchor);
    nav_bar.appendChild(list_item);
  }
}

/**
 * @description Add active classes to nav-bar anchor and section when entering viewport
 */
function activateArea() {
  for (let section of sections) {
    const rect = section.getBoundingClientRect();
    const menu = document.getElementById("a" + section.id);

    // Check if in viewport and near the top
    if (rect.top <= 100 && rect.bottom >= 100) {
      section.classList.add("your-active-class");
      menu.classList.add("active");
    } else {
      section.classList.remove("your-active-class");
      menu.classList.remove("active");
    }
  }
}

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build navbar when DOM is loaded
document.addEventListener("DOMContentLoaded", buildNav(section_titles));

// Scroll to section on link click
for (let i = 0; i < number_of_sections; i++) {
  anchors[i].addEventListener("click", () => {
    sections[i].scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

// Set sections as active
window.onscroll = activateArea;

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
const number_of_sections = 4;
const sections = [];
const nav_bar = document.getElementById("navbar__list");
const anchors = [];

/**
 * End Global Variables
 *
 * Begin Main Functions
 */

// build the nav
function buildNav(headings) {
  for (let item of headings) {
    const section_id = item.parentElement.parentElement.id;
    const list_item = document.createElement("li");
    const list_anchor = document.createElement("a");

    list_anchor.textContent = item.textContent;
    list_anchor.classList.add("menu__link");
    //list_anchor.href = "#" + section_id;
    list_anchor.id = "a" + section_id;

    anchors.push(list_anchor);

    list_item.appendChild(list_anchor);
    nav_bar.appendChild(list_item);
  }
}

// Creating list of all sections
for (let i = 1; i <= number_of_sections; i++) {
  const section = document.getElementById("section" + i);
  sections.push(section);
}

// Detecting scrolling
function activateArea() {
  for (let section of sections) {
    const rect = section.getBoundingClientRect();
    const menu = document.getElementById("a" + section.id);
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

// Build menu
const section_titles = document.getElementsByTagName("h2");
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

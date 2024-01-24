// General: Function to handle navigation between different sections of the SPA.
function navigateTo(page) {
  console.log("Navigating to:", page); // Debugging line to help us see which page we're navigating to.

  // General: This loop hides all the sections before showing the one we're navigating to.
  document.querySelectorAll(".page-section").forEach((section) => {
    section.style.display = "none"; // Sets the display style to 'none' to hide the section.
  });

  // General: This tries to find the section with the ID we passed to the function.
  var targetSection = document.getElementById(page);
  if (targetSection) {
    targetSection.style.display = "block"; // If the section is found, display it.
  } else {
    // General: If no section is found with the given ID, log an error to the console.
    console.error(`No section found with id '${page}'.`);
  }
}

// General: This event listener runs after the HTML document has been fully loaded.
document.addEventListener("DOMContentLoaded", function () {
  // General: Attaches click event listeners to all navigation links.
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault(); // Prevents the default action of the anchor tag.
      // General: Extracts the page ID from the 'onclick' attribute of the clicked link.
      const pageId = this.getAttribute("onclick").match(/'([^']+)'/)[1];
      console.log("Link clicked, navigating to:", pageId); // Debugging line to track the clicked link.
      navigateTo(pageId); // Calls the navigateTo function to handle the navigation.
    });
  });

  // Home Page: When the site loads, automatically navigate to the 'home' section.
  navigateTo("home");
});

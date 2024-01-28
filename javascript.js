// GENERAL NAVIGATION FUNCTIONALITY

// Function to switch between sections of the single-page application (SPA).
function navigateTo(page) {
  console.log("Navigating to:", page); // Debugging: Print the page being navigated to.

  // Hide all sections before displaying the requested section.
  document.querySelectorAll(".page-section").forEach((section) => {
    section.style.display = "none"; // Hide the section.
  });

  // Locate and show the section with the specified ID.
  var targetSection = document.getElementById(page);
  if (targetSection) {
    targetSection.style.display = "block"; // Show the section if found.
  } else {
    console.error(`No section found with id '${page}'.`); // Error handling if section not found.
  }
}

// Attach event listeners once the DOM content has fully loaded.
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent default action of the link.
      const pageId = this.getAttribute("onclick").match(/'([^']+)'/)[1];
      console.log("Link clicked, navigating to:", pageId);
      navigateTo(pageId); // Switch pages using navigateTo function.
    });
  });

  navigateTo("home"); // Default navigation to home page on site load.
});

// BUILD RESUME PAGE FUNCTIONALITY

let experienceCount = 0; // Counter for experience entries.
let educationCount = 0; // Counter for education entries.

document
  .getElementById("add-experience")
  .addEventListener("click", function () {
    experienceCount++; // Increment experience counter.
    const container = document.getElementById("work-experience-section");
    const newField = document.createElement("div");
    newField.classList.add("experience-block");

    newField.innerHTML = `
        <input type="text" name="company_${experienceCount}" placeholder="Company Name" required>
        <input type="text" name="role_${experienceCount}" placeholder="Role" required>
        <textarea name="description_${experienceCount}" placeholder="Description" required></textarea>
        <button type="button" onclick="removeExperience(this)">Remove</button>
    `;
    container.appendChild(newField);
  });

function removeExperience(element) {
  element.parentElement.remove(); // Remove experience field.
}

document.getElementById("add-education").addEventListener("click", function () {
  educationCount++; // Increment education counter.
  const container = document.getElementById("education-section");
  const newField = document.createElement("div");
  newField.classList.add("education-block");

  newField.innerHTML = `
        <input type="text" name="school_${educationCount}" placeholder="School/College Name" required>
        <input type="text" name="degree_${educationCount}" placeholder="Degree/Course" required>
        <input type="text" name="year_${educationCount}" placeholder="Year of Graduation" required>
        <button type="button" onclick="removeEducation(this)">Remove</button>
    `;
  container.appendChild(newField);
});

function removeEducation(element) {
  element.parentElement.remove(); // Remove education field.
}

// PHOTO UPLOAD FUNCTIONALITY

document.getElementById("upload-photo").addEventListener("click", function () {
  var fileInput = document.getElementById("cv-photo");
  var file = fileInput.files[0];
  var storageRef = firebase.storage().ref("cv_photos/" + file.name);
  var uploadTask = storageRef.put(file);

  uploadTask.on(
    "state_changed",
    function (snapshot) {
      // Handle upload progress.
    },
    function (error) {
      // Handle unsuccessful uploads.
    },
    function () {
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        console.log("File available at", downloadURL);
        // Display uploaded photo (optional).
      });
    }
  );
});

// FORM SUBMISSION AND VALIDATION FOR RESUME BUILDER

document
  .getElementById("resume-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission.

    var formData = {
      fullName: document.getElementById("full-name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      // Collect additional form data as needed.
    };

    if (!validateFormData(formData)) {
      console.error("Validation failed."); // Log validation failure.
      return; // Stop form submission on validation failure.
    }

    console.log("Form data is valid. Ready for Firebase:", formData);
    // Prepare data for Firebase storage (implementation pending).
  });

function validateFormData(data) {
  // Perform validation checks (e.g., empty fields, email format).
  // Return true if all checks pass, false otherwise.
  // Currently, it assumes data is valid.
  return true;
}

function displayValidationErrors(errors) {
  // Update UI with validation errors.
  // Implementation details depend on specific UI design.
}

// TEMPLATES DISPLAY FUNCTIONALITY

// Function to update the webpage with the Modern Template HTML content
function displayModernTemplate() {
  // Identifying the display container for the resume
  var resumeDisplay = document.getElementById("resume-display");
  // Setting the inner HTML of the container to our Modern Template markup
  resumeDisplay.innerHTML = "<div>Your Modern Template HTML here</div>";
}

// Function to update the webpage with the Minimalistic Template HTML content
function displayMinimalisticTemplate() {
  // Identifying the same resume display container by ID
  var resumeDisplay = document.getElementById("resume-display");
  // Setting the inner HTML of the container to our Minimalistic Template markup
  resumeDisplay.innerHTML = "<div>Your Minimalistic Template HTML here</div>";
}

// TEMPLATE SELECTION FUNCTIONALITY

// Function to choose which template to display based on user selection
function selectTemplate(templateName) {
  // Hiding all template sections before showing the selected one
  document.querySelectorAll(".resume-template").forEach((template) => {
    template.style.display = "none";
  });

  // Displaying the selected template by modifying its CSS 'display' property to 'block'
  document.getElementById(templateName + "-template-preview").style.display = "block";
}

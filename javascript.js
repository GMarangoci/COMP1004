// GENERAL NAVIGATION FUNCTIONALITY

// Function for changing pages without reloading the website.
function navigateTo(page) {
  console.log("Navigating to:", page); // Logs which page we're going to, helpful for debugging.

  // Hides all sections of the website before showing the new one.
  document.querySelectorAll(".page-section").forEach((section) => {
    section.style.display = "none"; // This line makes the current section disappear.
  });

  // Shows the section that the user wants to see.
  var targetSection = document.getElementById(page);
  if (targetSection) {
    targetSection.style.display = "block"; // If we find the section, make it visible.
  } else {
    console.error(`No section found with id '${page}'.`); // If we can't find the section, log an error.
  }
}

// When the website is fully loaded, this sets up the navigation.
document.addEventListener("DOMContentLoaded", function () {
  // For each navigation link, we add an event listener.
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault(); // Stops the link from acting like a normal link.
      const pageId = this.getAttribute("onclick").match(/'([^']+)'/)[1]; // Extracts the page ID from the link.
      navigateTo(pageId); // Calls the navigateTo function to change the section.
    });
  });

  // When the website first loads, this takes us to the 'home' section.
  navigateTo("home");
});

// BUILD RESUME PAGE FUNCTIONALITY

// Keeps track of how many work experiences and education details the user has added.
let experienceCount = 0; // Counter for experience entries.
let educationCount = 0; // Counter for education entries.

// Event listener for the 'Add Experience' button
document
  .getElementById("add-experience")
  .addEventListener("click", function () {
    experienceCount++; // Increment the counter for a unique ID for each experience block
    const container = document.getElementById("work-experience-section"); // Container for the experience blocks
    const newField = document.createElement("div"); // Create a new div element for the experience block
    newField.classList.add("experience-block"); // Add class for styling the experience block

    // Set the inner HTML of the new experience block with input fields for company, role, and dates
    newField.innerHTML = `
        <input type="text" id="company_${experienceCount}" name="company_${experienceCount}" placeholder="Company Name" required onchange="updateCVPreview(getCurrentTemplateName())">
        <input type="text" id="role_${experienceCount}" name="role_${experienceCount}" placeholder="Role" required onchange="updateCVPreview(getCurrentTemplateName())">
        <label for="start_date_${experienceCount}">Start Date:</label>
        <input type="month" id="start_date_${experienceCount}" name="start_date_${experienceCount}" onchange="updateCVPreview(getCurrentTemplateName())">
        <label for="end_date_${experienceCount}" class="end-date-label">End Date:</label>
        <input type="month" id="end_date_${experienceCount}" name="end_date_${experienceCount}" onchange="updateCVPreview(getCurrentTemplateName())">
        <label class="present-label"><input type="checkbox" id="present_${experienceCount}" name="present_${experienceCount}" onchange="handlePresentCheckbox(${experienceCount});"> I currently work here</label>
        <textarea id="description_${experienceCount}" name="description_${experienceCount}" placeholder="Description" required onchange="updateCVPreview(getCurrentTemplateName())"></textarea>
        <button type="button" onclick="removeExperience(this)">Remove</button>
    `;
    container.appendChild(newField); // Append the new experience block to the container
  });

// Function to handle the state of the 'Present' checkbox for an experience entry
function handlePresentCheckbox(count) {
  const checkbox = document.getElementById(`present_${count}`); // Get the checkbox element
  const endDateInput = document.getElementById(`end_date_${count}`); // Get the end date input element
  // Check if the 'Present' checkbox is checked and disable/enable the end date input accordingly
  if (checkbox.checked) {
    endDateInput.disabled = true; // Disable end date input if 'Present' is checked
    endDateInput.value = ""; // Clear end date
  } else {
    endDateInput.disabled = false; // Enable end date input if 'Present' is unchecked
  }
  updateCVPreview(getCurrentTemplateName()); // Update the CV preview with the new state
}

// Function to remove an experience block
function removeExperience(element) {
  element.parentElement.remove(); // Remove experience field.
}

// BUILD RESUME PAGE FUNCTIONALITY

// Adding functionality for the 'Add Education' button.
document.getElementById("add-education").addEventListener("click", function () {
  educationCount++; // Increment the counter each time a new education entry is added.
  const container = document.getElementById("education-section"); // Find the container where education entries should go.
  const newField = document.createElement("div"); // Create a new div for each education entry.
  newField.classList.add("education-block"); // Assign a class for styling purposes.

  // Set the HTML structure for the new education block, including fields for school, degree, and graduation year.
  newField.innerHTML = `
        <input type="text" id="school_${educationCount}" name="school_${educationCount}" placeholder="School/College Name" required onchange="updateCVPreview(getCurrentTemplateName())">
        <input type="text" id="degree_${educationCount}" name="degree_${educationCount}" placeholder="Degree/Course" required onchange="updateCVPreview(getCurrentTemplateName())">
        <input type="text" id="year_${educationCount}" name="year_${educationCount}" placeholder="Year of Graduation" required onchange="updateCVPreview(getCurrentTemplateName())">
        <button type="button" onclick="removeEducation(this)">Remove</button>
    `;
  container.appendChild(newField); // Append this new education block to the container.
});

// Function to remove an education block from the form.
function removeEducation(element) {
  element.parentElement.remove(); // Remove the entire education block when the remove button is clicked.
}

// FORM SUBMISSION AND VALIDATION FOR RESUME BUILDER

// Attaches event listener to the resume form to handle submission.
document
  .getElementById("resume-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevents default form submission behavior (page reload).

    // Collects form data into an object.
    var formData = {
      fullName: document.getElementById("full-name").value, // Retrieves full name from form.
      email: document.getElementById("email").value, // Retrieves email from form.
      phone: document.getElementById("phone").value, // Retrieves phone number from form.
      // Additional data fields can be included here.
    };

    // Validates form data before processing.
    if (!validateFormData(formData)) {
      console.error("Validation failed."); // Logs error if validation fails.
      return; // Stops form submission process if validation fails.
    }

    console.log("Form data is valid:", formData); // Logs valid form data for confirmation.
    // Place code for further data processing (e.g., Firebase submission) here.
  });

// Validates the form data.
function validateFormData(data) {
  // Performs validation checks (required fields, email format, etc.).
  // Returns true if all checks pass, or false otherwise.
  // Current implementation assumes all data is valid.
  return true;
}

// Displays validation errors on the user interface.
function displayValidationErrors(errors) {
  // Updates the UI to show validation error messages.
  // Specific implementation depends on the UI design.
}

// TEMPLATES DISPLAY FUNCTIONALITY

// Updates webpage with content for the Modern Template
function displayModernTemplate() {
  var resumeDisplay = document.getElementById("resume-display");
  // Sets the inner HTML of the resume display container to the Modern Template HTML
  resumeDisplay.innerHTML = "<div>Your Modern Template HTML here</div>";
}

// Updates webpage with content for the Minimalistic Template
function displayMinimalisticTemplate() {
  var resumeDisplay = document.getElementById("resume-display");
  // Sets the inner HTML of the resume display container to the Minimalistic Template HTML
  resumeDisplay.innerHTML = "<div>Your Minimalistic Template HTML here</div>";
}

// TEMPLATE SELECTION FUNCTIONALITY

// Chooses which template to display based on user's selection
function selectTemplate(templateName) {
  // Hides all resume templates before displaying the selected one
  document.querySelectorAll(".resume-template").forEach((template) => {
    template.style.display = "none";
  });

  // Finds and displays the selected template
  const selectedTemplate = document.getElementById(
    templateName + "-template-preview"
  );
  if (selectedTemplate) {
    selectedTemplate.style.display = "block";
    document.querySelector(".submit-button-container").style.display = "block";
    updateCVPreview(templateName); // Updates preview with selected template
  } else {
    document.querySelector(".submit-button-container").style.display = "none";
  }
}

// Removes an experience entry from the form
function removeExperience(element) {
  element.parentElement.remove(); // Deletes the experience block
  experienceCount--; // Decreases the count of experience entries
  updateCVPreview(getCurrentTemplateName()); // Refreshes the template preview
}

// Removes an education entry from the form
function removeEducation(element) {
  element.parentElement.remove(); // Deletes the education block
  educationCount--; // Decreases the count of education entries
  updateCVPreview(getCurrentTemplateName()); // Refreshes the template preview
}

// Updates the contents of the chosen resume template based on form data
function updateCVPreview(templateName) {
  // Fetches values from form or uses default values if fields are empty
  let fullName = document.getElementById("full-name").value || "Karla Santos";
  let email =
    document.getElementById("email").value || "karlasantos@example.com";
  let phone = document.getElementById("phone").value || "0769828333";
  let linkedin =
    document.getElementById("linkedin").value ||
    "https://www.linkedin.com/in/karla-santos";
  let jobTitle =
    document.getElementById("job-title").value ||
    (templateName === "modern"
      ? "Senior Front End Developer"
      : "Director of Product Management");
  let personalSummary =
    document.getElementById("personal-summary").value ||
    "Passionate front-end developer leveraging modern frameworks for exceptional client experiences.";

  // Dynamically generates HTML for experiences and education
  // (similar code for generating experiences and educations HTML should be here)

  // Dynamically generate experiences and education HTML

  // Initialize an empty string for accumulating experiences HTML content.
  let experiencesHtml = "";

  // Loop over each experience entry to create corresponding HTML
  for (let i = 1; i <= experienceCount; i++) {
    // Check if the experience block exists in the document
    if (document.getElementById(`company_${i}`)) {
      // Retrieve values from input fields or use default placeholders
      let company =
        document.getElementById(`company_${i}`).value || "Example Company";
      let role = document.getElementById(`role_${i}`).value || "Example Role";
      let startDate =
        document.getElementById(`start_date_${i}`).value || "Start Date";
      let endDate =
        document.getElementById(`end_date_${i}`).value || "End Date";
      // Determine if 'Present' is selected or use the end date
      let present = document.getElementById(`present_${i}`).checked
        ? "Present"
        : endDate;
      let description =
        document.getElementById(`description_${i}`).value ||
        "Example Description";

      // Build and add the experience entry HTML to the experiencesHtml string
      experiencesHtml += `<li>${company} - ${role} (${startDate} to ${present}): ${description}</li>`;
    }
  }

  // Initialize an empty string for accumulating education HTML content.
  let educationsHtml = "";

  // Loop over each education entry to create corresponding HTML
  for (let i = 1; i <= educationCount; i++) {
    // Check if the current education entry exists in the document
    if (document.getElementById(`school_${i}`)) {
      // Retrieve values from input fields or use default placeholders
      let school =
        document.getElementById(`school_${i}`).value || "Example School";
      let degree =
        document.getElementById(`degree_${i}`).value || "Example Degree";
      let year = document.getElementById(`year_${i}`).value || "Example Year";

      // Build and add the education entry HTML to the educationsHtml string
      educationsHtml += `<li>${school}, ${degree} - Graduated: ${year}</li>`;
    }
  }

  // Updates the fields in the modern template based on user input
  if (templateName === "modern") {
    // Setting the full name in the modern template's header
    document.querySelector(
      "#modern-template-preview .modern-header h1"
    ).textContent = fullName;

    // Setting the job title in the modern template's header
    document.querySelector(
      "#modern-template-preview .modern-header h2"
    ).textContent = jobTitle;

    // Updating contact information: Email
    document.querySelector(
      "#modern-template-preview .modern-contact-info li:nth-child(1)"
    ).textContent = `Email: ${email}`;

    // Updating contact information: Phone
    document.querySelector(
      "#modern-template-preview .modern-contact-info li:nth-child(2)"
    ).textContent = `Phone: ${phone}`;

    // Updating contact information: LinkedIn
    document.querySelector(
      "#modern-template-preview .modern-contact-info li:nth-child(3) a"
    ).textContent = linkedin;

    // Setting the personal summary in the modern template
    document.querySelector(
      "#modern-template-preview .modern-career-objective p"
    ).textContent = personalSummary;

    // Injecting the dynamically generated experiences and education into the modern template
    document.getElementById("modern-experience-list").innerHTML =
      experiencesHtml;
    document.getElementById("modern-education-list").innerHTML = educationsHtml;
  }

  // Updates the fields in the minimalistic template based on user input
  else if (templateName === "minimalistic") {
    // Setting the full name in the minimalistic template's header
    document.querySelector(
      "#minimalistic-template-preview .minimalistic-header h1"
    ).textContent = fullName;

    // Setting the job title in the minimalistic template's header
    document.querySelector(
      "#minimalistic-template-preview .minimalistic-header h2"
    ).textContent = jobTitle;

    // Updating contact information: Email
    document.querySelector(
      "#minimalistic-template-preview .minimalistic-contact-info li:nth-child(1)"
    ).textContent = `Email: ${email}`;

    // Updating contact information: Phone
    document.querySelector(
      "#minimalistic-template-preview .minimalistic-contact-info li:nth-child(2)"
    ).textContent = `Phone: ${phone}`;

    // Updating contact information: LinkedIn
    document.querySelector(
      "#minimalistic-template-preview .minimalistic-contact-info li:nth-child(3) a"
    ).textContent = linkedin;

    // Setting the personal summary in the minimalistic template
    document.getElementById("minimalistic-personal-summary").textContent =
      personalSummary;

    // Injecting the dynamically generated experiences and education into the minimalistic template
    document.getElementById("minimalistic-experience-list").innerHTML =
      experiencesHtml;
    document.getElementById("minimalistic-education-list").innerHTML =
      educationsHtml;
  }
}

// Function to get the current template name based on which template is displayed
function getCurrentTemplateName() {
  if (
    document.getElementById("modern-template-preview").style.display === "block"
  ) {
    return "modern";
  } else if (
    document.getElementById("minimalistic-template-preview").style.display ===
    "block"
  ) {
    return "minimalistic";
  }
  return ""; // Default case if no template is selected
}

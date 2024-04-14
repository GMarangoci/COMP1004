// GENERAL NAVIGATION FUNCTIONALITY

function navigateTo(page) {
  console.log("Navigating to:", page); // Logs which page we're going to, for debugging.

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

  // Adjust the visibility of the Load CV button based on the page
  var loadCVButton = document.querySelector(".load-cv-btn");
  if (page === "buildResume" && loadCVButton) {
    loadCVButton.style.display = "inline-block"; // Show the Load CV button on the Build Resume page
  } else if (loadCVButton) {
    loadCVButton.style.display = "none"; // Hide the Load CV button on other pages
  }

  // Similar logic for the Reset Fields button
  var resetFieldsButton = document.getElementById("reset-cv-btn");
  if (page === "buildResume" && resetFieldsButton) {
    resetFieldsButton.style.display = "inline-block"; // Show the Reset Fields button on the Build Resume page
  } else if (resetFieldsButton) {
    resetFieldsButton.style.display = "none"; // Hide the Reset Fields button on other pages
  }
}

// When the website is fully loaded, this sets up the navigation and initially hides the Load CV button unless on the Build Resume page.
document.addEventListener("DOMContentLoaded", function () {
  // Hide the Load CV button initially
  var loadCVButton = document.querySelector(".load-cv-btn");
  if (loadCVButton) {
    loadCVButton.style.display = "none";
  }

  // For each navigation link, we add an event listener.
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault(); // Stops the link from acting like a normal link.
      const pageId = this.getAttribute("onclick").match(/'([^']+)'/)[1]; // Extracts the page ID from the link.
      navigateTo(pageId); // Calls the navigateTo function to change the section.
    });
  });

  // Navigate to the 'home' section by default
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
        <input type="text" class="date" id="start_date_${experienceCount}" name="start_date_${experienceCount}">
        <label for="end_date_${experienceCount}" class="end-date-label">End Date:</label>
        <input type="text" class="date" id="end_date_${experienceCount}" name="end_date_${experienceCount}">
        <label class="present-label"><input type="checkbox" id="present_${experienceCount}" name="present_${experienceCount}" onchange="handlePresentCheckbox(${experienceCount});"> I currently work here</label>
        <textarea id="description_${experienceCount}" name="description_${experienceCount}" placeholder="Description" required onchange="updateCVPreview(getCurrentTemplateName())"></textarea>
        <button type="button" onclick="removeExperience(this)">Remove</button>
    `;
    container.appendChild(newField); // Append the new experience block to the container
    // Initialize Flatpickr for the newly added fields
    initializeFlatpickrForNewFields();
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
    selectedTemplate.style.display = "block"; // Display the selected template
    document.querySelector(".submit-button-container").style.display = "block"; // Ensure submit button is visible
    updateCVPreview(templateName); // Updates preview with selected template
  } else {
    document.querySelector(".submit-button-container").style.display = "none"; // Hide submit button if no template is selected
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
    document.getElementById("linkedin").value || "https://www.linkedin.com/in/";
  let jobTitle =
    document.getElementById("job-title").value ||
    (templateName === "modern"
      ? "Senior Front End Developer"
      : "Director of Product Management");
  let personalSummary =
    document.getElementById("personal-summary").value ||
    "Passionate front-end developer leveraging modern frameworks for exceptional client experiences.";

  let linkedinElementModern = document.querySelector(
    "#modern-template-preview .modern-contact-info li:nth-child(3) a"
  );
  let linkedinElementMinimalistic = document.querySelector(
    "#minimalistic-template-preview .minimalistic-contact-info li:nth-child(3) a"
  );

  if (linkedin.trim() === "" || linkedin === "https://www.linkedin.com/in/") {
    // If LinkedIn input is empty, hide the LinkedIn information in both templates
    if (linkedinElementModern) {
      linkedinElementModern.parentElement.style.display = "none";
    }
    if (linkedinElementMinimalistic) {
      linkedinElementMinimalistic.parentElement.style.display = "none";
    }
  } else {
    // If LinkedIn input is not empty, show and update the LinkedIn information
    if (linkedinElementModern) {
      linkedinElementModern.parentElement.style.display = "list-item";
      linkedinElementModern.href = linkedin;
      linkedinElementModern.textContent = linkedin.replace(
        "https://www.linkedin.com/in/",
        ""
      );
    }
    if (linkedinElementMinimalistic) {
      linkedinElementMinimalistic.parentElement.style.display = "list-item";
      linkedinElementMinimalistic.href = linkedin;
      linkedinElementMinimalistic.textContent = linkedin.replace(
        "https://www.linkedin.com/in/",
        ""
      );
    }
  }

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
      experiencesHtml += `<li>${company} - ${role} (${formatDate(
        startDate
      )} to ${present}): ${description}</li>`;
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
  // Continue from the previous else if condition for "minimalistic"
  else if (templateName === "professional") {
    // Setting the full name in the professional template's header
    document.querySelector(
      "#professional-template-preview .professional-header h1"
    ).textContent = fullName;

    // Setting the job title in the professional template's header
    document.querySelector(
      "#professional-template-preview .professional-header h2"
    ).textContent = jobTitle;

    // Updating contact information: Email
    document.querySelector(
      "#professional-template-preview .professional-contact-info li:nth-child(1)"
    ).textContent = `Email: ${email}`;

    // Updating contact information: Phone
    document.querySelector(
      "#professional-template-preview .professional-contact-info li:nth-child(2)"
    ).textContent = `Phone: ${phone}`;

    // If the user have a LinkedIn section in professional template
    // Updating contact information: LinkedIn
    let linkedinElementProfessional = document.querySelector(
      "#professional-template-preview .professional-contact-info li:nth-child(3) a"
    );
    if (linkedin && linkedin !== "https://www.linkedin.com/in/") {
      linkedinElementProfessional.href = linkedin;
      linkedinElementProfessional.textContent = linkedin.replace(
        "https://www.linkedin.com/in/",
        ""
      );
      linkedinElementProfessional.parentElement.style.display = "list-item";
    } else {
      // If LinkedIn information is not provided, hide this section
      if (linkedinElementProfessional) {
        linkedinElementProfessional.parentElement.style.display = "none";
      }
    }

    // Setting the personal summary in the professional template
    document.querySelector(
      "#professional-template-preview .professional-summary p"
    ).textContent = personalSummary;

    // Injecting the dynamically generated experiences and education into the professional template
    document.getElementById("professional-experience-list").innerHTML =
      experiencesHtml;
    document.getElementById("professional-education-list").innerHTML =
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
  } else if (
    document.getElementById("professional-template-preview").style.display ===
    "block"
  ) {
    return "professional"; // Added condition for the Professional template
  }
  return ""; // Default case if no template is selected
}

// DOWNLOAD RESUME AS PDF FUNCTIONALITY
function downloadPDF() {
  // Get the element that shows the resume preview based on the current template name.
  const element = document.getElementById(
    getCurrentTemplateName() + "-template-preview"
  );

  // Use html2canvas to take a screenshot of the resume preview element.
  html2canvas(element, { scale: 2 }).then((canvas) => {
    // Convert the canvas to an image data URL in PNG format.
    const imgData = canvas.toDataURL("image/png");

    // Initialize a new PDF document with the same dimensions as the canvas.
    const pdf = new jspdf.jsPDF({
      orientation: "portrait", // Set the PDF orientation to portrait.
      unit: "pt", // Measurement unit for the PDF, points in this case.
      format: [canvas.width, canvas.height], // Set the PDF size to match the canvas size.
    });

    // Add the screenshot image to the PDF.
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    // Save the PDF with the filename 'resume.pdf'.
    pdf.save("resume.pdf");
  });
}

/// FORM SUBMISSION AND PDF DOWNLOAD

// Code to handle form submission without refreshing the page and download a PDF.
// Add an event listener for the 'submit' event on the form with id 'resume-form'.
document
  .getElementById("resume-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevents the form from submitting in the default manner, which refreshes the page.

    // Collect data from form fields into an object.
    var formData = {
      fullName: document.getElementById("full-name").value,
      jobTitle: document.getElementById("job-title").value,
      email: document.getElementById("email").value,
    };

    // Check if the form data passes validation checks.
    if (!validateFormData(formData)) {
      console.error("Validation failed."); // Log validation failure.
      // Show an error message for validation failure.
      displayValidationErrors(
        "Please fill out all required fields for full name, job title, and email."
      );
      return; // Stop function execution if validation fails.
    }

    // Check if a template has been selected.
    const templateName = getCurrentTemplateName();
    if (!templateName) {
      alert("Please select a template before downloading as PDF.");
      return; // Stop function execution if no template is selected.
    }

    console.log("Form data is valid:", formData); // Log valid form data.

    // If validation passes and a template is selected, proceed to download PDF.
    downloadPDF(); // Function call to initiate PDF download.
  });

// VALIDATION FUNCTION FOR FORM DATA: For checking the form data is correctly filled.
function validateFormData(formData) {
  // Check if essential fields (full name, job title, and email) are not empty.
  if (
    !formData.fullName.trim() ||
    !formData.jobTitle.trim() ||
    !formData.email.trim()
  ) {
    return false; // Return false if any required field is empty.
  }
  return true; // Return true if all required fields are filled.
}

// Function to show validation error messages.
function displayValidationErrors(message) {
  const errorDisplayElement = document.getElementById("error-message-element");
  if (!errorDisplayElement) {
    // If the error display element does not exist, create it.
    const errorContainer = document.createElement("div");
    errorContainer.id = "error-message-element";
    document.body.insertBefore(errorContainer, document.body.firstChild); // Insert at the beginning of the body.
  }
  document.getElementById("error-message-element").innerText = message; // Set the error message text.
  document.getElementById("error-message-element").style.display = "block"; // Make the error message visible.
}

// FUNCTION TO PRINT RESUME
document.getElementById("print-resume").addEventListener("click", function () {
  var fullName = document.getElementById("full-name").value;

  // Check if the full name is entered.
  if (!fullName.trim()) {
    alert("Please enter your full name to print the resume.");
    return; // Stop function execution if full name is not entered.
  }

  const templateName = getCurrentTemplateName();
  if (templateName) {
    const printContent = document.getElementById(
      templateName + "-template-preview"
    );
    const WinPrint = window.open(
      "",
      "",
      "left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0"
    );
    WinPrint.document.write(printContent.innerHTML);
    WinPrint.document.close();
    WinPrint.focus();
    setTimeout(() => {
      WinPrint.print();
      WinPrint.close();
    }, 500);
  } else {
    alert("Please select a template to print.");
  }
});

// FLATPICKR INITIALIZATION FOR DYNAMICALLY ADDED DATE FIELDS
function initializeFlatpickrForNewFields() {
  // Select all date input fields that have not already been initialized by Flatpickr.
  const dateInputs = document.querySelectorAll(".date:not(.flatpickr-input)");

  // Iterate through each uninitiated date input field to apply Flatpickr.
  dateInputs.forEach((input) => {
    // Initialize Flatpickr on the input field with specific configurations.
    flatpickr(input, {
      // Set the date format to Year-Month-Day for consistency.
      dateFormat: "Y-m-d",
      // Define an onChange event function that triggers when a date is selected.
      onChange: function (selectedDates, dateStr, instance) {
        // Call the function to update the resume preview with the selected date.
        updateCVPreview(getCurrentTemplateName());
        // Update the input field's value with the selected date string.
        input.value = dateStr;
      },
    });
  });
}

// DATE FORMATTING FUNCTIONALITY
function formatDate(dateStr) {
  // Convert the string date input into a Date object.
  const date = new Date(dateStr);

  // Extract the year from the Date object.
  const year = date.getFullYear();

  // Extract the month from the Date object and add 1 to it (months are zero-indexed).
  const month = date.getMonth() + 1;

  // Extract the day from the Date object.
  const day = date.getDate();

  // Construct the date string in 'YYYY-MM-DD' format and return it.
  return `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;
}

// FUNCTION TO GATHER FORM DATA: Creates an object containing all the user inputs from the resume form.
function getFormData() {
  // INITIALIZES AN OBJECT to store the user's inputs, starting with basic personal information.
  const formData = {
    fullName: document.getElementById("full-name").value,
    jobTitle: document.getElementById("job-title").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    linkedin: document.getElementById("linkedin").value,
    personalSummary: document.getElementById("personal-summary").value,
    experiences: [], // Prepares an array to store multiple experiences.
    educations: [], // Prepares an array to store multiple education records.
  };

  // ITERATES OVER ALL EXPERIENCE BLOCKS to collect data from each.
  document.querySelectorAll(".experience-block").forEach((block, index) => {
    // Extracts and compiles experience information into an object, using fallbacks if fields are empty.
    const experience = {
      company: document.getElementById(`company_${index + 1}`)?.value || "",
      role: document.getElementById(`role_${index + 1}`)?.value || "",
      startDate:
        document.getElementById(`start_date_${index + 1}`)?.value || "",
      endDate: document.getElementById(`end_date_${index + 1}`)?.value || "",
      present:
        document.getElementById(`present_${index + 1}`)?.checked || false,
      description:
        document.getElementById(`description_${index + 1}`)?.value || "",
    };
    // Logs each experience for debugging.
    console.log(`Experience ${index}: `, experience);
    // Adds the compiled experience object to the experiences array in formData.
    formData.experiences.push(experience);
  });

  // ITERATES OVER ALL EDUCATION BLOCKS to collect data from each.
  document.querySelectorAll(".education-block").forEach((block, index) => {
    // Extracts and compiles education information into an object, using fallbacks if fields are empty.
    const education = {
      school: document.getElementById(`school_${index + 1}`)?.value || "",
      degree: document.getElementById(`degree_${index + 1}`)?.value || "",
      year: document.getElementById(`year_${index + 1}`)?.value || "",
    };
    // Logs each education entry for debugging.
    console.log(`Education ${index}: `, education);
    // Adds the compiled education object to the educations array in formData.
    formData.educations.push(education);
  });

  // Logs the complete formData object for review before returning it.
  console.log("Final form data: ", formData);
  // Returns the fully compiled formData object containing all user inputs.
  return formData;
}

// Function to add event listeners to experience and education fields for real-time updates
function addFieldEventListeners() {
  document.querySelectorAll("input, textarea").forEach((input) => {
    input.addEventListener("change", () => {
      updateCVPreview(getCurrentTemplateName());
    });
  });
}

// Function: Add Experience Field
// This function dynamically adds a new experience entry field into the resume form, enhancing user interaction by allowing real-time data entry and updates.

function addExperienceField(exp) {
  // Locate the container where experience fields are displayed.
  const container = document.getElementById("work-experience-section");

  // Increment a global counter to ensure each experience field has a unique identifier.
  experienceCount++;

  // Create a new div element to hold the input fields for a single experience entry.
  const newField = document.createElement("div");
  newField.classList.add("experience-block"); // Assign a class for styling purposes.

  // Set the innerHTML of the new div to include various input fields pre-filled with data (if any exists).
  newField.innerHTML = `
    <input type="text" id="company_${experienceCount}" name="company_${experienceCount}" placeholder="Company Name" value="${
    exp.company || ""
  }" required>
    <input type="text" id="role_${experienceCount}" name="role_${experienceCount}" placeholder="Role" value="${
    exp.role || ""
  }" required>
    <input type="text" class="date" id="start_date_${experienceCount}" name="start_date_${experienceCount}" value="${
    exp.startDate || ""
  }">
    <input type="text" class="date" id="end_date_${experienceCount}" name="end_date_${experienceCount}" value="${
    exp.endDate || ""
  }">
    <input type="checkbox" id="present_${experienceCount}" name="present_${experienceCount}" ${
    exp.present ? "checked" : ""
  }>
    <textarea id="description_${experienceCount}" name="description_${experienceCount}" required>${
    exp.description || ""
  }</textarea>
    <button type="button" onclick="removeExperience(this)">Remove</button>
  `; // The template string dynamically incorporates the experience count into IDs and names, ensuring unique access and manipulation points.

  container.appendChild(newField); // Append the new experience entry field to the container.

  // After adding a new field, reinitialize event listeners for input fields to capture real-time updates.
  addFieldEventListeners();

  // Reinitialize Flatpickr (date picker) for the newly added date input fields, ensuring a consistent UI experience.
  initializeFlatpickrForNewFields();
}

// Function: Add Education Field
// Dynamically adds a new education entry field to the form, allowing users to input their academic background in real-time.

function addEducationField(edu) {
  // Identify the container for education entries within the form.
  const container = document.getElementById("education-section");

  // Increment a global counter to maintain unique IDs for each education entry.
  educationCount++;

  // Create a new div element to encapsulate the inputs for one education entry.
  const newField = document.createElement("div");
  newField.classList.add("education-block"); // Assign styling class for consistent UI.

  // Populate the new div with input fields, prefilled with existing data (if provided).
  newField.innerHTML = `
    <input type="text" id="school_${educationCount}" name="school_${educationCount}" placeholder="School/College Name" value="${
    edu.school || ""
  }" required>
    <input type="text" id="degree_${educationCount}" name="degree_${educationCount}" placeholder="Degree/Course" value="${
    edu.degree || ""
  }" required>
    <input type="text" id="year_${educationCount}" name="year_${educationCount}" placeholder="Year of Graduation" value="${
    edu.year || ""
  }" required>
    <button type="button" onclick="removeEducation(this)">Remove</button>
  `; // The template string dynamically incorporates the education count into element IDs and names to ensure they are unique.

  container.appendChild(newField); // Append the new education entry to the specified container.

  // After adding a new field, reinitialize event listeners for input fields to capture real-time updates.
  addFieldEventListeners();
}
// Password Strengh Indicator
// Listen for user input on the registration password field
document
  .getElementById("register-password")
  .addEventListener("input", function (e) {
    // Grab the element that will display the password's strength
    const passwordStrengthText = document.getElementById("password-strength");

    // Define a regex for a strong password: minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character
    const strongPasswordRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );

    // Initially, remove any existing classes on the password strength indicator
    passwordStrengthText.className = "";

    // Check if the input matches the strong password criteria
    if (strongPasswordRegex.test(e.target.value)) {
      // Update the text and apply a class to indicate a strong password
      passwordStrengthText.textContent = "Strong";
      passwordStrengthText.classList.add("password-strength-strong");
    }
    // If not strong, check if the password length is at least 6 characters for a moderate strength
    else if (e.target.value.length >= 6) {
      // Update the text and apply a class to indicate a moderate password
      passwordStrengthText.textContent = "Moderate";
      passwordStrengthText.classList.add("password-strength-moderate");
    }
    // If it doesn't meet any of the above criteria, consider it a weak password
    else {
      // Update the text and apply a class to indicate a weak password
      passwordStrengthText.textContent = "Weak";
      passwordStrengthText.classList.add("password-strength-weak");
    }
  });

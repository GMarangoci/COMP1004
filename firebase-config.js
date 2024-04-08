window.FirebaseInitialized = true;
document.dispatchEvent(new CustomEvent("FirebaseInitialized"));

// Firebase SDK inclusion and initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-storage.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import {
  setDoc,
  addDoc,
  getDoc,
  doc,
  query,
  collection,
  where,
  orderBy,
  getDocs,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCOLRzioTQibxjYYWvDEUC_T1m-ZsUEYWs",
  authDomain: "careercanvas---comp1004.firebaseapp.com",
  projectId: "careercanvas---comp1004",
  storageBucket: "careercanvas---comp1004.appspot.com",
  messagingSenderId: "919468929826",
  appId: "1:919468929826:web:412ee0fa37278c5d2cab7b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
  handleLoginFormSubmission(); // Attach the login form event listener
  setupFirebaseStorage(); // Set up Firebase storage
  fetchAndDisplayUserCVs(); // Fetch and display the user's saved CVs
  // Get the modal element
  var modal = document.getElementById("cvModal");

  // Get the button that opens the modal
  var loadCVBtn = document.querySelector(".load-cv-btn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];
  // When the user clicks the button, open the modal
  loadCVBtn.onclick = function () {
    modal.style.display = "block";
    fetchAndDisplayUserCVs(); // Function to fetch CVs and populate the modal
  };

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
});

// Event listener for the Load CV button to open the modal
document.querySelector(".load-cv-btn").addEventListener("click", async () => {
  // Display the modal
  const cvModal = document.getElementById("cvModal");
  cvModal.style.display = "block";

  // Call a function to fetch CVs and populate the modal
  await fetchAndDisplayUserCVs();
});

async function loadSelectedCV(cvId) {
  // Assuming `db` is your initialized Firestore database instance
  const cvRef = doc(db, "cvs", cvId);
  const cvSnap = await getDoc(cvRef);

  if (cvSnap.exists()) {
    const cvData = cvSnap.data();
    populateFieldsWithData(cvData); // Populate form fields and templates with the loaded data
  } else {
    console.log("No such CV!");
  }
}

async function fetchAndDisplayUserCVs() {
  // Assuming you're logged in
  const user = auth.currentUser;
  if (!user) {
    console.error("Not logged in");

    return;
  }

  const cvListElement = document.getElementById("cvList");
  cvListElement.innerHTML = ""; // Clear previous list items
  const cvsQuery = query(
    collection(db, "cvs"),
    where("uid", "==", user.uid),
    orderBy("timestamp", "desc")
  );

  const querySnapshot = await getDocs(cvsQuery);
  querySnapshot.forEach((doc) => {
    const listItem = document.createElement("li");
    listItem.textContent = `CV saved on ${new Date(
      doc.data().timestamp.seconds * 1000
    ).toLocaleString()}`;
    listItem.classList.add("cv-list-item"); // Add class for styling if desired
    listItem.setAttribute("data-cv-id", doc.id); // Store the CV id
    listItem.onclick = async () => {
      await loadSelectedCV(doc.id);
      // Close the modal if you want to close it after a CV is selected
      document.getElementById("cvModal").style.display = "none";
    };
    cvListElement.appendChild(listItem);
  });
}

function populateFieldsWithData(cvData) {
  // Populate static fields
  document.getElementById("full-name").value = cvData.fullName || "";
  document.getElementById("job-title").value = cvData.jobTitle || "";
  document.getElementById("email").value = cvData.email || "";
  document.getElementById("phone").value = cvData.phone || "";
  document.getElementById("linkedin").value = cvData.linkedin || "";
  document.getElementById("personal-summary").value =
    cvData.personalSummary || "";

  // Remove existing experience and education blocks
  document
    .querySelectorAll(".experience-block")
    .forEach((block) => block.remove());
  document
    .querySelectorAll(".education-block")
    .forEach((block) => block.remove());

  // Reset the counters
  experienceCount = 0;
  educationCount = 0;

  // Populate experience fields
  cvData.experiences.forEach((exp) => {
    experienceCount++;
    addExperienceField(exp);
  });

  // Populate education fields
  cvData.educations.forEach((edu) => {
    educationCount++;
    addEducationField(edu);
  });

  // Update the CV preview to reflect the newly populated data
  updateCVPreview(getCurrentTemplateName());
}

// Registration
document
  .getElementById("registration-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User registered: ", userCredential.user);

      // Perform sign out in the background
      await auth.signOut();

      // Inform the user of successful registration
      alert("Registration successful. Redirecting to login page.");

      // Implement a slight delay before redirection to allow sign out to complete
      setTimeout(() => navigateTo("logIn"), 500);
    } catch (error) {
      console.error("Registration error: ", error);
      alert("Failed to register: " + error.message);
    }
  });

// Listen for authentication state to change.
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, show the user's email and "Sign Out" button
    onLoginSuccess(user.email);

    // Clear form fields and reset images for the new user
    resetFormFieldsAndImages();
  } else {
    // User is signed out, show the "Log In" button
    document.getElementById("loginNavItem").style.display = "block";
    document.getElementById("userInfoNavItem").style.display = "none";

    // Clear form fields and reset images since no user is logged in
    resetFormFieldsAndImages();
  }
});

function resetFormFieldsAndImages() {
  // Make every input field blank. This includes text, email, telephone, URLs, and textareas.
  document
    .querySelectorAll(
      'input[type="text"], input[type="email"], input[type="tel"], input[type="url"], textarea'
    )
    .forEach((input) => {
      input.value = "";
    });

  // Set the source for the modern and minimalistic CV photos back to the default image.
  // This is necessary because the user might have uploaded a photo during their session.
  document.getElementById("cv-photo-modern").src = "path-to-default-photo.jpg";
  document.getElementById("cv-photo-minimalistic").src =
    "path-to-default-photo.jpg";

  // Clear out the sections for work experience and education.
  // This is because these sections can dynamically have content added to them,
  // and we need to ensure they're emptied when resetting the form.
  document.getElementById("work-experience-section").innerHTML = "";
  document.getElementById("education-section").innerHTML = "";

  // Since we switched to using a modal for CV selection instead of a dropdown,
  // we'll clear any CVs listed inside the modal. This ensures the modal is reset and ready for the next use.
  const cvListElement = document.getElementById("cvList");
  if (cvListElement) {
    cvListElement.innerHTML = ""; // Clears the list of CVs inside the modal.
  }
}

function onLoginSuccess(userEmail) {
  const loginNavItem = document.getElementById("loginNavItem");
  const userInfoNavItem = document.getElementById("userInfoNavItem");

  if (loginNavItem && userInfoNavItem) {
    loginNavItem.style.display = "none"; // Hide the Log In button
    document.getElementById("userEmail").textContent = userEmail; // Set user's email
    userInfoNavItem.style.display = "block"; // Show user info and Sign Out button
  } else {
    console.error("Element(s) not found: Check IDs");
  }
}

// Sign out function
function signOut() {
  auth
    .signOut()
    .then(() => {
      // On successful sign out
      alert("Signed out successfully");
      document.getElementById("loginNavItem").style.display = "block"; // Show the Log In button
      document.getElementById("userInfoNavItem").style.display = "none"; // Hide user info and Sign Out button
      navigateTo("home"); // Navigate to the home page or wherever you see fit
    })
    .catch((error) => {
      // Handle errors here
      console.error("Sign Out Error", error);
      alert("Failed to sign out. Please try again.");
    });
}

// Function to handle login form submission
function handleLoginFormSubmission() {
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the form from submitting in the default way

      // Get user input from form
      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;

      // Sign in the user with Firebase Authentication
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("User logged in:", userCredential.user);
          alert("Login successful! Redirecting to home page."); // Inform user of successful login
          onLoginSuccess(userCredential.user.email); // Handle login success UI changes
          navigateTo("home"); // Navigate to the home page. Ensure this function is defined and works as expected
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("Sign in error", errorCode, errorMessage);
          alert("Failed to log in: " + errorMessage); // Show the user an error message
        });
    });
  }
}

// Resize image before upload
function resizeImage(file, maxWidth, maxHeight, callback) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob((blob) => {
        callback(blob, canvas.toDataURL("image/png")); // Pass the data URLL
      });
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// SetupFirebaseStorage to include resize, feedback, and button text change
function setupFirebaseStorage() {
  const uploadPhotoButton = document.getElementById("upload-photo");
  const cvPhotoInput = document.getElementById("cv-photo");

  async function saveCVToFirestore() {
    const auth = getAuth(app);
    const db = getFirestore(app);

    // Fetch form data as before
    const formData = getFormData();

    // Add a timestamp to the formData object
    formData.timestamp = serverTimestamp(); // Firestore server timestamp
    const user = auth.currentUser;
    if (!user) {
      alert("You need to be logged in to save your CV.");
      return;
    }

    try {
      //
      await addDoc(collection(db, "cvs"), {
        ...formData,
        uid: user.uid,
      });
      alert("CV saved successfully.");
    } catch (error) {
      console.error("Error saving CV:", error);
      alert("Failed to save CV. Please try again.");
    }
  }

  const saveCVButton = document.getElementById("save-cv");
  if (saveCVButton) {
    saveCVButton.addEventListener("click", async () => {
      await saveCVToFirestore();
    });
  } else {
    console.error("Save CV button not found");
  }

  const signOutButton = document.getElementById("signOutButton");
  if (signOutButton) {
    signOutButton.addEventListener("click", signOut);
  }

  uploadPhotoButton.addEventListener("click", async () => {
    if (cvPhotoInput.files.length > 0) {
      const file = cvPhotoInput.files[0];

      // Resize image
      resizeImage(file, 197, 197, async (blob, dataUrl) => {
        // 5cm x 5cm
        const storageRef = ref(storage, `photo_upload/${file.name}`);

        try {
          const uploadTaskSnapshot = await uploadBytes(storageRef, blob);
          const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);

          console.log("File available at", downloadURL);
          // Use the data URL for the image src to avoid CORS issues with canvas
          document.getElementById("cv-photo-modern").src = dataUrl;
          document.getElementById("cv-photo-minimalistic").src = dataUrl;

          // Feedback to user
          alert("Photo uploaded successfully!");

          // Change button text
          uploadPhotoButton.textContent = "Replace Photo";
        } catch (error) {
          console.error("Upload error:", error);
          alert("Failed to upload photo.");
        }
      });
    } else {
      console.error("No file selected for upload.");
      alert("Please select a file to upload.");
    }
  });
}

<script src="../javascript.js"></script>;

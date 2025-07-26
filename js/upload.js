// Upload functionality for photo upload page

const uploadArea = document.getElementById("uploadArea");
const fileInput = document.getElementById("fileInput");
const previewContainer = document.getElementById("previewContainer");
const previewImage = document.getElementById("previewImage");
const progressBar = document.getElementById("progressBar");
const progressFill = document.getElementById("progressFill");

let selectedFiles = [];

// Drag and drop functionality
uploadArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  uploadArea.classList.add("dragover");
});

uploadArea.addEventListener("dragleave", () => {
  uploadArea.classList.remove("dragover");
});

uploadArea.addEventListener("drop", (e) => {
  e.preventDefault();
  uploadArea.classList.remove("dragover");
  const files = Array.from(e.dataTransfer.files);
  handleFiles(files);
});

// File input change
fileInput.addEventListener("change", (e) => {
  const files = Array.from(e.target.files);
  handleFiles(files);
});

function handleFiles(files) {
  const imageFiles = files.filter((file) =>
    file.type.startsWith("image/")
  );

  if (imageFiles.length === 0) {
    alert("Please select valid image files.");
    return;
  }

  selectedFiles = imageFiles;

  // Show preview of first image
  if (imageFiles.length > 0) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.src = e.target.result;
      previewContainer.style.display = "block";
    };
    reader.readAsDataURL(imageFiles[0]);
  }

  // Update upload area text
  const uploadText = uploadArea.querySelector(".upload-text");
  const uploadHint = uploadArea.querySelector(".upload-hint");
  uploadText.textContent = `${imageFiles.length} image(s) selected`;
  uploadHint.textContent = "Click to select different images";
}

function uploadPhotos() {
  if (selectedFiles.length === 0) {
    alert("Please select images to upload.");
    return;
  }

  // Show progress bar
  progressBar.style.display = "block";

  // Simulate upload progress
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);

      // Simulate successful upload
      setTimeout(() => {
        alert("Photos uploaded successfully!");
        window.location.href = "london.html";
      }, 500);
    }
    progressFill.style.width = progress + "%";
  }, 200);
}

// Prevent default drag behaviors on the page
document.addEventListener("dragover", (e) => e.preventDefault());
document.addEventListener("drop", (e) => e.preventDefault());

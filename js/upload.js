// Upload functionality for photo upload page

const uploadArea = document.getElementById("uploadArea");
const fileInput = document.getElementById("fileInput");
const previewContainer = document.getElementById("previewContainer");
const previewImagesGrid = document.getElementById("previewImagesGrid");
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
  displayImagePreviews(imageFiles);

  // Update upload area text
  const uploadText = uploadArea.querySelector(".upload-text");
  const uploadHint = uploadArea.querySelector(".upload-hint");
  uploadText.textContent = `${imageFiles.length} image(s) selected`;
  uploadHint.textContent = "Click to select different images";
}

function displayImagePreviews(files) {
  // Clear previous previews
  previewImagesGrid.innerHTML = '';
  
  // Show preview container
  previewContainer.style.display = "block";

  files.forEach((file, index) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      // Create preview item container
      const previewItem = document.createElement('div');
      previewItem.className = 'preview-item';
      
      // Create image element
      const img = document.createElement('img');
      img.src = e.target.result;
      img.className = 'preview-image';
      img.alt = `Preview ${index + 1}`;
      
      // Create filename label
      const filename = document.createElement('div');
      filename.className = 'preview-filename';
      filename.textContent = file.name;
      
      // Create remove button
      const removeBtn = document.createElement('button');
      removeBtn.className = 'remove-image';
      removeBtn.innerHTML = '×';
      removeBtn.onclick = () => removeImage(index);
      
      // Assemble preview item
      previewItem.appendChild(img);
      previewItem.appendChild(filename);
      previewItem.appendChild(removeBtn);
      
      // Add to grid
      previewImagesGrid.appendChild(previewItem);
    };
    
    reader.readAsDataURL(file);
  });
}

function removeImage(index) {
  selectedFiles.splice(index, 1);
  
  if (selectedFiles.length === 0) {
    previewContainer.style.display = "none";
    // Reset upload area text
    const uploadText = uploadArea.querySelector(".upload-text");
    const uploadHint = uploadArea.querySelector(".upload-hint");
    uploadText.textContent = "Drop your photo here or click to browse";
    uploadHint.textContent = "Supports JPG, PNG, GIF up to 10MB";
  } else {
    displayImagePreviews(selectedFiles);
    // Update upload area text
    const uploadText = uploadArea.querySelector(".upload-text");
    const uploadHint = uploadArea.querySelector(".upload-hint");
    uploadText.textContent = `${selectedFiles.length} image(s) selected`;
    uploadHint.textContent = "Click to select different images";
  }
}

function uploadPhotos() {
  if (selectedFiles.length === 0) {
    alert("Please select images to upload.");
    return;
  }

  // Show progress bar
  progressBar.style.display = "block";

  // Convert images to base64 and store them
  const imagePromises = selectedFiles.map(file => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve({
          name: file.name,
          data: e.target.result,
          timestamp: Date.now()
        });
      };
      reader.readAsDataURL(file);
    });
  });

  Promise.all(imagePromises).then(images => {
    // Get existing images from localStorage
    const existingImages = JSON.parse(localStorage.getItem('londonImages') || '[]');
    
    // Add new images
    const updatedImages = [...existingImages, ...images];
    
    // Store in localStorage
    localStorage.setItem('londonImages', JSON.stringify(updatedImages));

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
          // Determine the correct path to London page based on current location
          const currentPath = window.location.pathname;
          let redirectPath;
          
          if (currentPath.includes('travels/cities/')) {
            redirectPath = 'london.html';
          } else {
            redirectPath = 'travels/cities/london.html';
          }
          
          window.location.href = redirectPath;
        }, 500);
      }
      progressFill.style.width = progress + "%";
    }, 200);
  });
}

// Prevent default drag behaviors on the page
document.addEventListener("dragover", (e) => e.preventDefault());
document.addEventListener("drop", (e) => e.preventDefault());

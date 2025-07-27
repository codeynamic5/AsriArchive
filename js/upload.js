// Upload functionality for photo upload page

const uploadArea        = document.getElementById("uploadArea");
const fileInput         = document.getElementById("fileInput");
const previewContainer  = document.getElementById("previewContainer");
const previewImagesGrid = document.getElementById("previewImagesGrid");
const progressBar       = document.getElementById("progressBar");
const progressFill      = document.getElementById("progressFill");
const titleInput        = document.getElementById("titleInput");   // <─ NEW

let selectedFiles = [];

// Check authentication when page loads
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, checking authentication...');
  
  // Check if user is logged in
  const currentRole = getUserRole();
  if (!currentRole) {
    // Redirect to login if not authenticated
    alert('Please log in to access the upload page.');
    window.location.href = 'login.html';
    return;
  }
  
  // Check if user is admin
  if (currentRole !== 'admin') {
    // Show access denied message for guests
    document.getElementById('uploadForm').style.display = 'none';
    document.getElementById('accessDenied').style.display = 'block';
    return;
  }
  
  // User is admin, set up upload functionality
  console.log('Admin user detected, enabling upload functionality');
  setupUploadFunctionality();
});

function setupUploadFunctionality() {
  const uploadBtn = document.getElementById('uploadBtn');
  if (uploadBtn) {
    console.log('Upload button found, adding event listener');
    uploadBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Upload button clicked via event listener');
      uploadPhotos();
    });
  } else {
    console.error('Upload button not found!');
  }
}

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
  // Clear the input so the same files can be selected again
  e.target.value = '';
});

function handleFiles(files) {
  const imageFiles = files.filter((file) =>
    file.type.startsWith("image/")
  );

  if (imageFiles.length === 0) {
    alert("Please select valid image files.");
    return;
  }

  // Check file sizes (300MB = 300 * 1024 * 1024 bytes)
  const maxFileSize = 300 * 1024 * 1024; // 300MB in bytes
  const oversizedFiles = imageFiles.filter(file => file.size > maxFileSize);
  
  if (oversizedFiles.length > 0) {
    const oversizedNames = oversizedFiles.map(file => file.name).join(', ');
    alert(`The following files exceed the 300MB limit: ${oversizedNames}\nPlease select smaller files.`);
    return;
  }

  // Filter out duplicate files based on name and size
  const existingFileKeys = selectedFiles.map(file => `${file.name}-${file.size}`);
  const newFiles = imageFiles.filter(file => {
    const fileKey = `${file.name}-${file.size}`;
    return !existingFileKeys.includes(fileKey);
  });

  if (newFiles.length === 0) {
    alert("All selected files are already added.");
    return;
  }

  // Add new files to existing selection
  selectedFiles = [...selectedFiles, ...newFiles];
  displayImagePreviews(selectedFiles);

  // Update upload area text
  const uploadText = uploadArea.querySelector(".upload-text");
  const uploadHint = uploadArea.querySelector(".upload-hint");
  uploadText.textContent = `${selectedFiles.length} image(s) selected`;
  uploadHint.textContent = selectedFiles.length === 1 
    ? "Add more images to create a collection, or drag & drop" 
    : `${selectedFiles.length} images ready for your collection! Add more or upload now.`;
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
      
      // Create image counter (Instagram-like)
      const counter = document.createElement('div');
      counter.className = 'image-counter';
      counter.textContent = `${index + 1}/${files.length}`;
      
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
      removeBtn.onclick = () => removeImageByFile(file);
      
      // Assemble preview item
      previewItem.appendChild(counter);
      previewItem.appendChild(img);
      previewItem.appendChild(filename);
      previewItem.appendChild(removeBtn);
      
      // Add to grid
      previewImagesGrid.appendChild(previewItem);
    };
    
    reader.readAsDataURL(file);
  });
  
  // Add multiple selection hint
  if (files.length > 1) {
    const hint = document.createElement('div');
    hint.className = 'multiple-selection-hint';
    hint.textContent = `${files.length} images selected - just like an Instagram post! 📸`;
    previewContainer.appendChild(hint);
  }
}

function removeImageByFile(fileToRemove) {
  // Find the index of the file to remove
  const index = selectedFiles.findIndex(file => 
    file.name === fileToRemove.name && 
    file.size === fileToRemove.size && 
    file.lastModified === fileToRemove.lastModified
  );
  
  if (index !== -1) {
    selectedFiles.splice(index, 1);
  }
  
  if (selectedFiles.length === 0) {
    previewContainer.style.display = "none";
    // Reset upload area text
    const uploadText = uploadArea.querySelector(".upload-text");
    const uploadHint = uploadArea.querySelector(".upload-hint");
    uploadText.textContent = "Drop your photos here or click to browse";
    uploadHint.textContent = "Select multiple images to create collections like Instagram posts!\nSupports JPG, PNG, GIF up to 300MB per image";
  } else {
    displayImagePreviews(selectedFiles);
    // Update upload area text
    const uploadText = uploadArea.querySelector(".upload-text");
    const uploadHint = uploadArea.querySelector(".upload-hint");
    uploadText.textContent = `${selectedFiles.length} image(s) selected`;
    uploadHint.textContent = selectedFiles.length === 1 
      ? "Add more images to create a collection, or drag & drop" 
      : `${selectedFiles.length} images ready for your collection! Add more or upload now.`;
  }
}

function uploadPhotos() {
  console.log('=== UPLOAD FUNCTION CALLED ===');
  
  // Double-check admin permissions before upload
  if (!isAdmin()) {
    alert('Admin access required to upload photos.');
    return;
  }
  
  console.log('Admin permission confirmed, proceeding with upload');
  
  const title = titleInput ? titleInput.value.trim() : "";
  console.log('Title:', title);

  if (!title) {
    alert("Please enter a title for this collection.");
    return;
  }

  if (selectedFiles.length === 0) {
    alert("Please select images to upload.");
    return;
  }

  console.log('About to show progress bar...');
  console.log('Progress bar element before:', progressBar);
  console.log('Progress bar exists:', !!progressBar);
  
  // Check total file size and warn about storage limitations
  const totalSize = selectedFiles.reduce((sum, file) => sum + file.size, 0);
  const totalSizeMB = totalSize / (1024 * 1024);
  
  if (selectedFiles.length > 10) {
    const proceed = confirm(`Warning: You're uploading ${selectedFiles.length} images at once.\n\nUploading many images may hit browser storage limits.\nFor best results, try uploading 5-10 images at a time.\n\nContinue anyway?`);
    if (!proceed) return;
  } else if (totalSizeMB > 50) {
    const proceed = confirm(`Warning: You're uploading ${totalSizeMB.toFixed(1)}MB of images.\n\nLarge uploads may fail due to browser storage limits.\nFor best results, try uploading under 50MB at a time.\n\nContinue anyway?`);
    if (!proceed) return;
  }

  // Show progress bar with better visibility controls
  console.log('=== SHOWING PROGRESS BAR ===');
  console.log('Progress bar element:', progressBar);
  console.log('Progress fill element:', progressFill);
  
  if (!progressBar) {
    console.error('Progress bar element not found!');
    alert('Error: Progress bar element not found');
    return;
  }
  
  if (!progressFill) {
    console.error('Progress fill element not found!');
    alert('Error: Progress fill element not found');
    return;
  }
  
  console.log('Setting progress bar styles...');
  progressBar.style.display = "block";
  progressBar.classList.add("visible");
  progressBar.style.opacity = "1";
  progressBar.style.visibility = "visible";
  progressFill.style.width = "0%";
  
  console.log('Progress bar element after styling:', progressBar);
  console.log('Progress bar classes:', progressBar.classList.toString());
  console.log('Progress bar computed style:', window.getComputedStyle(progressBar).display);
  console.log('Progress bar computed visibility:', window.getComputedStyle(progressBar).visibility);
  console.log('Progress bar computed opacity:', window.getComputedStyle(progressBar).opacity);

  // Convert images to base64 with compression
  const imagePromises = selectedFiles.map((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Create an image element for compression
        const img = new Image();
        img.onload = () => {
          // Create canvas for compression
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Calculate compressed dimensions (max 1920x1080 for storage efficiency)
          const maxWidth = 1920;
          const maxHeight = 1080;
          let { width, height } = img;
          
          if (width > height) {
            if (width > maxWidth) {
              height = (height * maxWidth) / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = (width * maxHeight) / height;
              height = maxHeight;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          
          // Draw and compress (80% quality for JPEG)
          ctx.drawImage(img, 0, 0, width, height);
          const compressedData = canvas.toDataURL('image/jpeg', 0.8);
          
          resolve({
            name: file.name,
            data: compressedData,
            timestamp: Date.now(),
            originalSize: file.size,
            compressedSize: compressedData.length
          });
        };
        img.onerror = () => reject(new Error(`Failed to load image: ${file.name}`));
        img.src = e.target.result;
      };
      reader.onerror = () => reject(new Error(`Failed to read file: ${file.name}`));
      reader.readAsDataURL(file);
    });
  });

  Promise.all(imagePromises).then((images) => {
    console.log('All images processed, attempting to save...');
    
    // Try to save images one by one to identify which ones fail
    const savedImages = [];
    let hasErrors = false;
    
    try {
      // Get existing images first
      const existingImages = JSON.parse(localStorage.getItem('londonImages') || '[]');
      console.log('Existing images count:', existingImages.length);
      
      // Try to save each image individually
      for (let i = 0; i < images.length; i++) {
        try {
          const testImages = [...existingImages, ...savedImages, images[i]];
          const testData = JSON.stringify(testImages);
          
          // Test if this image will fit
          localStorage.setItem('londonImages', testData);
          savedImages.push(images[i]);
          console.log(`Image ${i + 1}/${images.length} saved successfully (${images[i].name})`);
          
        } catch (imageError) {
          console.error(`Failed to save image ${i + 1} (${images[i].name}):`, imageError);
          hasErrors = true;
          
          if (imageError.name === 'QuotaExceededError' || imageError.message.includes('quota')) {
            // If we hit quota, stop trying to add more
            console.log('Storage quota reached, stopping upload process');
            break;
          }
        }
      }
      
      // If we saved at least some images, create a collection with those
      if (savedImages.length > 0) {
        try {
          const newCollection = {
            id: "col_" + Date.now(),
            title: title,
            createdAt: Date.now(),
            images: savedImages,
            totalImages: images.length,
            savedImages: savedImages.length
          };
          
          const existingCollections = JSON.parse(localStorage.getItem('londonCollections') || '[]');
          const updatedCollections = [...existingCollections, newCollection];
          localStorage.setItem('londonCollections', JSON.stringify(updatedCollections));
          console.log('Collection created with', savedImages.length, 'images');
          
        } catch (collectionError) {
          console.warn('Could not save collection metadata:', collectionError);
        }
      }
      
      // Show appropriate success/error message
      if (savedImages.length === images.length) {
        console.log('All images saved successfully!');
      } else if (savedImages.length > 0) {
        alert(`Partial upload successful!\n\nSaved: ${savedImages.length}/${images.length} images\nSome images were too large for storage.\n\nTip: Try uploading fewer images at once or use smaller file sizes.`);
      } else {
        alert(`Upload failed - no images could be saved.\n\nYour images are too large for browser storage.\nTry uploading 1-2 smaller images at a time.`);
        progressBar.style.display = "none";
        progressBar.classList.remove("visible");
        return;
      }

    } catch (storageError) {
      console.error('Storage error:', storageError);
      alert(`Storage error: ${storageError.message}\n\nTry uploading fewer or smaller images.`);
      progressBar.style.display = "none";
      progressBar.classList.remove("visible");
      return;
    }

    /* animate progress bar */
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          if (savedImages.length === images.length) {
            const totalOriginalSize = savedImages.reduce((sum, img) => sum + img.originalSize, 0);
            const totalCompressedSize = savedImages.reduce((sum, img) => sum + img.compressedSize, 0);
            
            alert(`Collection "${title}" uploaded successfully!\n${savedImages.length} images compressed from ${(totalOriginalSize / (1024 * 1024)).toFixed(1)}MB to ${(totalCompressedSize / (1024 * 1024)).toFixed(1)}MB`);
          }
          
          // Determine the correct path to London page based on current location
          const currentPath = window.location.pathname;
          let redirectPath;
          
          if (currentPath.includes('travels/cities/')) {
            redirectPath = 'london.html';
          } else {
            redirectPath = 'travels/cities/london.html';
          }
          
          window.location.href = redirectPath;
        }, 400);
      }
      progressFill.style.width = progress + "%";
    }, 200);
  }).catch(error => {
    console.error('Error during image processing:', error);
    alert(`Error processing images: ${error.message}\n\nTry uploading fewer images or smaller file sizes.`);
    progressBar.style.display = "none";
    progressBar.classList.remove("visible");
  });
}

// Prevent default drag behaviors on the page
document.addEventListener("dragover", (e) => e.preventDefault());
document.addEventListener("drop", (e) => e.preventDefault());

// Test function for progress bar
function testProgressBar() {
  console.log('=== TESTING PROGRESS BAR ===');
  const progressBar = document.getElementById("progressBar");
  const progressFill = document.getElementById("progressFill");
  
  console.log('Progress bar element:', progressBar);
  console.log('Progress fill element:', progressFill);
  
  if (!progressBar) {
    alert('Progress bar element not found!');
    return;
  }
  
  if (!progressFill) {
    alert('Progress fill element not found!');
    return;
  }
  
  console.log('Showing progress bar...');
  progressBar.style.display = "block";
  progressBar.classList.add("visible");
  progressBar.style.opacity = "1";
  progressBar.style.visibility = "visible";
  progressFill.style.width = "0%";
  
  console.log('Animating progress...');
  let progress = 0;
  const interval = setInterval(() => {
    progress += 10;
    progressFill.style.width = progress + "%";
    console.log('Progress:', progress + '%');
    
    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        console.log('Hiding progress bar...');
        progressBar.style.display = "none";
        progressBar.classList.remove("visible");
        progressFill.style.width = "0%";
      }, 1000);
    }
  }, 200);
}

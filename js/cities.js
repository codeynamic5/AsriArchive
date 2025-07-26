const imageContainer = document.getElementById("imageContainer");

const imageFilenames = [
  "tate.png", "london2.png", "london3.png", "london4.png", "london5.png",
  "lon6.png", "lon7.png", "lon8.png", "lon9.png",
  "don1.png", "don2.png", "don3.png", "don4.png", "don5.png",
  "lon10.png", "lon16.png", "lon17.png"
];

const imagePath = "../../images/travel/";

// Load existing images
imageFilenames.forEach(filename => {
  const img = document.createElement("img");
  img.src = imagePath + filename;
  img.alt = "London Image";
  img.classList.add("gallery-image");
  imageContainer.appendChild(img);
});

// Load uploaded images from localStorage
function loadUploadedImages() {
  const uploadedImages = JSON.parse(localStorage.getItem('londonImages') || '[]');
  
  uploadedImages.forEach((imageData, index) => {
    // Create container for uploaded images with delete button
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");
    
    const img = document.createElement("img");
    img.src = imageData.data;
    img.alt = imageData.name;
    img.classList.add("gallery-image");
    img.title = imageData.name;
    
    // Create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = "×";
    deleteBtn.title = "Remove image";
    deleteBtn.onclick = (e) => {
      e.stopPropagation(); // Prevent modal from opening
      removeUploadedImage(index);
    };
    
    imageContainer.appendChild(img);
    imageContainer.appendChild(deleteBtn);
    
    document.getElementById("imageContainer").appendChild(imageContainer);
  });
}

// Function to remove uploaded image
function removeUploadedImage(index) {
  if (confirm("Are you sure you want to remove this image?")) {
    const uploadedImages = JSON.parse(localStorage.getItem('londonImages') || '[]');
    uploadedImages.splice(index, 1);
    localStorage.setItem('londonImages', JSON.stringify(uploadedImages));
    
    // Reload the page to refresh the gallery
    location.reload();
  }
}

// Load uploaded images when page loads
loadUploadedImages();

// Function to setup modal functionality
function setupModal() {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const images = document.querySelectorAll(".image-collage img");

  images.forEach((img) => {
    img.onclick = function (e) {
      // Only open modal if not clicking on delete button
      if (!e.target.classList.contains('delete-btn')) {
        modal.style.display = "block";
        modalImg.src = this.src;
      }
    };
  });

  modal.onclick = function () {
    modal.style.display = "none";
  };
}

// Setup modal after images are loaded
setupModal();

// Re-setup modal when new images are added
window.addEventListener('storage', function(e) {
  if (e.key === 'londonImages') {
    // Reload uploaded images if localStorage changes
    const uploadedContainers = document.querySelectorAll('.image-container');
    const uploadedImages = document.querySelectorAll('.gallery-image');
    
    // Remove uploaded image containers
    uploadedContainers.forEach(container => container.remove());
    
    // Remove any standalone uploaded images (data: URLs)
    uploadedImages.forEach(img => {
      if (img.src.startsWith('data:') && !img.parentElement.classList.contains('image-container')) {
        img.remove();
      }
    });
    
    loadUploadedImages();
    setupModal();
  }
});
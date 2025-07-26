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
  
  uploadedImages.forEach(imageData => {
    const img = document.createElement("img");
    img.src = imageData.data;
    img.alt = imageData.name;
    img.classList.add("gallery-image", "uploaded-image");
    img.title = imageData.name;
    
    // Add a small indicator that this is an uploaded image
    img.style.border = "3px solid #007bff";
    img.style.borderRadius = "8px";
    
    imageContainer.appendChild(img);
  });
}

// Load uploaded images when page loads
loadUploadedImages();

// Function to setup modal functionality
function setupModal() {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const images = document.querySelectorAll(".image-collage img");

  images.forEach((img) => {
    img.onclick = function () {
      modal.style.display = "block";
      modalImg.src = this.src;
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
    const uploadedImages = document.querySelectorAll('.uploaded-image');
    uploadedImages.forEach(img => img.remove());
    loadUploadedImages();
    setupModal();
  }
});
const imageContainer = document.getElementById("imageContainer");

const imageFilenames = [
  "tate.png", "london2.png", "london3.png", "london4.png", "london5.png",
  "lon6.png", "lon7.png", "lon8.png", "lon9.png",
  "don1.png", "don2.png", "don3.png", "don4.png", "don5.png",
  "lon10.png", "lon16.png", "lon17.png"
];

const imagePath = "../../images/travel/";

// Check authentication and setup page based on role
document.addEventListener('DOMContentLoaded', function() {
  const currentRole = getUserRole();
  console.log('Current user role:', currentRole);
  
  // Show/hide admin features based on role
  setupRoleBasedFeatures(currentRole);
});

function setupRoleBasedFeatures(userRole) {
  const addPhotoBtn = document.getElementById("addPhotoBtn");
  
  if (userRole === 'admin') {
    // Show admin features
    if (addPhotoBtn) {
      addPhotoBtn.style.display = 'flex';
    }
    console.log('Admin features enabled');
  } else {
    // Hide admin features for guests or non-authenticated users
    if (addPhotoBtn) {
      addPhotoBtn.style.display = 'none';
    }
    console.log('Guest mode - admin features hidden');
  }
}

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
  const uploadedCollections = JSON.parse(localStorage.getItem('londonCollections') || '[]');
  
  console.log('Loading individual images:', uploadedImages.length, 'images found');
  console.log('Loading collections:', uploadedCollections.length, 'collections found');
  
  // Load individual images (legacy support)
  uploadedImages.forEach((imageData, index) => {
    console.log(`Loading individual image ${index + 1}:`, imageData.name);
    createImageElement(imageData);
  });
  
  // Load images from collections
  uploadedCollections.forEach((collection, collectionIndex) => {
    console.log(`Loading collection ${collectionIndex + 1}: "${collection.title}" with ${collection.images.length} images`);
    
    collection.images.forEach((imageData, imageIndex) => {
      console.log(`Loading collection image ${imageIndex + 1}:`, imageData.name);
      createImageElement(imageData, collection.title);
    });
  });
}

// Helper function to create image elements
function createImageElement(imageData, collectionTitle = null) {
  // Create container for uploaded images with delete button
  const imageContainer = document.createElement("div");
  imageContainer.classList.add("image-container");
  
  const img = document.createElement("img");
  img.src = imageData.data;
  img.alt = imageData.name;
  img.classList.add("gallery-image");
  img.title = collectionTitle ? `${collectionTitle}: ${imageData.name}` : imageData.name;
  
  // Only show delete button for admins
  const currentRole = getUserRole();
  if (currentRole === 'admin') {
    // Create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = "×";
    deleteBtn.title = "Remove image (Admin only)";
    deleteBtn.onclick = (e) => {
      e.stopPropagation(); // Prevent modal from opening
      removeUploadedImageByData(imageData);
    };
    imageContainer.appendChild(deleteBtn);
  }
  
  imageContainer.appendChild(img);
  
  document.getElementById("imageContainer").appendChild(imageContainer);
}

// Function to remove uploaded image by matching data
function removeUploadedImageByData(imageToRemove) {
  // Check if user is admin
  if (!isAdmin()) {
    alert('Admin access required to delete images.');
    return;
  }
  
  if (confirm("Are you sure you want to remove this image?")) {
    let imageRemoved = false;
    
    // Try to remove from individual images first
    const uploadedImages = JSON.parse(localStorage.getItem('londonImages') || '[]');
    const filteredImages = uploadedImages.filter(img => 
      !(img.timestamp === imageToRemove.timestamp && 
        img.name === imageToRemove.name && 
        img.data === imageToRemove.data)
    );
    
    if (filteredImages.length !== uploadedImages.length) {
      localStorage.setItem('londonImages', JSON.stringify(filteredImages));
      imageRemoved = true;
      console.log('Removed image from individual images');
    }
    
    // Also try to remove from collections
    const uploadedCollections = JSON.parse(localStorage.getItem('londonCollections') || '[]');
    let collectionsModified = false;
    
    const updatedCollections = uploadedCollections.map(collection => {
      const originalLength = collection.images.length;
      collection.images = collection.images.filter(img => 
        !(img.timestamp === imageToRemove.timestamp && 
          img.name === imageToRemove.name && 
          img.data === imageToRemove.data)
      );
      
      if (collection.images.length !== originalLength) {
        collectionsModified = true;
        console.log(`Removed image from collection: ${collection.title}`);
      }
      
      return collection;
    }).filter(collection => collection.images.length > 0); // Remove empty collections
    
    if (collectionsModified) {
      localStorage.setItem('londonCollections', JSON.stringify(updatedCollections));
      imageRemoved = true;
    }
    
    if (imageRemoved) {
      // Reload the page to refresh the gallery
      location.reload();
    } else {
      alert('Image not found in storage.');
    }
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
  if (e.key === 'londonImages' || e.key === 'londonCollections') {
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
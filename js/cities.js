const imageContainer = document.getElementById("imageContainer");

const imageFilenames = [
  "tate.png", "london2.png", "london3.png", "london4.png", "london5.png",
  "lon6.png", "lon7.png", "lon8.png", "lon9.png",
  "don1.png", "don2.png", "don3.png", "don4.png", "don5.png",
  "lon10.png", "lon16.png", "lon17.png"
];

const imagePath = "../../images/travel/";

imageFilenames.forEach(filename => {
  const img = document.createElement("img");
  img.src = imagePath + filename;
  img.alt = "London Image";
  imageContainer.appendChild(img);
});

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
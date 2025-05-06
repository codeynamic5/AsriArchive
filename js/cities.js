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
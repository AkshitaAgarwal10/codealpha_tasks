// List of all image URLs, in the same order as they appear in the HTML
const images = [
  "https://picsum.photos/id/1015/800/600",
  "https://picsum.photos/id/1016/800/600",
  "https://picsum.photos/id/1018/800/600",
  "https://picsum.photos/id/1019/800/600",
  "https://picsum.photos/id/1020/800/600",
  "https://picsum.photos/id/1021/800/600"
];

let currentIndex = 0; // keeps track of which image is currently open

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

// Open the lightbox and show the clicked image
function openLightbox(index) {
  currentIndex = index;
  lightboxImg.src = images[currentIndex];
  lightbox.style.display = "flex";
}

// Hide the lightbox
function closeLightbox() {
  lightbox.style.display = "none";
}

// Go to the next image, wrapping around to the start at the end
function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  lightboxImg.src = images[currentIndex];
}

// Go to the previous image, wrapping around to the end at the start
function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  lightboxImg.src = images[currentIndex];
}

// Allow closing the lightbox by clicking outside the image
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Allow using arrow keys and Escape to navigate/close
document.addEventListener("keydown", (e) => {
  if (lightbox.style.display === "flex") {
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "Escape") closeLightbox();
  }
});

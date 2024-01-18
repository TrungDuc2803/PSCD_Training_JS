let currentSlideIndex = 1;

function showSlides(index) {
  const slides = document.getElementsByClassName('slide');
  const dots = document.getElementsByClassName('dot');

  if (index > slides.length) {
    currentSlideIndex = 1;
  }

  if (index < 1) {
    currentSlideIndex = slides.length;
  }

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }

  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(' active', '');
  }

  slides[currentSlideIndex - 1].style.display = 'block';
  dots[currentSlideIndex - 1].className += ' active';
}

function nextSlide() {
  showSlides(currentSlideIndex += 1);
}

function prevSlide() {
  showSlides(currentSlideIndex -= 1);
}

function currentSlide(index) {
  showSlides(currentSlideIndex = index);
}

// Initial setup
showSlides(currentSlideIndex);

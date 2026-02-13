document.addEventListener('DOMContentLoaded', () => {
  const bg = document.getElementById('hearts-bg');
  const revealBtn = document.getElementById('revealBtn');
  const hero = document.getElementById('hero');
  const loveCard = document.getElementById('love-card');

  // --- 1. FLOATING HEARTS ANIMATION ---
  const heartCount = 26;

  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart-bg');

    const left = Math.random() * 100;
    const scale = 0.7 + Math.random() * 0.5;
    const duration = 6 + Math.random() * 6;
    const delay = Math.random() * 8;

    heart.style.left = `${left}vw`;
    heart.style.transform = `rotate(45deg) scale(${scale})`;
    heart.style.animationDuration = `${duration}s`;
    heart.style.animationDelay = `-${delay}s`;

    bg.appendChild(heart);
  }

  // --- 2. REVEAL BUTTON LOGIC ---
  revealBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    hero.classList.add('hidden');
    loveCard.classList.remove('hidden');
    
    void loveCard.offsetWidth; 
    loveCard.classList.add('visible');
  });

  // --- 3. SLIDESHOW LOGIC ---
  
  // IMPORTANT: Make sure these filenames match EXACTLY what is in your public folder
  const images = [
    'love_1.png', 
    'us.png', 
    '1.png',
    '2.png',
    '3.png',
    '4.png',
    '5.png',
    '6.png',
    '7.png',
    '8.png',
    '9.png'
  ];

  let currentIndex = 0;
  let slideInterval;
  let isChanging = false; // Prevents double-clicking glitches
  const imgElement = document.getElementById('slide-img');
  const dotsContainer = document.getElementById('dots-container');

  // Error handler: If an image is missing, skip to the next one
  imgElement.onerror = function() {
    console.warn(`Image not found: ${images[currentIndex]}. Skipping...`);
    // Move to next slide immediately if current fails
    if (!isChanging) {
      changeSlide(); 
    }
  };

  function createDots() {
    dotsContainer.innerHTML = ''; // Clear existing dots
    images.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      
      dot.addEventListener('click', () => {
        if (isChanging || index === currentIndex) return;
        goToSlide(index);
        resetTimer();
      });
      
      dotsContainer.appendChild(dot);
    });
  }

  function changeSlide() {
    if (isChanging) return;
    isChanging = true;

    // 1. Fade Out
    imgElement.classList.add('fade-out');

    // 2. Change Image after fade
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % images.length;
      imgElement.src = images[currentIndex];
      updateDots();
      
      // 3. Fade In
      imgElement.onload = () => {
         imgElement.classList.remove('fade-out');
         isChanging = false;
      };
      
      // Fallback if onload doesn't fire (rare)
      setTimeout(() => {
        imgElement.classList.remove('fade-out');
        isChanging = false;
      }, 850); 
      
    }, 800); 
  }

  function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      if (index === currentIndex) dot.classList.add('active');
      else dot.classList.remove('active');
    });
  }

  function goToSlide(index) {
    if (isChanging) return;
    isChanging = true;

    imgElement.classList.add('fade-out');
    setTimeout(() => {
      currentIndex = index;
      imgElement.src = images[currentIndex];
      updateDots();
      
      imgElement.onload = () => {
         imgElement.classList.remove('fade-out');
         isChanging = false;
      };
      
      setTimeout(() => {
        imgElement.classList.remove('fade-out');
        isChanging = false;
      }, 850);

    }, 800);
  }

  function startSlideshow() {
    createDots();
    slideInterval = setInterval(changeSlide, 4000);
  }

  function resetTimer() {
    clearInterval(slideInterval);
    slideInterval = setInterval(changeSlide, 4000);
  }

  startSlideshow();
});
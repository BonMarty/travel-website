const logo = document.querySelector('.header__logo');
const burger = document.getElementById('burger');
const nav = document.getElementById('header__nav');

window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  const links = document.querySelectorAll('.nav__link');

  let scrollPos = window.scrollY;

  if (scrollPos > 0) {
    header.classList.add('reverse');
    logo.classList.add('reverse');
    links.forEach((link) => {
      link.classList.add('reverse');
    });
    burger.classList.add('reverse');
  } else {
    header.classList.remove('reverse');
    logo.classList.remove('reverse');
    links.forEach((link) => {
      link.classList.remove('reverse');
    });
    burger.classList.remove('reverse');
  }
});

burger.addEventListener('click', () => {
  if (window.scrollY > 0) {
    logo.classList.add('reverse');
  }
  burger.classList.toggle('burger__active');
  nav.classList.toggle('header__nav-visible');
});

document.addEventListener('click', (event) => {
  if (event.target.id !== 'burger' && event.target.id !== 'header__nav') {
    burger.classList.remove('burger__active');
    nav.classList.remove('header__nav-visible');
  }
});

const anchors = document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
    });
  });
});

const destinationSwiper = new Swiper('.destinations-swiper', {
  loop: true,

  speed: 1000,

  autoplay: {
    delay: 2000,
  },

  navigation: {
    nextEl: '.destinations-button-next',
    prevEl: '.destinations-button-prev',
  },
});

const galleryButtons = document.querySelectorAll('.gallery__button');
const galleryImages = document.querySelectorAll('.gallery__image');

const filter = (category, items) => {
  items.forEach((item) => {
    const isItemFiltered = !item.classList.contains(category);
    const isShowAll = category.toLowerCase() === 'all';

    if (isItemFiltered && !isShowAll) {
      item.classList.add('hide');
      setTimeout(() => {
        item.classList.add('remove');
      }, 500);
    } else {
      item.classList.remove('hide');
      setTimeout(() => {
        item.classList.remove('remove');
      }, 500);
    }
  });
};

galleryButtons.forEach((galleryButton) => {
  galleryButton.addEventListener('click', () => {
    const currentCategory = galleryButton.dataset.filter;
    filter(currentCategory, galleryImages);
  });
});

const onEntry = (entry) => {
  entry.forEach((change) => {
    if (change.isIntersecting) {
      change.target.classList.add('element-show');
    }
  });
};

let options = {
  threshold: [0.5],
};

let observer = new IntersectionObserver(onEntry, options);
let heroContent = document.querySelector('.hero__content');

observer.observe(heroContent);
for (let elem of galleryImages) {
  observer.observe(elem);
}

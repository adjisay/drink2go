const CURRENT_CLASS = 'slider__button-pagination--current';

const initSlider = () => {
  const sliderElement = document.querySelector('.promo__slider');

  if (!sliderElement) {
    return;
  }

  const listElement = sliderElement.querySelector('.slider__list');
  const prevButtonElement = sliderElement.querySelector('.slider__button-action--prev');
  const nextButtonElement = sliderElement.querySelector('.slider__button-action--next');
  const paginationElement = sliderElement.querySelector('.slider__pagination');
  const paginationButtonElements = [...paginationElement.querySelectorAll('.slider__button-pagination')];
  const slidesCount = listElement.children.length;

  const getCurrentIndex = () => Math.round(listElement.scrollLeft / listElement.clientWidth);

  const scrollToSlide = (index) => {
    listElement.scrollTo({left: index * listElement.clientWidth, behavior: 'smooth'});
  };

  const updateButtons = (currentIndex) => {
    prevButtonElement.disabled = currentIndex === 0;
    nextButtonElement.disabled = currentIndex === slidesCount - 1;
  };

  const updatePagination = (currentIndex) => {
    paginationButtonElements.forEach((buttonElement, index) => {
      const isCurrent = index === currentIndex;

      buttonElement.classList.toggle(CURRENT_CLASS, isCurrent);

      if (isCurrent) {
        buttonElement.setAttribute('aria-current', 'true');
      } else {
        buttonElement.removeAttribute('aria-current');
      }
    });
  };

  const updateSlider = () => {
    const currentIndex = getCurrentIndex();

    updatePagination(currentIndex);
    updateButtons(currentIndex);
  };

  const onPrevButtonClick = () => scrollToSlide(getCurrentIndex() - 1);

  const onNextButtonClick = () => scrollToSlide(getCurrentIndex() + 1);

  const onPaginationClick = (evt) => {
    const buttonElement = evt.target.closest('.slider__button-pagination');

    if (buttonElement) {
      scrollToSlide(paginationButtonElements.indexOf(buttonElement));
    }
  };

  prevButtonElement.addEventListener('click', onPrevButtonClick);
  nextButtonElement.addEventListener('click', onNextButtonClick);
  paginationElement.addEventListener('click', onPaginationClick);
  listElement.addEventListener('scroll', updateSlider, {passive: true});

  updateSlider();
};

export {initSlider};

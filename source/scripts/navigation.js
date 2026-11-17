const CLOSE_CLASS = 'navigation--close';
const OPEN_CLASS = 'navigation--open';

const ButtonText = {
  OPEN: 'Открыть меню',
  CLOSE: 'Закрыть меню',
};

const initNavigation = () => {
  const navigationElement = document.querySelector('.navigation');

  if (!navigationElement) {
    return;
  }

  const toggleElement = navigationElement.querySelector('.navigation__toggle');
  const toggleTextElement = toggleElement.querySelector('.visually-hidden');

  const onToggleClick = () => {
    const isClosed = navigationElement.classList.toggle(CLOSE_CLASS);

    navigationElement.classList.toggle(OPEN_CLASS, !isClosed);
    toggleElement.setAttribute('aria-expanded', String(!isClosed));
    toggleTextElement.textContent = isClosed ? ButtonText.OPEN : ButtonText.CLOSE;
  };

  toggleElement.addEventListener('click', onToggleClick);
};

export {initNavigation};

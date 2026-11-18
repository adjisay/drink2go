const PriceRange = {
  MIN: 0,
  MAX: 1000,
};

const PRICE_START_MAX = 900;
const SLIDER_STEP = 1;

const initPriceSlider = () => {
  const sliderElement = document.querySelector('#price-slider');

  if (!sliderElement) {
    return;
  }

  const minInputElement = document.querySelector('#price-min');
  const maxInputElement = document.querySelector('#price-max');
  const formElement = sliderElement.closest('form');

  noUiSlider.create(sliderElement, {
    range: {
      min: PriceRange.MIN,
      max: PriceRange.MAX,
    },
    start: [PriceRange.MIN, PRICE_START_MAX],
    step: SLIDER_STEP,
    connect: true,
    format: {
      to: (value) => Math.round(value),
      from: (value) => Number(value),
    },
  });

  const onSliderUpdate = (values) => {
    const [minValue, maxValue] = values;

    minInputElement.value = minValue === PriceRange.MIN ? '' : minValue;
    maxInputElement.value = maxValue;
  };

  const onMinInputChange = () => {
    sliderElement.noUiSlider.set([minInputElement.value, null]);
  };

  const onMaxInputChange = () => {
    sliderElement.noUiSlider.set([null, maxInputElement.value]);
  };

  const onFormReset = () => {
    sliderElement.noUiSlider.reset();
  };

  sliderElement.noUiSlider.on('update', onSliderUpdate);
  minInputElement.addEventListener('change', onMinInputChange);
  maxInputElement.addEventListener('change', onMaxInputChange);
  formElement.addEventListener('reset', onFormReset);
};

export {initPriceSlider};

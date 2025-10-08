import { getLocalStorage } from '../utils';

import './style.css';

const showCircle = () => {
  const circleElement = document.createElement('div');
  circleElement.classList.add('chrome-extension-cursor-circle');

  document.body.appendChild(circleElement);

  circleElement.style.setProperty('left', '-9999px', 'important');
  circleElement.style.setProperty('top', '-9999px', 'important');

  document.addEventListener('mousemove', (e) => {
    circleElement.style.setProperty('left', `${e.clientX}px`, 'important');
    circleElement.style.setProperty('top', `${e.clientY}px`, 'important');
  });

  document.addEventListener('mouseleave', () => {
    circleElement.style.setProperty('left', '-9999px', 'important');
    circleElement.style.setProperty('top', '-9999px', 'important');
  });
};

const init = async () => {
  const settings = await getLocalStorage('settings');

  if (settings?.enabled) {
    showCircle();
  }
};

init();

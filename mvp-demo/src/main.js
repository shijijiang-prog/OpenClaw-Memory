import { renderApp } from './router.js';

window.addEventListener('hashchange', renderApp);
window.addEventListener('load', () => {
  if (!location.hash) location.hash = '#/home';
  renderApp();
});

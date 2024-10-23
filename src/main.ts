import './global.css'
import { pageCreateTimer } from './pages/create-timer'
import { pageTimer } from './pages/timer'
import { pageNotFound } from './pages/not-found'

const routes: { [key: string]: string } = {
  '/': pageCreateTimer,
  '/timer': pageTimer,
  '/not-found': pageNotFound 
};

const parseLocation = () => {
  const pathname = window.location.pathname;
  return routes[pathname] || routes['/not-found']; 
};

const renderPage = () => {
  const page = parseLocation();
  document.querySelector('#app')!.innerHTML = page;
};

renderPage();
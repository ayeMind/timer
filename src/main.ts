import './global.css'
import { pageCreateTimer } from './pages/create-timer'
import { pageTimer } from './pages/timer'
import { pageNotFound } from './pages/not-found'

let page = pageNotFound;
const url = new URL(window.location.href);
console.log(url)

if (url.pathname === '/timer') {
  if (url.searchParams.has('id') && url.searchParams.has('date')) {
    page = pageTimer;
  }
} else if (url.pathname === '/') {
  page = pageCreateTimer;
} else {
  page = pageNotFound;
}

document.querySelector('#app')!.innerHTML = page;

import './app.css';
import Convert from './Convert.svelte';

let app: Convert | null = null;
const targetElement = document.getElementById('app');

if (targetElement) {
  app = new Convert({
    target: targetElement,
  });
} else {
  console.error('Target element not found');
}

export default app;

import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const app = document.getElementById('root');

export default function Modal({ children }) {
  const element = document.createElement('div');

  useEffect(() => {
    app.appendChild(element);
    return () => app.removeChild(element);
  });

  return createPortal(children, element);
}

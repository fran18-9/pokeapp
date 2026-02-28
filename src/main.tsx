import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Pokedex from './views/Pokedex.js';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Pokedex />
  </StrictMode>,
)

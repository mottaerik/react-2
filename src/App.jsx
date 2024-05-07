import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Cabecalho from './componente-cabecalho/cabecalho.jsx';
import Tarefas from './tarefas/tarefas-componente.jsx';
import './App.css'

function App() {

  return <>
    <Cabecalho />
    <Tarefas />
  </>
  
}

export default App

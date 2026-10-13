import { Routes, Route } from 'react-router-dom'
import { Nav } from "./layout/Nav"
import { Home } from './layout/Home'
import { Tasks } from './layout/Tasks'
import { SnackbarProvider } from 'notistack'
import './App.css'
import { CssBaseline } from '@mui/material'
import { HomeFilled, Task } from '@mui/icons-material'

const navLinks = [
  {
    text: 'Home',
    path: '/',
    icon: <HomeFilled/>
  },
  {
    text: 'Tasks',
    path: 'tasks',
    icon: <Task/>
  }
]

function App() {

  return (
    <>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3000}
      >
        <CssBaseline/>
        <Nav navLinks={navLinks} />
        <Routes>
          <Route path='' element={<Home/>} />
          <Route path='tasks' element={<Tasks/>} />
        </Routes>
      </SnackbarProvider>
    </>
  )
}

export default App

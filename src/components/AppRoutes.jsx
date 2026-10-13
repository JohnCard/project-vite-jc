import { Route, Routes } from "react-router-dom"
import { Home } from "../layout/Home"
import { Tasks } from "../layout/Tasks"

export const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="tasks" element={<Tasks/>} />
    </Routes>
  )
}

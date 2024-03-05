import { NavLink, Routes, Route, Navigate } from 'react-router-dom'
import Home from './views/Home'
import TodoList from './views/TodoList'
import About from './views/About'
import ReduxDemo from './views/ReduxDemo'
import './App.css'

function App() {
  return (
    <div>
      {/* 路由链接 */}
      <NavLink
        className="route-item"
        to="/home">
        Home
      </NavLink>
      <NavLink
        className="route-item"
        to="/toDoList">
        TodoList
      </NavLink>
      <NavLink
        className="route-item"
        to="/about">
        About
      </NavLink>
      <NavLink
        className="route-item"
        to="/reduxDemo">
        ReduxDemo
      </NavLink>
      {/* 注册路由 */}
      <Routes>
        <Route
          path="/home"
          element={<Home />}
        />
        <Route
          path="/toDoList"
          element={<TodoList />}
        />
        <Route
          path="/about"
          element={<About />}
        />
        <Route
          path="/reduxDemo"
          element={<ReduxDemo />}
        />
        <Route
          path="/"
          element={<Navigate to="/home" />}
        />
      </Routes>
    </div>
  )
}

export default App

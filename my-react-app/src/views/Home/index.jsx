import React, { Component } from 'react'
import { NavLink, Routes, Route, Navigate } from 'react-router-dom'
import Messages from './Messages'
import News from './News'

export default class Home extends Component {
  render() {
    return (
      <div>
        {/* <NavLink
          className="route-item"
          to="/home/news">
          News
        </NavLink>
        <NavLink
          className="route-item"
          to="/home/messages">
          Messages
        </NavLink>
        <Routes>
          <Route
            path="/home/news"
            element={<News />}
          />
          <Route
            path="/home/messages"
            element={<Messages />}
          />
        </Routes> */}
        <h1>Home</h1>
      </div>
    )
  }
}

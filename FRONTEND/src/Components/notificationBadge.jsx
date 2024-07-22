/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import './style.css'
const NotificationBadge = ({ count }) => {
    return (
      <div className="notification-badge">
        {count}
      </div>
    );
  }

export default NotificationBadge 
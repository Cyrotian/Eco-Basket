import React from "react";
import { useNotification } from "./NotificationContext";
import { FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../css/notification.css";

const NotificationBell = () => {
  const { notifications } = useNotification();

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="notification-bell-container">
      <Link to="/notification" className="bell-icon" title="Go to notifications">
        <FaBell size={22} />
        {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
      </Link>
    </div>
  );
};

export default NotificationBell;

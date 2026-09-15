import React, { useState } from "react";
import { useNotification } from "./NotificationContext";
import "../css/notification.css";
import { FaCheckCircle } from "react-icons/fa";

function Notification() {
  const { notifications, markAllAsRead, markAsRead } = useNotification();
  const [activeTab, setActiveTab] = useState("New");

  const filteredNotifications = notifications.filter((n) =>
    activeTab === "New" ? !n.read : n.read
  );

  return (
    <div className="notification-page">
      <h3 className="notification-heading">📬 Your Notifications</h3>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === "New" ? "active" : ""}`}
          onClick={() => setActiveTab("New")}
        >
          New
        </button>
        <button
          className={`tab-button ${activeTab === "read" ? "active" : ""}`}
          onClick={() => setActiveTab("read")}
        >
          Read
        </button>
      </div>

      {/* Mark all as read*/}
      {activeTab === "New" && filteredNotifications.length > 0 && (
        <div className="controls">
          <button
            onClick={markAllAsRead}
            className="mark-all-btn"
          >
            ✅ Mark All as Read
          </button>
        </div>
      )}

      {/* Notification List */}
      {filteredNotifications.length ? (
        <ul className="notification-list">
          {filteredNotifications.map((n) => (
            <li
              key={n.notificationId}
              className={`notification-item ${n.read ? "read" : "New"}`}
            >
              <div className="notification-content">
                <div className="notification-header">
                  <span className="notification-event">
                    {n.read ? "Read" : "New"}
                  </span>
                  <span className="notification-date">
                    {new Date(n.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="notification-text">{n.content}</div>
              </div>

              <div className="notification-actions">
                {!n.read && (
                  <button
                    title="Mark as Read"
                    onClick={() => markAsRead(n.notificationId)}
                    className="mark-read-button"
                  >
                    <FaCheckCircle />
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-state">
          {activeTab === "New"
            ? "No new notifications."
            : "No read notifications."}
        </div>
      )}
    </div>
  );
}

export default Notification;

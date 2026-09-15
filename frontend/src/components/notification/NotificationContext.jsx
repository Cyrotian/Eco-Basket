import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
  } from "react";
  import axios from "axios";
  import PropTypes from "prop-types";
  import { toast } from "react-toastify";
  
  // Create Context
  const NotificationContext = createContext();
  
  // Provider Component
  export const NotificationProvider = ({ children, options }) => {
    const [notifications, setNotifications] = useState([]);
    const prevNotificationsRef = useRef([]);
  
    const userId = localStorage.getItem("userid") || 1;
  
    const {
      position = "bottom-right",
      autoClose = 4000,
      toastStyle = {},
      showToast = true,
    } = options || {};
  
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("http://localhost:8080/notification", {
          params: { userId },
        });
        const data = response.data;
        
        console.log("Fetched notifications:", data);
        // Only show new UNREAD notifications
        const newNotifications = data.filter(
          (n) =>
            !prevNotificationsRef.current.some(
              (old) => old.notificationId === n.notificationId
            ) && n.status === "UNREAD"
        );
  
        if (showToast) {
          newNotifications.forEach((n) => {
            toast.info(n.content, {
              position,
              autoClose,
              toastId: `notif-${n.notificationId}`,
              style: toastStyle,
            });
          });
        }
  
        prevNotificationsRef.current = data;
  
        // Update notification state
        setNotifications(
          data.map((n) => ({
            ...n,
            read: n.status !== "UNREAD",
          }))
        );
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
  
    const markAllAsRead = async () => {
      try {
        await axios.put(`http://localhost:8080/notification/markAllRead`, {
          userId,
        });
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      } catch (error) {
        console.error("Error marking all as read:", error);
      }
    };
  
    const markAsRead = async (id) => {
      try {
        await axios.put(`http://localhost:8080/notification/${id}/read`, {
          status: "READ",
        });
        setNotifications((prev) =>
          prev.map((n) =>
            n.notificationId === id ? { ...n, read: true } : n
          )
        );
      } catch (error) {
        console.error("Error updating notification status:", error);
      }
    };
  
    useEffect(() => {
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 5000);
      return () => clearInterval(interval);
    }, []);
  
    return (
      <NotificationContext.Provider
        value={{
          notifications,
          markAllAsRead,
          markAsRead,
          fetchNotifications,
        }}
      >
        {children}
      </NotificationContext.Provider>
    );
  };
  
  // PropTypes validation
  NotificationProvider.propTypes = {
    children: PropTypes.node.isRequired,
    options: PropTypes.shape({
      position: PropTypes.string,
      autoClose: PropTypes.number,
      toastStyle: PropTypes.object,
      showToast: PropTypes.bool,
    }),
  };
  // Hook export
  export const useNotification = () => useContext(NotificationContext);
  
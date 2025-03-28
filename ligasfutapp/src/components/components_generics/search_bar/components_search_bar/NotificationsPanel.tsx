import React, { useState, useRef, useEffect } from 'react';
import { IoNotifications, IoMailOpen, IoClose, IoEllipse } from 'react-icons/io5';

const NotificationsPanel: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            user: "Congratulation Lettie 🎉",
            message: "Won the monthly best seller gold badge",
            time: "1h ago",
            avatar: "https://via.placeholder.com/150",
            read: false
        },
        {
            id: 2,
            user: "Charles Franklin",
            message: "Accepted your connection",
            time: "12h ago",
            avatar: null, // Example with initials
            initials: "CF",
            read: true
        },
        {
            id: 3,
            user: "New Message ✉️",
            message: "You have new message from Natalie",
            time: "1h ago",
            avatar: "https://via.placeholder.com/150",
            read: false
        },
        {
            id: 4,
            user: "Whoo! You have new order 🛒",
            message: "ACME Inc. made new order $1,154",
            time: "1 day ago",
            avatar: "https://via.placeholder.com/150",
            read: true
        }
    ]);

    const panelRef = useRef(null);

    const togglePanel = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (panelRef.current && !panelRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const markAsRead = (id) => {
        setNotifications(notifications.map(notification =>
            notification.id === id ? { ...notification, read: true } : notification
        ));
    };

    const markAsUnread = (id) => {
        setNotifications(notifications.map(notification =>
            notification.id === id ? { ...notification, read: false } : notification
        ));
    };

    const deleteNotification = (id) => {
        setNotifications(notifications.filter(notification => notification.id !== id));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    };

    return (
        <div className="relative" ref={panelRef}>
            <div
                className="rounded-full w-10 h-10 items-center flex justify-center hover:bg-gray-300 hover:cursor-pointer"
                onClick={togglePanel}
            >
                <IoNotifications className="w-6 xxs:w-8 h-6 xxs:h-8 text-gray-500 cursor-pointer" size={24} />
            </div>
            {isOpen && (
                <div className="absolute -right-12 xxxs:right-0 mt-2 w-[700%] sm590:w-[1200%] bg-white border rounded-lg shadow-lg">
                    <div className="flex items-center justify-between px-4 py-2 border-b">
                        <span className="font-semibold text-black">Notification</span>
                        <div className="flex items-center">
                            <span className="bg-[#e9e7fd] text-[#8176f2] text-xs font-semibold rounded-full px-2 py-1 mr-2">8 New</span>
                            <IoMailOpen className="text-gray-500 cursor-pointer" size={20} title="Mark all as read" onClick={markAllAsRead} />
                        </div>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                        {notifications.map((notification) => (
                            <div
                                key={notification.id}
                                className="flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer relative group"
                            >
                                {notification.avatar ? (
                                    <img
                                        src={notification.avatar}
                                        alt="avatar"
                                        className="w-10 h-10 rounded-full mr-3"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-gray-300 text-white flex items-center justify-center mr-3">
                                        {notification.initials}
                                    </div>
                                )}
                                <div className="flex-1">
                                    <div className="text-black text-xm font-semibold">{notification.user}</div>
                                    <div className="text-xm text-gray-500">{notification.message}</div>
                                    <div className="text-xs text-gray-400">{notification.time}</div>
                                </div>
                                <IoEllipse
                                    className={`absolute right-8 text-gray-400 ${notification.read ? 'opacity-0 text-gray-400' : 'text-[#8176f2] opacity-100'} group-hover:opacity-100 cursor-pointer`}
                                    size={12}
                                    onClick={() => notification.read ? markAsUnread(notification.id) : markAsRead(notification.id)}
                                    title={notification.read ? "Mark as unread" : "Mark as read"}
                                />
                                <IoClose
                                    className="absolute right-2 text-gray-400 hover:text-gray-600 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                                    size={18}
                                    onClick={() => deleteNotification(notification.id)}
                                    title="Delete notification"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="px-4 py-2 border-t">
                        <button className="w-full text-center bg-[#8176f2] text-white rounded-md py-2">View all notifications</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationsPanel;

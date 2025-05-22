import { useNotificationStore } from '../../stores/useNotificationStore';

const Notifications = () => {
  const { notifications, removeNotification } = useNotificationStore();

  return (
    <div className="notifications">
      {notifications.map((notification, index) => (
        <div key={index} className={`notification ${notification.type}`}>
          <p>{notification.message}</p>
          <button onClick={() => removeNotification(index)}>X</button>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
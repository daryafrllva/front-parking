import React, { useState, useEffect } from 'react';

const statusMap = {
  reserved: {
    text: 'забронировано',
    className: 'status--reserved',
  },
  confirmed: {
    text: 'подтверждено',
    className: 'status--confirmed',
  },
  occupied: {
    text: 'занято вашей машиной',
    className: 'status--occupied',
  },
};

function ReservantStatus() {
  const [status, setStatus] = useState('reserved');

  useEffect(() => {
    const statuses = ['reserved', 'confirmed', 'occupied'];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % statuses.length;
      setStatus(statuses[index]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`home__status-container ${statusMap[status].className}`}>
      <div className="status-text">
        Место: <span className="status-text__dynamic">{statusMap[status].text}</span>
      </div>
    </div>
  );
}

export default ReservantStatus;
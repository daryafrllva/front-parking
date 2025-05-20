import React, { useState, useEffect } from 'react';
import ParkingMap from '../assets/svg-sprite/parkingmap.svg';
import road from '../assets/png/road.png';
import ramp from '../assets/png/ramp.png';

const LEVELS = [
  { label: '1 уровень', letter: 'A' },
  { label: '2 уровень', letter: 'B' },
  { label: '3 уровень', letter: 'C' },
];

// СТАТУСЫ: free (желтый), occupied (черный), disabled (белый), reserved (красный), selected (оранжевый)
function getSpots(levelLetter) {
  // Массивы индексов для черных (занятых) и недоступных мест
  const occupiedRow1 = [2, 5]; // например, 3 и 6 место в первом ряду (индексы с 0)
  const occupiedRow2 = [1, 7]; // например, 2 и 8 место во втором ряду
  const occupiedRow3 = [4];    // например, 5 место в третьем ряду
  const occupiedRow4 = [10, 12]; // например, 11 и 13 место в четвертом ряду

  const disabledRow1 = [11]; // например, 12 место в первом ряду

  return [
    // 1 ряд: 14 мест
    ...Array.from({ length: 14 }, (_, i) => ({
      row: 1,
      col: i < 7 ? i + 1 : i + 3,
      name: `${levelLetter}${i + 1}`,
      status: occupiedRow1.includes(i)
        ? 'occupied'
        : disabledRow1.includes(i)
        ? 'disabled'
        : 'free'
    })),
    // 2 ряд: 11 мест
    ...Array.from({ length: 11 }, (_, i) => ({
      row: 2,
      col: i + 3,
      name: `${levelLetter}${i + 15}`,
      status: occupiedRow2.includes(i) ? 'occupied' : 'disabled'
    })),
    // 3 ряд: 11 мест (по умолчанию disabled, но один occupied)
    ...Array.from({ length: 11 }, (_, i) => ({
      row: 3,
      col: i + 3,
      name: `${levelLetter}${i + 26}`,
      status: occupiedRow3.includes(i) ? 'free' : 'disabled'
    })),
    // 4 ряд: 14 мест (по умолчанию disabled, но два occupied)
    ...Array.from({ length: 14 }, (_, i) => ({
      row: 4,
      col: i < 2 ? i + 1 : i + 2,
      name: `${levelLetter}${i + 37}`,
      status: occupiedRow4.includes(i) ? 'occupied' : 'free'
    })),
  ];
}
function ParkingSpot({ name, status, row, col, onClick, isSelected }) {
  return (
    <div
      className={`parking-spot parking-spot--${status}${isSelected ? ' parking-spot--selected' : ''}`}
      style={{
        gridRow: row,
        gridColumn: col,
      }}
      onClick={status === 'free' ? onClick : undefined}
    >
      {name}
    </div>
  );
}

function ParkingLevelSwitcher({ level, setLevel }) {
  return (
    <div className="level-switcher">
      <button
        className="level-arrow"
        onClick={() => setLevel((prev) => Math.max(0, prev - 1))}
        disabled={level === 0}
      >
        ▲
      </button>
      <div className="level-label">{LEVELS[level].label}</div>
      <button
        className="level-arrow"
        onClick={() => setLevel((prev) => Math.min(LEVELS.length - 1, prev + 1))}
        disabled={level === LEVELS.length - 1}
      >
        ▼
      </button>
    </div>
  );
}

function ParkingPage() {
  const [selected, setSelected] = useState(null);
  const [level, setLevel] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [reserved, setReserved] = useState(() => {
    return localStorage.getItem('reservedSpot') || null;
  });
  const [successModal, setSuccessModal] = useState(false);

  // Новые состояния для снятия брони и режима просмотра
    const [viewOnly, setViewOnly] = useState(() => {
    const stored = localStorage.getItem('viewOnly');
    return stored === 'true';
  });
  const [unreserveConfirmModal, setUnreserveConfirmModal] = useState(false);
  const [unreserveSuccessModal, setUnreserveSuccessModal] = useState(false);

  useEffect(() => {
    if (reserved) {
      localStorage.setItem('reservedSpot', reserved);
    } else {
      localStorage.removeItem('reservedSpot');
    }
  }, [reserved]);

  useEffect(() => {
    localStorage.setItem('viewOnly', viewOnly);
  }, [viewOnly]);

  // Места: если viewOnly, все кроме reserved — disabled
  const spots = getSpots(LEVELS[level].letter).map(spot => {
    if (viewOnly && spot.name !== reserved) {
      return { ...spot, status: 'disabled', isSelected: false };
    }
    if (spot.name === reserved) {
      return { ...spot, status: 'reserved', isSelected: false };
    }
    if (spot.name === selected) {
      return { ...spot, isSelected: true };
    }
    return { ...spot, isSelected: false };
  });

  const handleReserve = () => {
    setReserved(selected);
    setModalOpen(false);
    setTimeout(() => setSuccessModal(true), 200);
  };

  // После "Посмотреть" — только просмотр
  const handleSuccessClose = () => {
    setSuccessModal(false);
    setSelected(null);
    setViewOnly(true);
  };

  // Открыть подтверждение снятия брони
  const handleUnreserveClick = () => {
    setUnreserveConfirmModal(true);
  };

  // Снять бронь (после подтверждения)
  const handleUnreserve = () => {
    setUnreserveConfirmModal(false);
    setTimeout(() => {
      setUnreserveSuccessModal(true);
      setReserved(null);
    }, 200);
  };

  // После успешного снятия брони — вернуть всё в начальное состояние
  const handleUnreserveSuccessClose = () => {
    setUnreserveSuccessModal(false);
    setViewOnly(false);
    setSelected(null);
  };

  return (
    <div className="parking-page-bg">
      <div className="parking-page__container">
        <div style={{ width: '100%', textAlign: 'center', marginBottom: 16, fontWeight: 600, fontSize: 18 }}>
          <p className='container-text'>Выберите парковочное место:</p>
        </div>
        <div className="parking-map-container">
          <ParkingLevelSwitcher level={level} setLevel={setLevel} />
          <img src={ParkingMap} alt="Map" className="parking-map-img" />
          <div className="parking-spots-grid">
            {spots.map((spot) => (
              <ParkingSpot
                key={spot.name}
                {...spot}
                onClick={() => setSelected(spot.name)}
              />
            ))}
          </div>
        </div>
        {/* Легенда и кнопка */}
        <div className="parking-bottom-block">
          <div className="parking-bottom-left">
            <div className="parking-legend">
              {!viewOnly ? (
                <>
                  <div className="legend-item">
                    <span className="legend-dot legend-dot--free" /> — свободное место Т-банка
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot legend-dot--occupied" /> — занятое место Т-банка
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot legend-dot--disabled" /> — недоступно для брони
                  </div>
                </>
              ) : (
                <>
                  <div className="legend-item">
                    <span className="legend-dot legend-dot--reserved" /> — ваше место
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot legend-dot--disabled" /> — посторонние места
                  </div>
                </>
              )}
            </div>
          </div>
          {!viewOnly ? (
            <button
              className="parking-select-btn"
              onClick={() => setModalOpen(true)}
              disabled={!selected || spots.find(s => s.name === selected)?.status === 'reserved'}
            >
              Выбрать
            </button>
          ) : (
            <button
              className="parking-select-btn"
              style={{ background: "#ffe066", color: "#222" }}
              onClick={handleUnreserveClick}
            >
              Снять бронь
            </button>
          )}
          <div className="parking-bottom-right">
            <div className="parking-legend">
              <div className="legend-item legend-item--road">
                <img src={road} alt="Проезжая часть" className="legend-img" /> — проезжая часть
              </div>
              <div className="legend-item legend-item--ramp">
                <img src={ramp} alt="Рампа/заезд" className="legend-img" /> — рампа/заезд
              </div>
            </div>
          </div>
        </div>
        <a
          href="mailto:support@tbank.ru"
          className="parking-support-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Техподдержка
        </a>
        {/* Модальное окно подтверждения */}
        {modalOpen && (
          <div className="parking-modal">
            <div className="parking-modal__content">
              <button className="parking-modal__close" onClick={() => setModalOpen(false)}>×</button>
              <div className="parking-modal__title">
                Вы точно хотите забронировать место?
              </div>
              <div className="parking-modal__warn">
                <span className="parking-modal__warn-icon">!</span>
                <span className="parking-modal__warn-text">
                  Другие сотрудники не смогут припарковаться на данное место
                </span>
                <span className="parking-modal__warn-icon">!</span>
              </div>
              <button
                className="parking-modal__btn"
                onClick={handleReserve}
              >
                Забронировать
              </button>
              <a
                href="mailto:support@tbank.ru"
                className="parking-modal__support"
                target="_blank"
                rel="noopener noreferrer"
              >
                Техподдержка
              </a>
            </div>
          </div>
        )}
        {/* Модальное окно успеха */}
        {successModal && (
          <div className="parking-modal">
            <div className="parking-modal__content" style={{ background: "#555"}}>
              <button className="parking-modal__close" onClick={handleSuccessClose}>×</button>
              <div style={{
                fontSize: 22,
                fontWeight: 600,
                color: "#fff",
                textAlign: "center",
                margin: "60px 0 40px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12
              }}>
                Место {reserved} успешно забронировано
                <span style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#ffe066",
                  color: "#222",
                  borderRadius: "50%",
                  width: 32,
                  height: 32,
                  fontSize: 22,
                  fontWeight: 700,
                  marginLeft: 4
                }}>✓</span>
              </div>
              <button
                className="parking-modal__btn"
                style={{ background: "#ffe066", color: "#222" }}
                onClick={handleSuccessClose}
              >
                Посмотреть
              </button>
              <a
                href="mailto:support@tbank.ru"
                className="parking-modal__support"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#d6d6ff", textDecoration: "underline", marginTop: 20 }}
              >
                Техподдержка
              </a>
            </div>
          </div>
        )}
        {/* Модальное окно подтверждения снятия брони */}
        {unreserveConfirmModal && (
          <div className="parking-modal">
            <div className="parking-modal__content">
              <button className="parking-modal__close" onClick={() => setUnreserveConfirmModal(false)}>×</button>
              <div className="parking-modal__title">
                Вы точно хотите снять бронь на место?
              </div>
              <div className="parking-modal__warn">
                <span className="parking-modal__warn-icon">!</span>
                <span className="parking-modal__warn-text">
                  Другие сотрудники будут видеть место доступным и смогут его бронировать
                </span>
                <span className="parking-modal__warn-icon">!</span>
              </div>
              <button
                className="parking-modal__btn"
                onClick={handleUnreserve}
              >
                Снять бронь
              </button>
              <a
                href="mailto:support@tbank.ru"
                className="parking-modal__support"
                target="_blank"
                rel="noopener noreferrer"
              >
                Техподдержка
              </a>
            </div>
          </div>
        )}
        {/* Модальное окно успешного снятия брони */}
        {unreserveSuccessModal && (
          <div className="parking-modal">
            <div className="parking-modal__content" style={{ background: "#555" }}>
              <button className="parking-modal__close" onClick={handleUnreserveSuccessClose}>×</button>
              <div style={{
                fontSize: 22,
                fontWeight: 600,
                color: "#fff",
                textAlign: "center",
                margin: "60px 0 40px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12
              }}>
                Место {reserved} успешно снято с брони
                <span style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#ffe066",
                  color: "#222",
                  borderRadius: "50%",
                  width: 32,
                  height: 32,
                  fontSize: 22,
                  fontWeight: 700,
                  marginLeft: 4
                }}>✓</span>
              </div>
              <button
                className="parking-modal__btn"
                style={{ background: "#ffe066", color: "#222" }}
                onClick={handleUnreserveSuccessClose}
              >
                Отмена
              </button>
              <a
                href="mailto:support@tbank.ru"
                className="parking-modal__support"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#d6d6ff", textDecoration: "underline", marginTop: 20 }}
              >
                Техподдержка
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ParkingPage;
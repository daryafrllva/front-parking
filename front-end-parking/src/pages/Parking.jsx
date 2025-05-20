import React, { useState } from 'react';
import ParkingMap from '../assets/svg-sprite/parkingmap.svg';
import road from '../assets/png/road.png';
import ramp from '../assets/png/ramp.png';


const LEVELS = [
  { label: '1 уровень', letter: 'A' },
  { label: '2 уровень', letter: 'B' },
  { label: '3 уровень', letter: 'C' },
];

function getSpots(levelLetter) {
  return [
    // Первый ряд: 14 мест (A1–A14), пробел между 7 и 8
    ...Array.from({ length: 14 }, (_, i) => ({
      row: 1,
      col: i < 7 ? i + 1 : i + 3,
      name: `${levelLetter}${i + 1}`,
      status: 'free'
    })),
    // Второй ряд: 11 мест (A15–A25)
    ...Array.from({ length: 11 }, (_, i) => ({
      row: 2,
      col: i + 3,
      name: `${levelLetter}${i + 15}`,
      status: 'free'
    })),
    // Третий ряд: 11 мест (A26–A36)
    ...Array.from({ length: 11 }, (_, i) => ({
      row: 3,
      col: i + 3,
      name: `${levelLetter}${i + 26}`,
      status: 'free'
    })),
    // Четвертый ряд: 14 мест (A37–A50), пробел между 38 и 39
    ...Array.from({ length: 14 }, (_, i) => ({
      row: 4,
      col: i < 2 ? i + 1 : i + 2,
      name: `${levelLetter}${i + 37}`,
      status: 'free'
    })),
  ];
}

function ParkingSpot({ name, status, row, col, onClick }) {
  return (
    <div
      className={`parking-spot parking-spot--${status}`}
      style={{
        gridRow: row,
        gridColumn: col,
      }}
      onClick={onClick}
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

// --- Легенда и кнопка ---
function ParkingLegend() {
  return (
    <div className="parking-legend">
      <div className="legend-item">
        <span className="legend-dot legend-dot--free" /> — свободное место Т-банка
      </div>
      <div className="legend-item">
        <span className="legend-dot legend-dot--occupied" /> — занятое место Т-банка
      </div>
      <div className="legend-item">
        <span className="legend-dot legend-dot--disabled" /> — недоступно для брони
      </div>
      <div className="legend-item legend-item--road">
        <span className="legend-line" /> — проезная часть
      </div>
      <div className="legend-item legend-item--ramp">
        <span className="legend-ramp" /> — рампа/заезд
      </div>
    </div>
  );
}

function ParkingPage() {
  const [selected, setSelected] = useState(null);
  const [level, setLevel] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const spots = getSpots(LEVELS[level].letter);

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
                <div className="legend-item">
                  <span className="legend-dot legend-dot--free" /> — свободное место Т-банка
                </div>
                <div className="legend-item">
                  <span className="legend-dot legend-dot--occupied" /> — занятое место Т-банка
                </div>
                <div className="legend-item">
                  <span className="legend-dot legend-dot--disabled" /> — недоступно для брони
                </div>
              </div>
            </div>
            <button
              className="parking-select-btn"
              onClick={() => setModalOpen(true)}
            >
              Выбрать
            </button>
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
        {/* Модальное окно (пример) */}
        {modalOpen && (
          <div className="parking-modal">
            <div className="parking-modal__content">
              <button className="parking-modal__close" onClick={() => setModalOpen(false)}>×</button>
              <div>Здесь будет ваша модалка</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ParkingPage;
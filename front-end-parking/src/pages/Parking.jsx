import React, { useState } from 'react';

// 12 колонок, 7 рядов (примерно как на картинке выше)
const spots = [
  // Верхний ряд (ряд 1)
  ...Array.from({ length: 12 }, (_, i) => ({
    row: 1,
    col: i + 1,
    name: `A${i + 1}`,
    status: i === 2 ? 'reserved': i === 7 || i === 8 ? 'occupied' : 'free'
  })),

  // Второй ряд (ряд 2) — только угловые места
  { row: 2, col: 1, name: 'A13', status: 'free' },
  { row: 2, col: 12, name: 'A14', status: 'free' },

  // Центральные ряды (ряды 3, 4, 5) — 6 мест в каждом ряду, по центру
  ...Array.from({ length: 6 }, (_, i) => ({
    row: 3,
    col: i + 4,
    name: `B${i + 1}`,
    status: i === 2 ? 'reserved' : 'free'
  })),
  ...Array.from({ length: 6 }, (_, i) => ({
    row: 4,
    col: i + 4,
    name: `B${i + 7}`,
    status: i === 3 ? 'occupied' : 'free'
  })),
  ...Array.from({ length: 6 }, (_, i) => ({
    row: 5,
    col: i + 4,
    name: `C${i + 1}`,
    status: i === 1 || i === 4 ? 'reserved' : i === 3 ? 'occupied' : 'free'
  })),

  // Нижний ряд (ряд 7)
  ...Array.from({ length: 12 }, (_, i) => ({
    row: 7,
    col: i + 1,
    name: `C${i + 7}`,
    status: i === 5 ? 'reserved' : 'free'
  })),
];

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

function ParkingPage() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="parking-page-bg">
      <div className="parking-page__container">
        <div style={{ width: '100%', textAlign: 'center', marginBottom: 16, fontWeight: 600, fontSize: 18 }}>
          Выберите парковочное место:
        </div>
        <div
          className="parking-map-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 56px)',
            gridTemplateRows: 'repeat(7, 90px)',
            gap: '16px',
            background: 'none',
            boxShadow: 'none',
            padding: 0,
            margin: '0 auto'
          }}
        >
          {spots.map(spot => (
            <ParkingSpot
              key={spot.name}
              {...spot}
              status={selected === spot.name ? 'selected' : spot.status}
              onClick={() => setSelected(spot.name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ParkingPage;
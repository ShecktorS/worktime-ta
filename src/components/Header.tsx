import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-6">
      <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-white to-pink-300 bg-clip-text text-transparent drop-shadow-lg">
        Worktime T.A.
      </h1>
      <p className="text-lg opacity-90 font-light tracking-widest">
        Gestione Avanzata Orari di Lavoro
      </p>
    </header>
  );
};

export default Header;
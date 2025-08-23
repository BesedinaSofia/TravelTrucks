import React from 'react';
import '../styles/Filters.css';

const Filters = () => {
  return (
    <div className="filters-container">
      <div className="location">
        <label>Location</label>
        <input type="text" defaultValue="Kyiv, Ukraine" readOnly />
      </div>

      <div className="filter-section">
        <h3>Vehicle equipment</h3>
        <div className="equipment-options">
          <button className="equipment-btn active">AC</button>
          <button className="equipment-btn">Automatic</button>
          <button className="equipment-btn">Kitchen</button>
          <button className="equipment-btn">TV</button>
          <button className="equipment-btn">Bathroom</button>
        </div>
      </div>

      <div className="filter-section">
        <h3>Vehicle type</h3>
        <div className="vehicle-options">
          <button className="vehicle-btn">Van</button>
          <button className="vehicle-btn">Fully Integrated</button>
          <button className="vehicle-btn">Alcove</button>
        </div>
      </div>

      <button className="search-btn">Search</button>
    </div>
  );
};

export default Filters;
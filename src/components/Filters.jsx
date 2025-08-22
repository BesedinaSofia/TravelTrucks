// import styled from 'styled-components';

// const Form = styled.form`
//   padding: 20px;
//   display: flex;
//   gap: 10px;
// `;

// function Filters({ location, type, features, onLocationChange, onTypeChange, onFeatureToggle }) {
//   return (
//     <Form>
//       <input
//         type="text"
//         value={location}
//         onChange={(e) => onLocationChange(e.target.value)}
//         placeholder="Enter location"
//       />
//       <select value={type} onChange={(e) => onTypeChange(e.target.value)}>
//         <option value="">Select type</option>
//         <option value="van">Van</option>
//         <option value="fullyIntegrated">Fully Integrated</option>
//         <option value="alcove">Alcove</option>
//       </select>
//       <label>
//         <input
//           type="checkbox"
//           checked={features.AC}
//           onChange={() => onFeatureToggle('AC')}
//         />
//         AC
//       </label>
//       <label>
//         <input
//           type="checkbox"
//           checked={features.kitchen}
//           onChange={() => onFeatureToggle('kitchen')}
//         />
//         Kitchen
//       </label>
//       <label>
//         <input
//           type="checkbox"
//           checked={features.TV}
//           onChange={() => onFeatureToggle('TV')}
//         />
//         TV
//       </label>
//       <label>
//         <input
//           type="checkbox"
//           checked={features.bathroom}
//           onChange={() => onFeatureToggle('bathroom')}
//         />
//         Bathroom
//       </label>
//     </Form>
//   );
// }

// export default Filters;

import styled from 'styled-components';

const Form = styled.form`
  padding: 20px;
  display: flex;
  gap: 10px;
`;

function Filters({ location, type, features, onLocationChange, onTypeChange, onFeatureToggle, onApplyFilters }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onApplyFilters();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <input
        type="text"
        value={location}
        onChange={(e) => onLocationChange(e.target.value)}
        placeholder="Enter location"
      />
      <select value={type} onChange={(e) => onTypeChange(e.target.value)}>
        <option value="">Select type</option>
        <option value="van">Van</option>
        <option value="fullyIntegrated">Fully Integrated</option>
        <option value="alcove">Alcove</option>
      </select>
      <label>
        <input
          type="checkbox"
          checked={features.AC}
          onChange={() => onFeatureToggle('AC')}
        />
        AC
      </label>
      <label>
        <input
          type="checkbox"
          checked={features.kitchen}
          onChange={() => onFeatureToggle('kitchen')}
        />
        Kitchen
      </label>
      <label>
        <input
          type="checkbox"
          checked={features.TV}
          onChange={() => onFeatureToggle('TV')}
        />
        TV
      </label>
      <label>
        <input
          type="checkbox"
          checked={features.bathroom}
          onChange={() => onFeatureToggle('bathroom')}
        />
        Bathroom
      </label>
      <button type="submit" style={{ cursor: 'pointer' }}>
        Apply Filters
      </button>
    </Form>
  );
}

export default Filters;
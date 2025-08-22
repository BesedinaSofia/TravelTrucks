import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Banner = styled.div`
  text-align: center;
  padding: 50px;
  background: #f0f0f0;
`;

function HomePage() {
  return (
    <Banner>
      <h1>Welcome to TravelTrucks</h1>
      <p>Rent your dream camper today!</p>
      <Link to="/catalog">
        <button style={{ cursor: 'pointer' }}>View Now</button>
      </Link>
    </Banner>
  );
}

export default HomePage;
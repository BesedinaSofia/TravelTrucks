import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../redux/favoritesSlice';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
`;

function CamperCard({ camper }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);

  return (
    <Card>
      <img src={camper.gallery[0]} alt={camper.name} width="100%" />
      <h3>{camper.name}</h3>
      <p>Price: {camper.price.toFixed(2)}</p>
      <button onClick={() => dispatch(toggleFavorite(camper.id))} style={{ cursor: 'pointer' }}>
        {favorites.includes(camper.id) ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
      <Link to={`/catalog/${camper.id}`} target="_blank">
        <button style={{ cursor: 'pointer' }}>Show More</button>
      </Link>
    </Card>
  );
}

export default CamperCard; // Дефолтний експорт
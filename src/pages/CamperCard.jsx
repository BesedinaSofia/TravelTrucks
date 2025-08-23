import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../redux/favoritesSlice';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.div`
  border: 2px solid red;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #fff;
  min-height: 300px;
`;

const CamperImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border: 1px solid #ddd;
  display: block;
  background-color: #f0f0f0;
`;

function CamperCard({ camper }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);

  const imageUrl =
    camper?.gallery && camper.gallery.length > 0 && camper.gallery[0].original
      ? camper.gallery[0].original
      : 'https://picsum.photos/200/300';

  return (
    <Card>
      <CamperImage
        src={imageUrl}
        alt={camper?.name || 'Camper'}
        onError={(e) => (e.target.src = 'https://picsum.photos/200/300')}
      />
      <h3>{camper?.name || 'No name'}</h3>
      <p>Price: {(camper?.price || 0).toFixed(2)}</p>
      <button
        onClick={() => dispatch(toggleFavorite(camper?.id))}
        style={{ cursor: 'pointer' }}
      >
        {favorites.includes(camper?.id) ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
      <Link to={`/catalog/${camper?.id}`} target="_blank">
        <button style={{ cursor: 'pointer' }}>Show More</button>
      </Link>
    </Card>
  );
}

export default CamperCard;


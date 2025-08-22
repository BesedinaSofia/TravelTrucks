import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../redux/favoritesSlice';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.div`
  border: 2px solid red; /* Яскрава рамка для видимості */
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
  background-color: #f0f0f0; /* Сірий фон для видимості */
`;

function CamperCard({ camper }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);

  const placeholderImage = 'https://picsum.photos/200/300';

  // Дебагінг
  console.log('CamperCard rendering with camper:', JSON.stringify(camper, null, 2));
  if (camper?.gallery && Array.isArray(camper.gallery)) {
    console.log('CamperCard gallery length:', camper.gallery.length);
    camper.gallery.forEach((item, index) => {
      console.log(`CamperCard gallery[${index}] structure:`, JSON.stringify(item, null, 2));
      console.log(`CamperCard gallery[${index}].original type:`, typeof item.original);
      console.log(`CamperCard gallery[${index}].original value:`, item.original);
    });
  } else {
    console.warn('CamperCard gallery is invalid:', camper?.gallery);
  }

  // Перевірка валідності URL
  let imageUrl = placeholderImage;
  if (camper?.gallery && Array.isArray(camper.gallery) && camper.gallery[0]?.original && typeof camper.gallery[0].original === 'string') {
    imageUrl = camper.gallery[0].original;
    console.log('CamperCard setting imageUrl:', imageUrl);
  } else {
    console.warn('CamperCard no valid original URL found:', camper?.gallery?.[0]);
  }

  return (
    <Card>
      <CamperImage
        src={imageUrl}
        alt={camper?.name || 'Camper'}
        onError={(e) => {
          console.error('Image failed to load in CamperCard:', imageUrl, e.message);
          e.target.src = placeholderImage;
        }}
        onLoad={() => console.log('Image loaded successfully:', imageUrl)}
      />
      <h3>{camper?.name || 'No name'}</h3>
      <p>Price: {(camper?.price || 0).toFixed(2)}</p>
      <button onClick={() => dispatch(toggleFavorite(camper?.id))} style={{ cursor: 'pointer' }}>
        {favorites.includes(camper?.id) ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
      <Link to={`/catalog/${camper?.id}`} target="_blank">
        <button style={{ cursor: 'pointer' }}>Show More</button>
      </Link>
    </Card>
  );
}

export default CamperCard;
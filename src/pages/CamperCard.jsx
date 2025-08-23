import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../redux/favoritesSlice';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.div`
  display: flex;
  gap: 24px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 24px;
  align-items: flex-start;
`;

const CamperImage = styled.img`
  width: 290px;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
  flex-shrink: 0;
  background-color: #f0f0f0;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #101828;
`;

const Price = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #101828;
`;

const Description = styled.p`
  font-size: 14px;
  color: #667085;
  margin: 12px 0 16px;
  line-height: 1.4;
`;

const Features = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
`;

const FeatureBadge = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #344054;
  background: #f2f4f7;
  padding: 8px 14px;
  border-radius: 50px;
`;

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 200px;
  background: #e44848;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #d22f2f;
  }
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
      <Content>
        <Header>
          <Title>{camper?.name || 'No name'}</Title>
          <Price>€{(camper?.price || 0).toFixed(2)}</Price>
        </Header>
        <Description>{camper?.description || 'No description available.'}</Description>
        <Features>
          <FeatureBadge>⚙️ Automatic</FeatureBadge>
          <FeatureBadge>❄️ AC</FeatureBadge>
          <FeatureBadge>🍳 Kitchen</FeatureBadge>
        </Features>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button onClick={() => dispatch(toggleFavorite(camper?.id))}>
            {favorites.includes(camper?.id) ? 'Remove from Favorites' : 'Add to Favorites'}
          </Button>
          <Link to={`/catalog/${camper?.id}`} target="_blank">
            <Button>Show More</Button>
          </Link>
        </div>
      </Content>
    </Card>
  );
}

export default CamperCard;

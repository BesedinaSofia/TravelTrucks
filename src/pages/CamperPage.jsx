import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCamperById } from '../redux/campersSlice';
import BookingForm from '../components/BookingForm';
import Loader from '../components/Loader';
import styled from 'styled-components';

const DetailsContainer = styled.div`
  padding: 20px;
  display: flex;
  gap: 20px;
`;

const Gallery = styled.div`
  img {
    width: 300px;
    height: 200px;
    object-fit: cover;
    margin-bottom: 10px;
    border: 1px solid #ddd;
  }
`;

const Details = styled.div`
  flex: 1;
`;

const Reviews = styled.div`
  margin-top: 20px;
`;

function CamperPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedCamper, loading, error } = useSelector((state) => state.campers); 

  useEffect(() => {
    console.log('Fetching camper with id:', id);
    dispatch(fetchCamperById(id));
  }, [dispatch, id]);

  if (loading) return <Loader />;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;
  if (!selectedCamper) return <div>Camper not found (ID: {id})</div>;

  const placeholderImage = 'https://picsum.photos/200/300';

  const features = [
    { name: 'Transmission', value: selectedCamper.transmission },
    { name: 'Engine', value: selectedCamper.engine },
    { name: 'AC', value: selectedCamper.AC ? 'Yes' : 'No' },
    { name: 'Bathroom', value: selectedCamper.bathroom ? 'Yes' : 'No' },
    { name: 'Kitchen', value: selectedCamper.kitchen ? 'Yes' : 'No' },
    { name: 'TV', value: selectedCamper.TV ? 'Yes' : 'No' },
    { name: 'Radio', value: selectedCamper.radio ? 'Yes' : 'No' },
    { name: 'Refrigerator', value: selectedCamper.refrigerator ? 'Yes' : 'No' },
    { name: 'Microwave', value: selectedCamper.microwave ? 'Yes' : 'No' },
    { name: 'Gas', value: selectedCamper.gas ? 'Yes' : 'No' },
    { name: 'Water', value: selectedCamper.water ? 'Yes' : 'No' },
  ].filter((f) => f.value);

  const details = [
    { name: 'Form', value: selectedCamper.form },
    { name: 'Length', value: selectedCamper.length },
    { name: 'Width', value: selectedCamper.width },
    { name: 'Height', value: selectedCamper.height },
    { name: 'Tank', value: selectedCamper.tank },
    { name: 'Consumption', value: selectedCamper.consumption },
  ].filter((d) => d.value);

  return (
    <DetailsContainer>
      <Gallery>
        {selectedCamper.gallery && Array.isArray(selectedCamper.gallery) && selectedCamper.gallery.length > 0 ? (
          selectedCamper.gallery.map((img, index) => (
            <img
              key={index}
              src={img.original || placeholderImage}
              alt={`${selectedCamper.name} photo ${index + 1}`}
              onError={(e) => {
                console.error('Image failed to load:', img.original, e.message);
                e.target.src = placeholderImage;
              }}
            />
          ))
        ) : (
          <img src={placeholderImage} alt="Placeholder" />
        )}
      </Gallery>
      <Details>
        <h1>{selectedCamper.name || 'No name'}</h1>
        <p>Price: {(selectedCamper.price || 0).toFixed(2)}</p>
        <h3>Features:</h3>
        <ul>
          {features.map((f, index) => (
            <li key={index}>{f.name}: {f.value}</li>
          ))}
        </ul>
        <h3>Details:</h3>
        <ul>
          {details.map((d, index) => (
            <li key={index}>{d.name}: {d.value}</li>
          ))}
        </ul>
        <BookingForm camperId={selectedCamper.id} />
        <Reviews>
          <h3>Reviews:</h3>
          <ul>
            {selectedCamper.reviews && Array.isArray(selectedCamper.reviews) && selectedCamper.reviews.length > 0 ? (
              selectedCamper.reviews.map((review, index) => (
                <li key={index}>
                  <strong>{review.reviewer_name}</strong> ({review.reviewer_rating}/5): {review.comment}
                </li>
              ))
            ) : (
              <li>No reviews available</li>
            )}
          </ul>
        </Reviews>
      </Details>
    </DetailsContainer>
  );
}

export default CamperPage;
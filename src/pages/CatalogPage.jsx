// import React from 'react';
// import { useEffect, useRef } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchCampers } from '../redux/campersSlice';
// import { setLocation, setType, toggleFeature, incrementPage, resetFilters } from '../redux/filtersSlice';
// import CamperCard from '../components/CamperCard';
// import Filters from '../components/Filters';
// import Loader from '../components/Loader';
// import styled from 'styled-components';

// const Container = styled.div`
//   padding: 20px;
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
//   gap: 20px;
// `;

// class ErrorBoundary extends React.Component {
//   state = { hasError: false, error: null };

//   static getDerivedStateFromError(error) {
//     return { hasError: true, error };
//   }

//   componentDidCatch(error, errorInfo) {
//     console.error('ErrorBoundary caught error:', error, errorInfo);
//   }

//   render() {
//     if (this.state.hasError) {
//       return <div style={{ color: 'red' }}>Something went wrong: {this.state.error.message}</div>;
//     }
//     return this.props.children;
//   }
// }

// function CatalogPage() {
//   const dispatch = useDispatch();
//   const { items, loading, error } = useSelector((state) => state.campers);
//   const { location, type, features, page, limit } = useSelector((state) => state.filters);
//   const isInitialRender = useRef(true);

//   useEffect(() => {
//     if (isInitialRender.current) {
//       dispatch(fetchCampers({ page, limit, location, type, ...features }))
//         .then(() => console.log('FetchCampers completed'))
//         .catch((err) => console.error('FetchCampers error:', err));
//       isInitialRender.current = false;
//     }
//   }, [dispatch, page, limit, location, type, features]);

//   useEffect(() => {
//     console.log('CatalogPage items updated:', items);
//   }, [items]);

//   const handleLoadMore = () => {
//     dispatch(incrementPage());
//     dispatch(fetchCampers({ page, limit, location, type, ...features }));
//   };

//   const handleFilterChange = () => {
//     dispatch(resetFilters());
//     dispatch(fetchCampers({ page: 1, limit, location, type, ...features }));
//   };

//   console.log('CatalogPage items:', items);
//   items?.forEach((camper, index) => {
//     console.log(`CatalogPage camper ${index + 1} before render:`, JSON.stringify(camper, null, 2));
//     console.log(`CatalogPage camper ${index + 1} gallery before render:`, JSON.stringify(camper?.gallery, null, 2));
//   });

//   if (loading) return <Loader />;
//   if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

//   return (
//     <div>
//       <Filters
//         location={location}
//         type={type}
//         features={features}
//         onLocationChange={(value) => dispatch(setLocation(value))}
//         onTypeChange={(value) => dispatch(setType(value))}
//         onFeatureToggle={(feature) => dispatch(toggleFeature(feature))}
//         onApplyFilters={handleFilterChange}
//       />
//       <Container>
//         {items && items.length > 0 ? (
//           items.map((camper, index) => {
//             console.log(`Rendering CamperCard for camper ${index + 1}:`, JSON.stringify(camper, null, 2)); // Дебагінг
//             return (
//               <ErrorBoundary key={camper?.id || `error-${index}`}>
//                 <CamperCard
//                   key={camper?.id || `camper-${index}`} // Уникнення дублювання ключів
//                   camper={camper || {}} // Захист від undefined
//                 />
//               </ErrorBoundary>
//             );
//           })
//         ) : (
//           <div>No campers found</div>
//         )}
//       </Container>
//       {items && items.length >= page * limit && (
//         <button onClick={handleLoadMore} style={{ cursor: 'pointer' }}>
//           Load More
//         </button>
//       )}
//     </div>
//   );
// }

// export default CatalogPage;

import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCampers } from '../redux/campersSlice';
import { setLocation, setType, toggleFeature, incrementPage, resetFilters } from '../redux/filtersSlice';
import CamperCard from '../components/CamperCard';
import Filters from '../components/Filters';
import Loader from '../components/Loader';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const LoadMoreButton = styled.button`
  padding: 10px 20px;
  margin: 20px auto;
  display: block;
  cursor: pointer;
`;

function CatalogPage() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.campers);
  const { location, type, features, page, limit } = useSelector((state) => state.filters);
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      dispatch(fetchCampers({ page, limit, location, type, ...features }))
        .then(() => console.log('FetchCampers completed'))
        .catch((err) => console.error('FetchCampers error:', err));
      isInitialRender.current = false;
    }
  }, [dispatch, page, limit, location, type, features]);

  const handleLoadMore = () => {
    dispatch(incrementPage());
    dispatch(fetchCampers({ page: page + 1, limit, location, type, ...features }));
  };

  const handleFilterChange = () => {
    dispatch(resetFilters());
    dispatch(fetchCampers({ page: 1, limit, location, type, ...features }));
  };

  if (loading) return <Loader />;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div>
      <Filters
        location={location}
        type={type}
        features={features}
        onLocationChange={(value) => dispatch(setLocation(value))}
        onTypeChange={(value) => dispatch(setType(value))}
        onFeatureToggle={(feature) => dispatch(toggleFeature(feature))}
        onApplyFilters={handleFilterChange}
      />
      <Container>
        {items && items.length > 0 ? (
          items.map((camper) => (
            <CamperCard key={camper.id} camper={camper} />
          ))
        ) : (
          <div>No campers found</div>
        )}
      </Container>
      {items && items.length >= page * limit && (
        <LoadMoreButton onClick={handleLoadMore}>Load More</LoadMoreButton>
      )}
    </div>
  );
}

export default CatalogPage;
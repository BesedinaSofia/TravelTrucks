import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCampers } from "../redux/campersSlice";
import { setLocation, setType, toggleFeature, incrementPage, resetFilters } from "../redux/filtersSlice";
import CamperCard from "../pages/CamperCard";
import Filters from "../components/Filters";
import Loader from '../components/Loader';

import '../styles/Catalog.css';

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
    <div className="page-wrapper">
      <aside className="sidebar">
        <Filters
          location={location}
          type={type}
          features={features}
          onLocationChange={(value) => dispatch(setLocation(value))}
          onTypeChange={(value) => dispatch(setType(value))}
          onFeatureToggle={(feature) => dispatch(toggleFeature(feature))}
          onApplyFilters={handleFilterChange}
        />
      </aside>
      <main className="content">
        <div className="cards-grid">
          {items && items.length > 0 ? (
            items.map((camper) => (
              <CamperCard key={camper.id} camper={camper} />
            ))
          ) : (
            <div>No campers found</div>
          )}
        </div>
        {items && items.length >= page * limit && (
          <button className="load-more-btn" onClick={handleLoadMore}>
            Load More
          </button>
        )}
      </main>
    </div>
  );
}

export default CatalogPage;

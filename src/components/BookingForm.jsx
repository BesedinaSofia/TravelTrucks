import { useState } from 'react';
import { toast } from 'react-toastify';
import API from '../api/api'; 
import styled from 'styled-components';

const Form = styled.form`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 300px;
`;

function BookingForm({ camperId }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/bookings', { ...formData, camperId }); // Використовуємо /bookings
      toast.success('Booking successful!');
      setFormData({ name: '', email: '', date: '' });
    } catch (error) {
      console.error('Booking Error:', error.response?.status, error.response?.data);
      toast.error('Booking failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h3>Book Camper</h3>
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Name"
        required
      />
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Email"
        required
      />
      <input
        type="date"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        required
      />
      <button type="submit" disabled={loading} style={{ cursor: 'pointer' }}>
        {loading ? 'Booking...' : 'Book Now'}
      </button>
    </Form>
  );
}

export default BookingForm;
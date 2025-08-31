import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getReviews, addReview } from '../api';
import ReviewForm from '../components/ReviewForm';

export default function BookDetail({ user }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [book, setBook] = useState(location.state?.book || null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch reviews when book loads
  useEffect(() => {
    if (!book) return;
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const revs = await getReviews(book.id);
        setReviews(revs);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchReviews();
  }, [book]);

  // Add review handler
  const handleNewReview = async (review) => {
    if (!user) return alert('Login required');
    try {
      await addReview(book.id, review, user.token);
      const updated = await getReviews(book.id);
      setReviews(updated);
    } catch (err) {
      console.error(err);
      alert('Failed to add review');
    }
  };

  if (!book) return <p className="text-center mt-12 text-gray-600">Book not found.</p>;
  if (loading) return <p className="text-center mt-12 text-gray-600">Loading reviews...</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="mb-6 text-indigo-600 hover:underline">
        &larr; Back
      </button>

      <div className="flex flex-col md:flex-row gap-8 bg-white rounded-lg shadow p-6">
        <img
          src={book.cover_url || 'https://via.placeholder.com/200x300?text=No+Cover'}
          alt={book.title}
          className="w-full md:w-64 h-auto object-cover rounded-lg shadow"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          <p className="text-gray-700 mb-4 text-lg">by {book.author}</p>
          <p className="text-gray-600 mb-4">{book.description || 'No description available.'}</p>
          {book.avg_rating !== undefined && (
            <p className="text-yellow-500 font-semibold">
              ★ {book.avg_rating} ({book.review_count || 0} reviews)
            </p>
          )}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((r) => (
              <div
                key={r.id}
                className="bg-gray-50 p-4 rounded-lg shadow-sm border hover:bg-gray-100 transition"
              >
                <p className="font-semibold">
                  {r.username} <span className="text-yellow-500">★ {r.rating}</span>
                </p>
                <p className="text-gray-700 mt-1">{r.content}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Add Your Review</h3>
          <ReviewForm onSubmit={handleNewReview} />
        </div>
      </div>
    </div>
  );
}

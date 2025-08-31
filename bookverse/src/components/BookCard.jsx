import { Link } from 'react-router-dom';

export default function BookCard({ book }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow duration-200">
      <img
        src={book.cover_url || 'https://via.placeholder.com/150x220?text=No+Cover'}
        alt={book.title}
        className="h-56 w-full object-cover rounded"
      />

      <h3 className="mt-3 font-semibold text-lg">{book.title}</h3>
      <p className="text-sm text-gray-600">{book.author}</p>

      <div className="mt-2 flex items-center">
        <span className="text-yellow-500 mr-2">
          ★ {book.avg_rating !== undefined ? book.avg_rating : '—'}
        </span>
        <small className="text-gray-500">{book.review_count || 0} reviews</small>
      </div>

      <Link to="/books/details" state={{ book }}>
      View Details
      </Link>

    </div>
  );
}

import { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(''); // empty by default
  const [mode, setMode] = useState('trending'); // "trending" or "search"

  // Fetch trending books
  const fetchTrending = () => {
    setLoading(true);
    fetch(`http://localhost:8080/api/books/trending`)
      .then(res => res.json())
      .then(data => {
        setBooks(data);
        setMode('trending');
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  // Search books by query
  const searchBooks = () => {
    if (!query.trim()) {
      fetchTrending(); // fallback to trending if query is empty
      return;
    }
    setLoading(true);
    fetch(`http://localhost:8080/api/books/search?q=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(data => {
        setBooks(data);
        setMode('search');
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  // Load trending books first
  useEffect(() => {
    fetchTrending();
  }, []);

  return (
    <div className="container mx-auto p-6">
      {/* Search bar */}
      <div className="flex mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search books..."
          className="flex-1 border p-2 rounded-l-md focus:outline-none"
        />
        <button
          onClick={searchBooks}
          className="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700"
        >
          Search
        </button>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold mb-4">
        {mode === 'trending' ? '📚 Trending Books' : `🔎 Results for "${query}"`}
      </h2>

      {/* Loading */}
      {loading && <p className="text-center text-gray-600">Loading...</p>}

      {/* Books grid */}
      {!loading && books.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        !loading && <p className="text-center text-gray-500">No books found.</p>
      )}
    </div>
  );
}

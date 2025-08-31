const API_URL = 'http://localhost:8080/api';

export async function searchBooks(query) {
  const res = await fetch(`${API_URL}/books/search?q=${encodeURIComponent(query)}`);
  return res.json();
}

export async function signup(user) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(user)
  });
  return res.json();
}

export async function login(credentials) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(credentials)
  });
  return res.json();
}

export async function getReviews(bookId) {
  const res = await fetch(`${API_URL}/reviews/${bookId}`);
  return res.json();
}

export async function addReview(bookId, review, token) {
  try {
    const res = await fetch(`${API_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...review, book_id: bookId }), // include book_id
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.msg || 'Failed to add review');
    }

    return await res.json();
  } catch (err) {
    console.error('addReview error:', err);
    throw err;
  }
}




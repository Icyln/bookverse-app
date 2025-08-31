const express = require("express");
const router = express.Router();
const fetch = require("node-fetch"); // npm install node-fetch@2

// ==========================
// API Keys
// ==========================
const NYT_API_KEY = "I32cpCNrbMLPYeqhsjqtnypIewAG3BAG";

// ==========================
// 1. Search books (Google Books API)
// ==========================
router.get("/search", async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ msg: "Search query missing" });

  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}`
    );
    const data = await response.json();

    console.log("NYT API raw response:", data); 


    if (!data.items) return res.json([]);

    const books = data.items.map((item) => ({
      id: item.id,
      title: item.volumeInfo.title,
      author: item.volumeInfo.authors?.join(", ") || "Unknown",
      cover_url: item.volumeInfo.imageLinks?.thumbnail || "",
      description: item.volumeInfo.description || "No description available",
      avg_rating: item.volumeInfo.averageRating || 0,
      review_count: item.volumeInfo.ratingsCount || 0,
    }));

    res.json(books);
  } catch (err) {
    console.error("Google Books API error:", err.message);
    res.status(500).json({ msg: "Failed to fetch books" });
  }
});

// ==========================
// 2. Trending books (NYT Bestsellers)
// ==========================
router.get("/trending", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${NYT_API_KEY}`
    );
    const data = await response.json();

    if (!data.results?.books) return res.json([]);

    const books = data.results.books.map((book) => ({
      title: book.title,
      author: book.author,
      cover_url: book.book_image,
      description: book.description || "No description available",
      publisher: book.publisher,
      rank: book.rank,
      weeks_on_list: book.weeks_on_list,
    }));

    res.json(books);
  } catch (err) {
    console.error("NYT API error:", err.message);
    res.status(500).json({ msg: "Failed to fetch trending books" });
  }
});

module.exports = router;

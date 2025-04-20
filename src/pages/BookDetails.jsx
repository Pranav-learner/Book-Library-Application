import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function BookDetails() {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${bookId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  if (loading) {
    return <div>Loading book details...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500">Error loading book details: {error}</div>
    );
  }

  if (!book) {
    return <div>Book not found.</div>;
  }

  const { volumeInfo } = book;
  const previewLink =
    volumeInfo?.accessInfo?.viewability === "PARTIAL" ||
    volumeInfo?.accessInfo?.viewability === "FULL"
      ? volumeInfo?.accessInfo?.previewLink
      : null;

  return (
    <div
      className="p-4 md:p-6 lg:p-8"
      style={{ backgroundColor: "purple" /* dark vibrant background */ }}
    >
      <div
        className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8"
        style={{ backgroundColor: "#f9f9f9" /* Slightly darker background */ }}
      >
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">
          {volumeInfo?.title}
        </h2>

        <div className="flex flex-col md:flex-row gap-6 mb-6">
          {/* Book Cover */}
          {volumeInfo?.imageLinks?.large && (
            <img
              src={volumeInfo.imageLinks.large}
              alt={volumeInfo?.title}
              className="w-48 h-auto rounded-md shadow-md"
            />
          )}

          <div className="flex-1">
            {/* Author(s) */}
            {volumeInfo?.authors && volumeInfo.authors.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  Author(s)
                </h3>
                <p className="text-gray-600">{volumeInfo.authors.join(", ")}</p>
              </div>
            )}

            {/* Description */}
            {volumeInfo?.description && (
              <div
                className="mb-4 p-4 rounded-md"
                style={{
                  backgroundColor: "#e6e6e6", // Darker background for description
                  color: "#333", // Text color for better readability
                }}
              >
                <h3 className="text-lg font-semibold text-gray-700">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {volumeInfo.description}
                </p>
              </div>
            )}

            {/* Book Preview */}
            {previewLink && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  Book Preview
                </h3>
                <a
                  href={previewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View Preview on Google Books
                </a>
              </div>
            )}
            {!previewLink}

            {/* User Rating (from Google Books) */}
            {volumeInfo?.averageRating && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  User Rating
                </h3>
                <p className="text-gray-600">
                  Average: {volumeInfo.averageRating} ({volumeInfo.ratingsCount}{" "}
                  ratings)
                </p>
              </div>
            )}

            {/* Information (Publisher, Date) */}
            <div className="text-sm text-gray-500">
              {volumeInfo?.publisher && (
                <p>Publisher: {volumeInfo.publisher}</p>
              )}
              {volumeInfo?.publishedDate && (
                <p>Published Date: {volumeInfo.publishedDate}</p>
              )}
            </div>
          </div>
        </div>

        {/* Link to Google Books Page */}
        {volumeInfo?.infoLink && (
          <div className="mt-6">
            <a
              href={volumeInfo.infoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              More Details on Google Books
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookDetails;

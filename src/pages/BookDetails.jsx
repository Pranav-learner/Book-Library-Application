import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

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
    return <div className="text-gray-300">Loading book details...</div>;
  }

  if (error) {
    return (
      <div className="text-red-400">Error loading book details: {error}</div>
    );
  }

  if (!book) {
    return <div className="text-gray-300">Book not found.</div>;
  }

  const { volumeInfo } = book;
  const previewLink =
    volumeInfo?.accessInfo?.viewability === "PARTIAL" ||
    volumeInfo?.accessInfo?.viewability === "FULL"
      ? volumeInfo?.accessInfo?.previewLink
      : null;

  return (
    <div className="p-6 md:p-8 lg:p-10 bg-blue-400">
      <div className="max-w-6xl mx-auto bg-yellow-100 rounded-xl shadow-xl p-8 md:p-10 lg:p-12">
        <h2 className="text-4xl font-semibold mb-6 text-indigo-700">
          {volumeInfo?.title}
        </h2>
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="md:w-1/3 flex justify-center">
            {volumeInfo?.imageLinks?.large && (
              <img
                src={volumeInfo.imageLinks.large}
                alt={volumeInfo?.title}
                className="max-w-full h-auto rounded-md shadow-lg border border-gray-200"
                style={{ maxHeight: "400px" }}
              />
            )}
          </div>
          <div className="md:w-2/3">
            {volumeInfo?.authors && volumeInfo.authors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-2xl font-semibold mb-2 text-indigo-600">
                  Author(s)
                </h3>
                <p className="text-gray-700 text-lg">
                  {volumeInfo.authors.join(", ")}
                </p>
              </div>
            )}
            {volumeInfo?.description && (
              <div className="mb-6 bg-gray-100 rounded-md p-4">
                <h3 className="text-2xl font-semibold mb-2 text-indigo-600">
                  Description
                </h3>
                <div
                  className="text-gray-800 leading-relaxed text-lg"
                  dangerouslySetInnerHTML={{ __html: volumeInfo.description }}
                />
              </div>
            )}
            {previewLink && (
              <div className="mb-6">
                <h3 className="text-2xl font-semibold mb-2 text-indigo-600">
                  Book Preview
                </h3>
                <a
                  href={previewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 transition-colors text-lg"
                >
                  View Preview on Google Books
                </a>
              </div>
            )}
            {!previewLink}
            {volumeInfo?.averageRating && (
              <div className="mb-6">
                <h3 className="text-2xl font-semibold mb-2 text-indigo-600">
                  User Rating
                </h3>
                <p className="text-gray-700 text-lg">
                  Average: {volumeInfo.averageRating} ({volumeInfo.ratingsCount}{" "}
                  ratings)
                </p>
              </div>
            )}
            <div className="text-lg text-gray-500">
              {volumeInfo?.publisher && (
                <p>
                  <span className="font-semibold text-gray-600">
                    Publisher:
                  </span>{" "}
                  {volumeInfo.publisher}
                </p>
              )}
              {volumeInfo?.publishedDate && (
                <p>
                  <span className="font-semibold text-gray-600">
                    Published Date:
                  </span>{" "}
                  {volumeInfo.publishedDate}
                </p>
              )}
            </div>
          </div>
        </div>
        {volumeInfo?.infoLink && (
          <div className="mt-8">
            <a
              href={volumeInfo.infoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 transition-colors text-lg"
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

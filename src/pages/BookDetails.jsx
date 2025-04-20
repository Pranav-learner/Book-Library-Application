import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function BookDetails() {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [readMore, setReadMore] = useState(false);

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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100">
        <div className="flex flex-col items-center p-8 rounded-lg bg-white shadow-lg">
          <svg
            className="animate-spin h-10 w-10 text-indigo-600 mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="text-lg font-medium text-gray-700">
            Loading book details...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100">
        <div className="p-8 rounded-lg bg-white shadow-lg text-center max-w-lg">
          <svg
            className="h-16 w-16 text-red-500 mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Error Loading Book
          </h3>
          <p className="text-gray-600 mb-4">
            We couldn't load this book's details.
          </p>
          <p className="text-sm text-red-500 mb-4">{error}</p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Return to Books
          </Link>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100">
        <div className="p-8 rounded-lg bg-white shadow-lg text-center max-w-lg">
          <svg
            className="h-16 w-16 text-gray-400 mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Book Not Found
          </h3>
          <p className="text-gray-600 mb-4">
            We couldn't find the book you're looking for.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Browse Books
          </Link>
        </div>
      </div>
    );
  }

  const { volumeInfo } = book;
  const previewLink = volumeInfo?.previewLink;

  // Extract just the year from the published date
  const publishedYear = volumeInfo?.publishedDate
    ? volumeInfo.publishedDate.split("-")[0]
    : null;

  // Calculate description length for the read more/less functionality
  const shortDescriptionLength = 300;
  const longDescription = volumeInfo?.description || "";
  const isLongDescription = longDescription.length > shortDescriptionLength;
  const displayDescription =
    !readMore && isLongDescription
      ? longDescription.substring(0, shortDescriptionLength) + "..."
      : longDescription;

  // Generate star rating display
  const renderStarRating = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <svg
            key={i}
            className="w-5 h-5 text-yellow-400 fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <div key={i} className="relative w-5 h-5">
            <svg
              className="w-5 h-5 text-gray-300 fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: "50%" }}
            >
              <svg
                className="w-5 h-5 text-yellow-400 fill-current"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
        );
      } else {
        stars.push(
          <svg
            key={i}
            className="w-5 h-5 text-gray-300 fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      }
    }

    return stars;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <nav className="mb-8 flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link
                to="/"
                className="text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                Books
              </Link>
            </li>
            <li className="flex items-center">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="ml-2 text-gray-500 truncate max-w-xs">
                {volumeInfo?.title}
              </span>
            </li>
          </ol>
        </nav>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Book Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 sm:p-10">
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left">
              {/* Book Cover */}
              <div className="relative mb-6 sm:mb-0 sm:mr-8">
                {volumeInfo?.imageLinks?.thumbnail ? (
                  <img
                    src={volumeInfo.imageLinks.thumbnail.replace(
                      "http:",
                      "https:"
                    )}
                    alt={volumeInfo?.title}
                    className="w-48 h-auto rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
                    style={{ minHeight: "200px" }}
                  />
                ) : (
                  <div className="w-48 h-64 bg-gray-200 rounded-lg shadow-lg flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                )}
              </div>

              {/* Book Title & Basic Info */}
              <div className="flex-1 text-white">
                <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                  {volumeInfo?.title}
                </h1>
                {volumeInfo?.subtitle && (
                  <p className="text-lg text-indigo-100 mb-3">
                    {volumeInfo.subtitle}
                  </p>
                )}

                {volumeInfo?.authors && (
                  <p className="text-xl mb-3">
                    by {volumeInfo.authors.join(", ")}
                  </p>
                )}

                {/* Quick Stats Row */}
                <div className="flex flex-wrap items-center gap-4 mt-4">
                  {volumeInfo?.averageRating && (
                    <div className="flex items-center">
                      <div className="flex mr-1">
                        {renderStarRating(volumeInfo.averageRating)}
                      </div>
                      <span>({volumeInfo.ratingsCount || 0})</span>
                    </div>
                  )}

                  {publishedYear && (
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                      <span>{publishedYear}</span>
                    </div>
                  )}

                  {volumeInfo?.pageCount && (
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        ></path>
                      </svg>
                      <span>{volumeInfo.pageCount} pages</span>
                    </div>
                  )}

                  {volumeInfo?.categories &&
                    volumeInfo.categories.length > 0 && (
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                          ></path>
                        </svg>
                        <span>{volumeInfo.categories[0]}</span>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>

          {/* Book Content */}
          <div className="p-6 sm:p-10">
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              {previewLink && (
                <a
                  href={previewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4
                  py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    ></path>
                  </svg>
                  Preview Book
                </a>
              )}

              {volumeInfo?.infoLink && (
                <a
                  href={volumeInfo.infoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  More Info
                </a>
              )}
            </div>

            {/* Description */}
            {volumeInfo?.description && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  About this book
                </h2>
                <div
                  className="prose prose-lg max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: displayDescription }}
                />
                {isLongDescription && (
                  <button
                    onClick={() => setReadMore(!readMore)}
                    className="mt-2 text-indigo-600 hover:text-indigo-800 font-medium focus:outline-none"
                  >
                    {readMore ? "Read less" : "Read more"}
                  </button>
                )}
              </div>
            )}

            {/* Book Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Publication Details */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Publication Details
                </h2>
                <ul className="space-y-3">
                  {volumeInfo?.publisher && (
                    <li className="flex">
                      <span className="font-medium text-gray-600 w-32">
                        Publisher:
                      </span>
                      <span className="text-gray-800">
                        {volumeInfo.publisher}
                      </span>
                    </li>
                  )}
                  {volumeInfo?.publishedDate && (
                    <li className="flex">
                      <span className="font-medium text-gray-600 w-32">
                        Publication Date:
                      </span>
                      <span className="text-gray-800">
                        {volumeInfo.publishedDate}
                      </span>
                    </li>
                  )}
                  {volumeInfo?.language && (
                    <li className="flex">
                      <span className="font-medium text-gray-600 w-32">
                        Language:
                      </span>
                      <span className="text-gray-800">
                        {volumeInfo.language === "en"
                          ? "English"
                          : volumeInfo.language}
                      </span>
                    </li>
                  )}
                  {volumeInfo?.printType && (
                    <li className="flex">
                      <span className="font-medium text-gray-600 w-32">
                        Print Type:
                      </span>
                      <span className="text-gray-800">
                        {volumeInfo.printType}
                      </span>
                    </li>
                  )}
                  {volumeInfo?.pageCount && (
                    <li className="flex">
                      <span className="font-medium text-gray-600 w-32">
                        Page Count:
                      </span>
                      <span className="text-gray-800">
                        {volumeInfo.pageCount}
                      </span>
                    </li>
                  )}
                </ul>
              </div>

              {/* Categories & Identifiers */}
              <div className="bg-gray-50 rounded-lg p-6">
                {volumeInfo?.categories && volumeInfo.categories.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      Categories
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {volumeInfo.categories.map((category, index) => (
                        <span
                          key={index}
                          className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {volumeInfo?.industryIdentifiers &&
                  volumeInfo.industryIdentifiers.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">
                        Identifiers
                      </h3>
                      <ul className="space-y-2">
                        {volumeInfo.industryIdentifiers.map(
                          (identifier, index) => (
                            <li key={index} className="flex">
                              <span className="font-medium text-gray-600 w-20">
                                {identifier.type.replace("_", " ")}:
                              </span>
                              <span className="text-gray-800">
                                {identifier.identifier}
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="mt-8 flex justify-between">
          <Link
            to="/"
            className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              ></path>
            </svg>
            Back to Books
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;

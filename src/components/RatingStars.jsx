export default function RatingStars({ rating = 0 }) {
  const filledStars = Math.round(rating);

  return (
    <div className="rating-stars" aria-label={`Rated ${rating} out of 5`}>
      <div className="rating-stars__icons" aria-hidden="true">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`rating-stars__icon ${index < filledStars ? 'is-filled' : ''}`}
          >
            ★
          </span>
        ))}
      </div>
      <span className="rating-stars__value">{Number(rating).toFixed(1)}/5</span>
    </div>
  );
}

import RatingStars from './RatingStars';

export default function ReviewCard({ review, className = '' }) {
  return (
    <article className={`review-card ${className}`.trim()}>
      <div className="review-card__top">
        <RatingStars rating={review.rating} />
        <button type="button" className="review-card__more">
          ...
        </button>
      </div>

      <div className="review-card__author-row">
        <h3 className="review-card__author">{review.name}</h3>
        <span className="review-card__verified">Verified</span>
      </div>

      <p className="review-card__text">{review.text}</p>
      {review.postedAt ? <p className="review-card__date">{review.postedAt}</p> : null}
    </article>
  );
}

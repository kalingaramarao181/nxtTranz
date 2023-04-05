import './index.css'

const Rating = props => {
  const {ratingDetails, passRatingId} = props
  const {ratingId, imageUrl} = ratingDetails
  const onClickRating = () => {
    passRatingId(ratingId)
  }
  return (
    <li className="category-item">
      <button
        onClick={onClickRating}
        className="rating-item-button"
        type="button"
      >
        <img
          className="rating-image"
          src={imageUrl}
          alt={`rating ${ratingId}`}
        />
        <p>&& up</p>
      </button>
    </li>
  )
}

export default Rating

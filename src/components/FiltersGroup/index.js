import Category from '../Category'
import Rating from '../Rating'

import './index.css'

const FiltersGroup = props => {
  const {
    categoryOptions,
    ratingsList,
    takingRatingId,
    takingCategoryName,
    clearFilters,
  } = props

  const onClickRating = ratingId => {
    takingRatingId(ratingId)
  }

  const onClickCategory = name => {
    takingCategoryName(name)
  }

  const onClickClearFilters = () => {
    clearFilters()
  }
  return (
    <div className="filters-group-container">
      <h1 className="category-heading">Category</h1>
      <div className="category-item-container">
        {categoryOptions.map(each => (
          <Category
            key={each.categoryId}
            categoryDetails={each}
            passingCategoryName={onClickCategory}
          />
        ))}
      </div>
      <h1 className="category-heading">Ratings</h1>
      <ul className="category-item-container">
        {ratingsList.map(each => (
          <Rating
            key={each.ratingId}
            ratingDetails={each}
            passRatingId={onClickRating}
          />
        ))}
      </ul>
      <button
        onClick={onClickClearFilters}
        type="button"
        className="clear-filters-button"
      >
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup

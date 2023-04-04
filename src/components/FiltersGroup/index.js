import './index.css'

const FiltersGroup = props => {
  const {categoryOptions, ratingsList} = props

  return (
    <div className="filters-group-container">
      <h1 className="category-heading">Category</h1>
      <ul className="category-item-container">
        {categoryOptions.map(each => (
          <li className="category-item">
            <button className="item-button" type="button">
              {each.name}
            </button>
          </li>
        ))}
      </ul>
      <h1 className="category-heading">Ratings</h1>
      <ul className="category-item-container">
        {ratingsList.map(each => (
          <li className="category-item">
            <button className="rating-item-button" type="button">
              <img className="rating-image" src={each.imageUrl} alt="rating" />
              <p>&& up</p>
            </button>
          </li>
        ))}
      </ul>
      <button type="button" className="clear-filters-button">
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup

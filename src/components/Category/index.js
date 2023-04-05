import './index.css'

const Category = props => {
  const {categoryDetails, passingCategoryName} = props
  const {name, categoryId} = categoryDetails

  const onClickCategory = () => {
    passingCategoryName(categoryId)
  }

  return (
    <button onClick={onClickCategory} className="item-button" type="button">
      <p className="category-item">{name}</p>
    </button>
  )
}

export default Category

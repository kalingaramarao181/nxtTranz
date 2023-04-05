import {BsFilterRight} from 'react-icons/bs'
import {FiSearch} from 'react-icons/fi'

import './index.css'

const ProductsHeader = props => {
  const onChangeSortby = event => {
    const {changeSortby} = props
    changeSortby(event.target.value)
  }

  const {sortbyOptions, activeOptionId, onChangeSearch} = props

  const onChangeBySearch = event => {
    onChangeSearch(event.target.value)
  }

  return (
    <div className="products-header">
      <div className="search-input-container">
        <input
          onChange={onChangeBySearch}
          placeholder="Search"
          className="search-input"
          type="search"
        />
        <FiSearch className="search-icon" />
      </div>
      <h1 className="products-list-heading">All Products</h1>
      <div className="sort-by-container">
        <BsFilterRight className="sort-by-icon" />
        <p className="sort-by">Sort by</p>
        <select
          className="sort-by-select"
          value={activeOptionId}
          onChange={onChangeSortby}
        >
          {sortbyOptions.map(eachOption => (
            <option
              key={eachOption.optionId}
              value={eachOption.optionId}
              className="select-option"
            >
              {eachOption.displayText}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default ProductsHeader

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: false,
    activeOptionId: sortbyOptions[0].optionId,
    searchInputValue: '',
    ratingId: '',
    category: '',
    productsFailure: false,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      isLoading: true,
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {activeOptionId, searchInputValue, ratingId, category} = this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&title_search=${searchInputValue}&rating=${ratingId}&category=${category}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        isLoading: false,
      })
    } else {
      this.setState({productsFailure: true, isLoading: false})
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  renderProductsList = () => {
    const {productsList} = this.state

    // TODO: Add No Products View
    return (
      <>
        <div className="all-products-container">
          <ul className="products-list">
            {productsList.map(product => (
              <ProductCard productData={product} key={product.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  onChangeSearch = searchValue => {
    this.setState(
      {searchInputValue: searchValue, isLoading: false},
      this.getProducts,
    )
  }

  onClickRating = ratingId => {
    this.setState({ratingId, isLoading: false}, this.getProducts)
  }

  onClickCategory = name => {
    this.setState({category: name, isLoading: false}, this.getProducts)
  }

  onClearFilters = () => {
    this.setState(
      {
        searchInputValue: '',
        ratingId: '',
        category: '',
        isLoading: false,
      },
      this.getProducts,
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderNoItemsView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
        alt="no products"
      />
      <h1>No Products Found</h1>
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
      />
      <h1>Oops! Something went Wrong </h1>
    </div>
  )

  // TODO: Add failure view

  render() {
    const {
      isLoading,
      activeOptionId,
      productsList,
      productsFailure,
    } = this.state
    const showNoItems = productsList.length < 1

    return (
      <>
        <ProductsHeader
          onChangeSearch={this.onChangeSearch}
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
        />
        <div className="all-products-section">
          {/* TODO: Update the below element */}
          <FiltersGroup
            clearFilters={this.onClearFilters}
            takingCategoryName={this.onClickCategory}
            takingRatingId={this.onClickRating}
            categoryOptions={categoryOptions}
            ratingsList={ratingsList}
          />
          {isLoading ? (
            this.renderLoader()
          ) : (
            <>
              {productsFailure ? (
                this.renderFailureView()
              ) : (
                <>
                  {showNoItems
                    ? this.renderNoItemsView()
                    : this.renderProductsList()}
                </>
              )}
            </>
          )}
        </div>
      </>
    )
  }
}

export default AllProductsSection

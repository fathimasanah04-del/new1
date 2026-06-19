import { useEffect, useRef } from "react"
import { animate, hover } from "motion"
import "./card.css"

const API_BASE_URL = "https://sample-e-1.onrender.com"

function Card({ image, title, price, description, category }) {
  const addToCartRef = useRef(null)
  const imageUrl = image
    ? image.startsWith("http") || image.startsWith("data:")
      ? image
      : `${API_BASE_URL}/${image}`
    : "https://via.placeholder.com/300"

  useEffect(() => {
    if (!addToCartRef.current) return

    return hover(addToCartRef.current, (element) => {
      animate(element, { scale: 1.05 })
      return () => animate(element, { scale: 1 })
    })
  }, [])

  return (
    <article className="product-card">
      <img
        src={imageUrl}
        alt={title || "Product"}
        className="product-image"
      />

      <p className="product-tag">{category || "General"}</p>
      <h2 className="product-name">{title || "Unnamed Product"}</h2>
      <p className="product-price">₹{price || 0}</p>
      {description ? (
        <p className="product-description">{description}</p>
      ) : null}
      <button ref={addToCartRef} type="button">Add to Cart</button>
    </article>
  )
}

export default Card


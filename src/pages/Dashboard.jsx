import { useEffect, useState } from "react"
import { MutatingDots } from 'react-loader-spinner'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Card from "../components/Card"

function Dashboard() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await fetch("https://sample-e-1.onrender.com/product/getproducts", {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        })

        if (!response.ok) {
          throw new Error("Failed to load products")
        }

        const data = await response.json()
        const normalizedData = Array.isArray(data)
          ? data
          : Array.isArray(data?.value)
          ? data.value
          : []

        setProducts(normalizedData)
      } catch (err) {
        console.error(err)
        setError("Could not load products. Add them in Postman or check the API.")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div>
      <Navbar />
      <main
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "20px",
          minHeight: "calc(100vh - 160px)",
        }}
      >
        {loading ? (
          <div style={{ position: 'relative', minHeight: 200 }}>
            <div style={{
              position: 'fixed',
              inset: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(255,255,255,0.85)',
              zIndex: 9999,
            }}>
              <MutatingDots
                visible={true}
                height="120"
                width="120"
                color="#72383D"
                secondaryColor="#72383D"
                radius="12.5"
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          </div>
        ) : error ? (
          <p>{error}</p>
        ) : products.length === 0 ? (
          <p>No products found. Add products via Postman to the API and refresh.</p>
        ) : (
          products.map((product) => (
            <Card
              key={product.id || product._id || product.title}
              image={product.image || product.img || "https://via.placeholder.com/250x220"}
              title={product.title || product.name || "Unnamed Product"}
              price={product.price || "0"}
              description={product.description}
              category={product.category}
            />
          ))
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Dashboard;
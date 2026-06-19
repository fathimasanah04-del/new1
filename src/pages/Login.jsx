import "./login.css"
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import {z} from "zod";
import { animate, hover } from "motion"
import { MutatingDots } from "react-loader-spinner"

const Loginschema = z.object({
    email: z.string().min(1,"Email is required").email("pls enter a valid email"),
    password: z.string().min(1,"password is required")
})

function Login() {
const navigate = useNavigate()
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [message, setMessage] = useState("")
const [loading, setLoading] = useState(false)
const [initialLoading, setInitialLoading] = useState(true)
const loginButtonRef = useRef(null)

useEffect(() => {
    const t = setTimeout(() => setInitialLoading(false), 1200)
    return () => clearTimeout(t)
}, [])

useEffect(() => {
    if (!loginButtonRef.current) return

    return hover(loginButtonRef.current, (element) => {
        animate(element, { scale: 1.05 })
        return () => animate(element, { scale: 1 })
    })
}, [])


const handleLogin = async () => {
    if (!email || !password) {
        setMessage("❌ Please enter email and password")
        return
    }
    const validation = Loginschema.safeParse({ email, password })
    if (!validation.success) {
        setMessage(validation.error.issues[0].message)
        return
    }

    try {
        setLoading(true)
        const response = await fetch(
            "https://sample-e-1.onrender.com/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            }
        )

        const data = await response.json()

        if (response.ok) {
            setMessage("✅ Login Successful!")

            if (data.token) {
                localStorage.setItem("token", data.token)
            }

            setLoading(false)
            navigate("/Dashboard")
        } else {
            setMessage(data.message || "❌ Login Failed")
            setLoading(false)
        }
    } catch (error) {
        console.error(error)
        setMessage("❌ Server error. Please try again.")
        setLoading(false)
    }
}

return (
    <div className="container">
        <div className="login-box">
            <h1>Login</h1>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button ref={loginButtonRef} onClick={handleLogin} disabled={initialLoading || loading}>Login</button>

            {(initialLoading || loading) && (
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
            )}

            <p>{message}</p>

            <p>
                Don't have an account?{" "}
                <Link to="/Home">Sign Up</Link>
            </p>
        </div>
    </div>
)


}

export default Login
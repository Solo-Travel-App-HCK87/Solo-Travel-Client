import { useState } from "react"
import { useNavigate } from "react-router"
import AuthForm from "../components/AuthForm"
import { showError, successLogin } from "../helpers/alert"
import { http } from "../helpers/http"


export default function LoginPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (data) => {
    setLoading(true)
    try {
      const response = await http({
        method:"POST",
        url:"/login",
        data
      })

      localStorage.setItem(`access_token`, response.data.access_token)
      successLogin()
      navigate("/")
    } catch (error) {
      showError(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
    
    <AuthForm handleSubmit={handleSubmit} type="Log In" btmLink="/register" btmMsg1="Don't have an account?" btmMsg2="register here" loading={loading} />
    
    </>
  )
}

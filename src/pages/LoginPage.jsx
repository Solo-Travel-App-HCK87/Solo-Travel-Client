import { useNavigate } from "react-router"
import AuthForm from "../components/AuthForm"
import { showError } from "../helpers/alert"
import { http } from "../helpers/http"


export default function LoginPage() {
  const navigate = useNavigate()
  const handleSubmit = async (data) => {
    try {
      const response = await http({
        method:"POST",
        url:"/login",
        data
      })

      localStorage.setItem(`access_token`, response.data)
      navigate("/")
    } catch (error) {
      showError(error)
    }
  }
  return (
    <>
    
    <AuthForm handleSubmit={handleSubmit} type="Log In" btmLink="/register" btmMsg1="Don't have an account?" btmMsg2="register here" />
    
    </>
  )
}

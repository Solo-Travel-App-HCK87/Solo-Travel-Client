import { useNavigate } from "react-router"
import AuthForm from "../components/AuthForm"
import { showError } from "../helpers/alert"
import { http } from "../helpers/http"


export default function RegisterPage() {
  const navigate = useNavigate()
  const handleSubmit = async (data) => {
    try {
      await http({
        method:"POST",
        url:"/register",
        data
      })
      navigate(`/login`)
    } catch (error) {
      showError(error)
    }
  }
  return (
    <>


    <AuthForm handleSubmit={handleSubmit} type="Register" btmLink="/login" btmMsg1="Already have an account?" btmMsg2="Log in here" />    
    
    </>
  )
}

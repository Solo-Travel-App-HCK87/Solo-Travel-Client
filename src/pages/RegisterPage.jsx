import { useState } from "react"
import { useNavigate } from "react-router"
import AuthForm from "../components/AuthForm"
import { showError, successRegister } from "../helpers/alert"
import { http } from "../helpers/http"


export default function RegisterPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (data) => {
    setLoading(true)
    try {
      await http({
        method:"POST",
        url:"/register",
        data
      })
      successRegister()
      navigate(`/login`)
    } catch (error) {
      showError(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <>


    <AuthForm handleSubmit={handleSubmit} type="Register" btmLink="/login" btmMsg1="Already have an account?" btmMsg2="Log in here" loading={loading} />    
    
    </>
  )
}

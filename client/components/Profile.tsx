import { updateUserInfo } from "../apis/users"
import { useAuth0 } from "@auth0/auth0-react"


function Profile() {
    updateUserInfo({field: "bio", value: "testing"}, "auth0|123")

  return (
    <>
      <div>
        
      </div>
    </>
  )
}

export default Profile
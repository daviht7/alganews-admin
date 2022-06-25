import { User, UserService } from 'daviht7-sdk';
import { useCallback, useState } from "react";


export default function useUser() {

  const [user, setUser] = useState<User.Detailed>()
  
  const fetchUser = useCallback((userId: number) => {
    UserService.getDetailedUser(userId).then(setUser)
  }, [])
  
  return {
    user,
    fetchUser
  }

}
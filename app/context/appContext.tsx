import { createContext, useState } from "react";
import { IUserInfo } from "../models/userInfo";

export const AppContext = createContext<IUserInfo | null>(null);

export default function AppProvider({ children }: {
  children: React.ReactNode
}) {
  // let hotelId: string = ''
  // let userId: string = ''
  // if (localStorage) {
  //   hotelId = String(localStorage.getItem('hotelId'))
  //   userId = String(localStorage.getItem('userId'))
  // }
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    hotelId: String(localStorage.getItem('hotelId')),
    userId: String(localStorage.getItem('userId'))
  })
  
  return (
    <AppContext.Provider value={userInfo}>
      {children}
    </AppContext.Provider>
  )
}
import { useContext } from "react"
import AuthenticationContext from "./authenticationContext"
import useAuthentication from "./useAuthentication"

export const AuthenticationProvider = ({children}) => {
    const authentication = useAuthentication()
    return <AuthenticationContext.Provider value={authentication}>{children}</AuthenticationContext.Provider>
}

const authenticationConsumer = () => {
    return useContext(AuthenticationContext)
}
export default authenticationConsumer;

import service from "../utils/http"

export const userRegisterService = ({
    username,
    password,
    repassword,
}) => request.post('/register', {
    username,
    password,
    repassword,
})

export const userLoginService = ({ 
    username, 
    password
}) => request.post('/login', { 
    username, 
    password
})
const getToken = () => {
    const dataUser = localStorage.getItem("user")
    const user = JSON.parse(dataUser)
    
    return user.token
}

export default getToken
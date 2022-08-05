const auth = (state=null, action) => {
    switch(action.type){
        case "SIGN_USER":
            return state = action.payload
        default:
            return state
    }
}
export default auth
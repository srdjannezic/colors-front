export default interface UserTypes {
    email: String,
    password: String,
    firstName?:String,
    lastName?:String,
}

export default interface ColorTypes {
    id: string;
    name: string;
    hex: string;
  }

export default interface AuthPropsTypes {
    setShowSignUp: (value: boolean) => void,
    setIsLoggedIn: (value: boolean) => void,
}
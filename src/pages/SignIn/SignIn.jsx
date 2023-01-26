import styled from 'styled-components'
import colors from '../../utils/style/colors'
import UserCircle from '../../assets/user-circle.svg'
import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, rememberUser, dontRememberUser } from '../../slices/authSlice'
import { useNavigate } from 'react-router-dom'

const Main = styled.main`
flex: 1;
background-color: ${colors.dark};
padding-top: 1px;
display: block;
height: 600px;
`

const SignInContent = styled.section`
box-sizing: border-box;
 background-color: white;
 width: 300px;
 margin: 0 auto;
 margin-top: 3rem;
 padding: 2rem;
`

const SignInLogo = styled.img`
 height: 16px;
 width: 16px;
`

const InputWrapper = styled.div`
 display: flex;
 flex-direction: column;
 text-align: left;
 margin-bottom: 1rem;
`

const StyledInput = styled.input`
padding: 5px;
font-size: 1.2rem;
`

const InputWrapperLabel = styled.label`
font-weight: bold;
`

const InputRemember = styled.div`
display: flex;
`

const InputRememberLabel = styled.label`
margin-left: 0.25rem;
`

const SignInButton = styled.button`
display: block;
width: 100%;
padding: 8px;
font-size: 1.1rem;
font-weight: bold;
margin-top: 1rem;
cursor: pointer;
border-color: ${colors.primary};
background-color: ${colors.primary};
color: #fff;
text-decoration: underline;
`

const SignInError = styled.p`
font-weight: bold;
color: ${colors.secondary};
`

function SignIn() {

const authUser = useSelector((state) => state.auth);

const dispatch = useDispatch()
let navigate = useNavigate()

const [user, setUser] = useState({
email : "",
password : "",
 })


const handleRemember = (e) => {
  console.log(e)
  console.log(e.target.checked)
  if (e.target.checked) {
    console.log("box checked")
    dispatch(rememberUser())
    console.log(authUser)
  } else {
    console.log("box unchecked")
    dispatch(dontRememberUser())
    console.log(authUser)
  }
}

const handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(loginUser(user))
 }

//This useEffect is separated from handleSubmit because it should run only when auth._id
// changes and it should navigate only if there is an id. 

useEffect(() => {
  if (authUser._id) {
  navigate("/user");
}

}, [authUser._id, navigate])

return (
<Main>
  <SignInContent>
    <SignInLogo src={UserCircle} />
    <h1>Sign In</h1>
    <form onSubmit={handleSubmit}>
      <InputWrapper>
        <InputWrapperLabel htmlFor="username">Username</InputWrapperLabel>
        <StyledInput type="email" id="username" onChange={(e) => setUser({...user, email:e.target.value})} />
      </InputWrapper>
      <InputWrapper>
        <InputWrapperLabel htmlFor="password">Password</InputWrapperLabel>
        <StyledInput type="password" id="password" onChange={(e) => setUser({...user, password:e.target.value})} />
      </InputWrapper>
      <InputRemember>
        <input type="checkbox" id="remember-me" onChange={handleRemember} />
        <InputRememberLabel htmlFor="remember-me">Remember me
        </InputRememberLabel>
      </InputRemember>
      <SignInButton to="/user" type="submit">Sign in</SignInButton>
      {authUser.loginStatus === "rejected" ? <SignInError>{authUser.loginError.message}</SignInError> : null}
    </form>
  </SignInContent>
</Main>
)
}

export default SignIn

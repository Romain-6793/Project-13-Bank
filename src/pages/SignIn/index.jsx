
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import UserCircle from '../../assets/user-circle.svg'
import {Link} from 'react-router-dom'


const Main = styled.main`
flex: 1;
background-color: ${colors.dark};
padding-top: 1px;
display: block;
height: 600px;
`
//I don't know why but I had to put a padding-top and a height... weird...

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

const SignInButton = styled(Link)`
  display: block;
  width: 100%;
  padding: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 1rem;
  border-color: ${colors.primary};
  background-color: ${colors.primary};
  color: #fff;
  text-decoration: underline;
`

function SignIn() {
    return (
        <Main>
            <SignInContent>
            <SignInLogo src={UserCircle} />
            <h1>Sign In</h1>
            <form>
                <InputWrapper>
                    <InputWrapperLabel htmlFor="username">Username</InputWrapperLabel>
                    <StyledInput type="text" id="username" />
                </InputWrapper>
                <InputWrapper>
                    <InputWrapperLabel htmlFor="password">Password</InputWrapperLabel>
                    <StyledInput type="password" id="password" />
                </InputWrapper>
                <InputRemember>
                    <input type="checkbox" id="remember-me" />
                    <InputRememberLabel htmlFor="remember-me">Remember me
                    </InputRememberLabel>
                </InputRemember>
                <SignInButton to="/user">Sign in</SignInButton>
            </form>
            </SignInContent>
        </Main>
        // Pour le StyledInput du username, mettre email en type ?
    )
}

export default SignIn
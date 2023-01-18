import {Link} from 'react-router-dom'
import { useEffect } from 'react'
import styled from 'styled-components'
import ArgentBankLogo from '../../assets/argentBankLogo.png'
import UserCircle from '../../assets/user-circle.svg'
import LogOut from '../../assets/log-out.svg'
import colors from '../../utils/style/colors'
import { useSelector } from 'react-redux'

const NavContainer = styled.nav`
display: flex;
justify-content: space-between;
align-items: center;
padding: 5px 20px;
`

const HomeLogoContainer = styled.div`
display: flex;
align-items: center;
`

const HomeLogo = styled.img`
  max-width: 100%;
  width: 200px;
`
const StyledLink = styled(Link)`
margin-right: 0.5rem;
text-decoration: none;
font-weight: bold;
font-size: 18px;
color: ${colors.secondary}
&:hover {
    text-decoration: underline;
}
&:visited {
    color: ${colors.secondary}
}
`

const SignInLogo = styled.img`
  height: 16px;
  width: 16px;
  margin-right: 5px;
`



function Header() {

    const auth = useSelector((state) => state.auth);
    const token = localStorage.getItem("token");

    useEffect(() => {
        // if (auth.loginStatus === "fulfilled") {
        //     console.log(auth)
        //   }

        if (token) {
            console.log(auth)
        }
     
      }, [token, auth])

    return (
        <NavContainer>
            <Link to="/">
                <HomeLogoContainer>
                <HomeLogo src={ArgentBankLogo} />
                </HomeLogoContainer>
            </Link>
            {/* { auth._id !== "" ?
                <StyledLink to="/signIn">
                    <SignInLogo src={UserCircle} />
                    Sign In
                </StyledLink> : 
                <StyledLink to="/">
                    <SignInLogo src={LogOut} />
                    Sign Out
                </StyledLink> 
            } */}
            <StyledLink to="/signIn">
                    <SignInLogo src={UserCircle} />
                    Sign In
            </StyledLink>
        </NavContainer>
        
    )
}

export default Header
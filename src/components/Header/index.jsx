import {Link} from 'react-router-dom'
import styled from 'styled-components'
import ArgentBankLogo from '../../assets/argentBankLogo.png'
import UserCircle from '../../assets/user-circle.svg'
import { StyledLink } from '../../utils/style/Atoms'

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

const SignInLogo = styled.img`
  height: 16px;
  width: 16px;
  margin-right: 5px;
`



function Header() {
    return (
        <NavContainer>
            <Link to="/">
                <HomeLogoContainer>
                <HomeLogo src={ArgentBankLogo} />
                </HomeLogoContainer>
            </Link>
            <StyledLink to="/signIn">
                <SignInLogo src={UserCircle} />
                Sign In
            </StyledLink>
        </NavContainer>
        
    )
}

export default Header
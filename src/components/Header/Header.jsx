import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../../slices/authSlice'
import styled from 'styled-components'
import ArgentBankLogo from '../../assets/argentBankLogo.png'
import UserCircle from '../../assets/user-circle.svg'
import LogOut from '../../assets/log-out.svg'
import colors from '../../utils/style/colors'




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

const HeaderFlex = styled.div`
display: flex;
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

const StyledDiv = styled.div`
margin-right: 1rem;
text-decoration: none;
font-weight: bold;
font-size: 18px;
color: ${colors.secondary}
`

const SignInLogo = styled.img`
 height: 16px;
 width: 16px;
 margin-right: 5px;
`


function Header() {

 const authUser = useSelector((state) => state.auth);

 const dispatch = useDispatch();

 return (
  <NavContainer>
   <Link to="/">
    <HomeLogoContainer>
    <HomeLogo src={ArgentBankLogo} />
    </HomeLogoContainer>
   </Link>
   { authUser._id ?
    <HeaderFlex>
     <StyledDiv>
      <SignInLogo src={UserCircle} />
      {authUser.firstName}
     </StyledDiv>
     <StyledLink to="/" onClick={() => {
      dispatch(logoutUser(null)); console.log(authUser)
      }}>
     <SignInLogo src={LogOut} />
      Sign Out
     </StyledLink> 
    </HeaderFlex>
    : 
    <StyledLink to="/signIn">
     <SignInLogo src={UserCircle} />
      Sign In
    </StyledLink>
   }
  </NavContainer>
  
 )
}

export default Header

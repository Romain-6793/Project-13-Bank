import { useSelector, useDispatch } from "react-redux"
import { fetchUser } from "../../slices/authSlice"
import { useEffect } from "react"
import { Link } from 'react-router-dom'
import styled from "styled-components"
import colors from '../../utils/style/colors'

const Main = styled.main`
flex: 1;
background-color: ${colors.dark};
padding-top: 1px;
display: block;
min-height: 850px;
@media (min-width: 720px) {
    min-height: 680px;
}
`

const Welcome = styled.div`
color: #fff;
margin-bottom: 2rem;
`

const EditButton = styled(Link)`
  border-color: ${colors.primary};
  background-color: ${colors.primary};
  color: #fff;
  font-weight: bold;
  padding: 10px;
  &:visited {
    color: #fff;
  }
   &:focus {
    color: #fff;
  }
  &:active {
    color: #fff;
  }
  &:hover {
   text-decoration: underline;
   color: #fff;
  }
`

const Account = styled.section`
display: flex;
justify-content: space-between;
align-items: center;
border: 1px solid black;
background-color: #fff;
width: 80%;
margin: 0 auto;
flex-direction: column;
padding: 1.5rem;
box-sizing: border-box;
text-align: left;
margin-bottom: 2rem;
@media (min-width: 720px) {
    flex-direction: row;
}
`
const AccountContentWrapper = styled.div`
width: 100%;
flex: 1;
position: relative;
`

const AccountTitle = styled.h3`
  margin: 0;
  padding: 0;
  font-size: 1rem;
  font-weight: normal;
`
const AccountAmount = styled.p`
  margin: 0;
  font-size: 2.5rem;
  font-weight: bold;
`
const AccountAmountDesc = styled.p`
margin: 0;
`

const CallToAction = styled.div`
width: 100%;
flex: 1;
@media (min-width: 720px) {
    flex: 0;
    width: 200px;
    position: absolute;
    right: 0;
    bottom: 10px;
}
`
const TransactionButton = styled.button`
display: block;
width: 100%;
padding: 8px;
font-size: 1.1rem;
font-weight: bold;
margin-top: 1rem;
border-color: ${colors.primary};
background-color: ${colors.primary};
color: #fff;
@media (min-width: 720px) {
    width: 200px;
}
`

function User() {  

    const authUser = useSelector((state) => state.auth);

    const dispatch = useDispatch()

    useEffect(() => {
        if (authUser.fetchStatus !== "fulfilled") {
        dispatch(fetchUser(authUser))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    

    return (
        <Main>
            <Welcome>
            <h1>Welcome back<br />{authUser.firstName} {authUser.lastName}!</h1>
            <EditButton to="/profile">Edit Name</EditButton>
            </Welcome>
            <Account>
                <AccountContentWrapper>
                    <AccountTitle>Argent Bank Checking (x8349)</AccountTitle>
                    <AccountAmount>$2,082.79</AccountAmount>
                    <AccountAmountDesc>Available Balance</AccountAmountDesc>
                    <CallToAction>
                        <TransactionButton>View transactions</TransactionButton>
                    </CallToAction>
                </AccountContentWrapper>
            </Account>
            <Account>
                <AccountContentWrapper>
                    <AccountTitle>Argent Bank Savings (x6712)</AccountTitle>
                    <AccountAmount>$10,928.42</AccountAmount>
                    <AccountAmountDesc>Available Balance</AccountAmountDesc>
                    <CallToAction>
                        <TransactionButton>View transactions</TransactionButton>
                    </CallToAction>
                </AccountContentWrapper>
            </Account>
            <Account>
                <AccountContentWrapper>
                    <AccountTitle>Argent Bank Credit Card (x8349)</AccountTitle>
                    <AccountAmount>$184.30</AccountAmount>
                    <AccountAmountDesc>Current Balance</AccountAmountDesc>
                    <CallToAction>
                        <TransactionButton>View transactions</TransactionButton>
                    </CallToAction>
                </AccountContentWrapper>
            </Account>
        </Main>
    )
}

export default User
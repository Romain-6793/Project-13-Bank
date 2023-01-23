import styled from 'styled-components'
import colors from '../../utils/style/colors'

const MainWrapper = styled.div`
width: 100%;
height: 500px;
display: flex;
flex-flow: column wrap;
justify-content: center;
align-items: center;
`
const Err404 = styled.span`
font-size: 144px;
font-weight: 700;
color: ${colors.primary}
`

const ErrorMessage = styled.p`
font-size: 22px;
font-weight: 300px;
color: ${colors.secondary}
`

function Error() {
  return (
    <MainWrapper>
        <Err404>404</Err404>
        <ErrorMessage>We're sorry, we cannot find a user, please sign in to access this page.</ErrorMessage>
    </MainWrapper>
  )
}

export default Error

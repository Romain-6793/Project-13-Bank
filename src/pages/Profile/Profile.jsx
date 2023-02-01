import styled from 'styled-components'
import colors from '../../utils/style/colors'
import UserCircle from '../../assets/user-circle.svg'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { editUser } from '../../slices/authSlice'
import { useNavigate } from 'react-router-dom'

const Main = styled.main`
flex: 1;
background-color: ${colors.dark};
padding-top: 1px;
display: block;
height: 600px;
`

const EditContent = styled.section`
box-sizing: border-box;
 background-color: white;
 width: 300px;
 margin: 0 auto;
 margin-top: 3rem;
 padding: 2rem;
`

const UserLogo = styled.img`
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

const EditButton = styled.button`
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

const EditError = styled.p`
font-weight: bold;
color: ${colors.secondary};
`

function Profile() {

const dispatch = useDispatch()
let navigate = useNavigate()

const [changedUser, setChangedUser] = useState({
firstName : "",
lastName : "",
 })

const handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (changedUser.firstName !== "" && changedUser.lastName !== "") {
    dispatch(editUser(changedUser)) // -> reducer
    navigate("/user")
  }
 }


return (
<Main>
  <EditContent>
    <UserLogo src={UserCircle} />
    <h1>Edit your name</h1>
    <form onSubmit={handleSubmit}>
      <InputWrapper>
        <InputWrapperLabel htmlFor="firstName">First name</InputWrapperLabel>
        <StyledInput type="text" id="firstName" onChange={(e) => setChangedUser({...changedUser, firstName:e.target.value})} />
      </InputWrapper>
      <InputWrapper>
        <InputWrapperLabel htmlFor="lastName">Last name</InputWrapperLabel>
        <StyledInput type="text" id="lastName" onChange={(e) => setChangedUser({...changedUser, lastName:e.target.value})} />
      </InputWrapper>
      <EditButton type="submit">Edit</EditButton>
      {changedUser.firstName === "" || changedUser.lastName ==="" ? <EditError>Please fill in all fields</EditError> : null }
    </form>
  </EditContent>
</Main>
)
}

export default Profile

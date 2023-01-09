
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import colors from './colors'

export const StyledLink = styled(Link)`
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

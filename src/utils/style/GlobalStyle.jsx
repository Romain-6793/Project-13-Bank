import { createGlobalStyle } from 'styled-components'

const StyledGlobalStyle = createGlobalStyle`
    * {
      font-family: Avenir, Helvetica, Arial, sans-serif;
    }

    a {
      text-decoration: none;
    }

`

function GlobalStyle() {
  return <StyledGlobalStyle />
}

export default GlobalStyle

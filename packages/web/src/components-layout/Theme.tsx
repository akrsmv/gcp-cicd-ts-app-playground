import styled, { DefaultTheme } from 'styled-components'

export const ContainerStyled = styled.div`
    display: grid;
    height: 100vh;
    text-align: center;
    grid-gap: 0.25rem;
    transition: all 0.25s ease-in-out;
    color: ${({ theme: { colors } }) => colors.light};

    @media only screen and (max-width: 550px) {
        grid-template-columns: 1fr;
        grid-template-rows: 0.1fr 0.2fr 1fr 1fr 0.1fr;
        grid-template-areas:
            "nav"
            "sidebar"
            "main"
            "content"
            "footer";
    }
    @media only screen and (min-width: 550px) {
        grid-template-columns: 0.1fr 1fr;
        grid-template-rows: 0.1fr 1fr 0.2fr 0.1fr;
        grid-template-areas:
            "nav nav"
            "sidebar main"
            "sidebar content"
            "sidebar footer";
    }
    @media only screen and (min-width: 1200px) {
        grid-template-columns: 0.2fr 1fr 1fr 0.1fr;
        grid-template-rows: 0.1fr 1fr 0.5fr 0.1fr;
        grid-template-areas:
            "nav nav nav nav"
            "sidebar main main main"
            "sidebar content content content"
            "sidebar footer footer footer";
}`;

export const MainStyled = styled.main`
  grid-area: main;
  width: 100%;
  height: 100%;
  color: black;
  #full-space {
    width: 100%;
    height: 100%;
  }
`;

/**
 * Intended to contain one or more <ContentStyled> elements
 */
export const ContentBoxesStyled = styled.div`
    margin-left: -0.25rem;
    display: flex;
    gap: 0.25rem;
    padding: 0.25rem;
    align-items: center;
    grid-area: content;
    justify-content: center;
    @media (max-width: 992px) {
        flex-direction: column;
        margin-left: 0.07em;
    }
`;

export const FooterStyled = styled.footer`
    background: ${({ theme: { colors } }) => colors.white};
    grid-area: footer;
    padding: 0.25rem;
    text-align: left;
    border: 1px solid ${({ theme: { colors } }) => colors.onyx};
`;
export const SideBarStyled = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: content;
    color: ${({ theme: { colors } }) => colors.dark};
    background: ${({ theme: { colors } }) => colors.white};
    grid-area: sidebar;
    padding: 0.25rem;
    border: 1px solid ${({ theme: { colors } }) => colors.onyx};

    #under-construction-img {
        width: 100%;
        margin-top: auto;
        background-color: ${({ theme: { colors } }) => colors.orange};
    }

    nav {
        width: 100%;
        strong {
            display: inline-flex;
            justify-content: center;
            max-width: 100%;
            line-height: 1.2;
            padding: 0.5em 0.1em;
        }
        button {
            display: inline-flex;
            justify-content: center;
            max-width: 100%;
            line-height: 1.2;
            padding: 0.5em 0.1em;
        }
        button::before,
        button::after {
            content: '';
            display: inline-block;
            width: 2em;
            flex-basis: 2em;
            float: left;
        }
    }
`;
export const NavBarStyled = styled.header`
    grid-area: nav;    
    display: flex;  
    @media (max-width: 992px) {
        flex-direction: column;
    }
    background-color: ${({ theme: { colors } }) => colors.onyx};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.large};
    
    nav {
        width: 100%;
    }

    ul.top-left-nav {
        text-align: left;
        margin: 0;
        padding-bottom: 0;
    }

    ul.top-right-nav {
        text-align: right;
        margin: 0;
        padding-bottom: 0;
    }
    li {
        display: inline;
        border-radius: 3px;
        margin-right:20px;
        background-color: ${({ theme: { colors } }) => colors.light};
    }
    li a
    {
        color:${({ theme: { colors } }) => colors.onyx};
        text-decoration: none;
        padding: 0.7em 0.7em 0.7em 0.7em;
    }
    li a:hover
    {
        text-transform: uppercase;
        text-decoration: none;
    }
    li a.active
    {
        color: ${({ theme: { colors } }) => colors.orange};
        text-decoration: none;
    }
`;


export const defaultTheme: DefaultTheme = {
    borderRadius: '3px',
    colors: {
        light: "#F1F1F1",
        dark: "#534c45",
        onyx: "#b7b7b7",
        orange: "#FF9637"
    },
    fonts: ["-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "'Roboto'", "'Oxygen'",
        "'Ubuntu'", "'Cantarell'", "'Fira Sans'", "'Droid Sans'", "'Helvetica Neue'",
        "sans-serif"],
    fontSizes: {
        small: "0.7em",
        medium: "0.8em",
        large: "1.1em"
    },
    fontWeight: 400
}

export const ContentStyled = styled.div`
  background: ${({ theme: { colors } }) => colors.onyx};
  padding: 0.25em;
  width: 100%;
  height: 100%;
`;

export const NivoContainerStyled = styled.div`
    with: 100%;
    height: 100%;
    div {
        display: grid;
        top: 0px;
        right: 0px;
        width: 150px;
        height: 20px;
    }
`;


export const InputStyled = styled.input
    `
    background-color: ${({ theme: { colors } }) => colors.light};  
    color: ${({ theme: { colors } }) => colors.dark};  
    font-family: ${({ theme: { fonts } }) => fonts.join(",")};
    font-weight: ${({ theme: { fontWeight } }) => fontWeight};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.medium};
    text-align: left;
    margin: 0 0 0 10px;
    width: 200px;
    letter-spacing: .25px;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    outline: none;
    box-shadow: none;
    text-shadow: none;
    border: none;
    -webkit-border-radius: ${({ theme: { borderRadius } }) => borderRadius};
    -moz-border-radius: ${({ theme: { borderRadius } }) => borderRadius};
    border-radius: ${({ theme: { borderRadius } }) => borderRadius};
    text-decoration: none;
    padding: 8.5px 10px;
    line-height: 1;
`;

// One can also add more properties via custom constructor 
// eg: const GCTButton1 = styled(GCTButton)`...`
// eg: const GCTButton1 = styled.button.attrs(props => ({ ... }))`...`
// eg: const GCTButton1 = styled(GCTButton).attrs(props => ({ ... }))`...`

export const ButtonStyled = styled.button
    `
    background-color: ${({ theme: { colors } }) => colors.light};  
    font-family: ${({ theme: { fonts } }) => fonts.join(",")};
    font-weight: ${({ theme: { fontWeight } }) => fontWeight};
    font-size: ${({ theme: { fontSize } }) => fontSize};
    -webkit-border-radius: ${({ theme: { borderRadius } }) => borderRadius};
    -moz-border-radius: ${({ theme: { borderRadius } }) => borderRadius};
    border-radius: ${({ theme: { borderRadius } }) => borderRadius};
    text-align: center;
    border: none;
    padding: 8.5px 10px 8.5px 10px  ;

`;

export const CheckBoxStyled = styled.input`   
    width: 20px;
    height: 20px;
`;


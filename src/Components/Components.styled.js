import styled from '@emotion/styled';
import { makeStyles } from "@material-ui/core/styles";

export const AudienceText = styled('h3')`
font-size: 1.5rem;
font-weight: bold;
margin: 0 0 0 16px
`

export const GreyText = styled('p')`
font-size: 1rem;
    font-weight: 400;
    color: #d5cdcd;
    margin: 0;
`

export const cardStyles = makeStyles({
    root: {
        minHeight: "100vh",
        backgroundColor: 'white',
        padding: 8,
        marginRight: 3,
        height: '100%',
        boxShadow: '1px 1px 3px 1px #ffffff66'
    },
});

export const StyledTagTitle = styled.div({
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 8,
  });
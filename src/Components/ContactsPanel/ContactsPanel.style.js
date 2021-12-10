import { makeStyles } from "@material-ui/core/styles";
import styled from "@emotion/styled";
export const useStyles = makeStyles((theme) => ({
    search: {
        position: "relative",
        borderRadius: 30,
        backgroundColor: "#e9e9e9",
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(3),
            width: "auto",
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    inputRoot: {
        color: "inherit",
        width: "100%",
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
}));

export const ExportAll = styled.button({
    padding: "8px 8px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#09a391",
    color: "white",
    fontWeight: 500,
    cursor: "pointer",
});

export const ContactsText = styled("h3")`
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0;
  `;


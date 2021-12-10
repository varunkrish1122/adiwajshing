import styled from "@emotion/styled";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

export const TableContainer = styled.div({
    width: "95%",
    overflowX: "auto",
    margin: "16px 8px 0",
});
export const StyledTableCell = withStyles((theme) => ({
    body: {
        fontSize: 13,
    },
    root: {
        padding: 8,
    },
}))(TableCell);

export const StyledTableRow = withStyles((theme) => ({
    root: {
        cursor: "pointer",
        "&:nth-of-type(odd)": {
            backgroundColor: (props) =>
                props["checked"] ? "rgb(193 203 223)" : "#f3f5f9",
        },
        "&:hover": {
            backgroundColor: "#dcecee",
        },
        "&:first-child th:first-child": {
            borderTopLeftRadius: "10px",
        },
        "&:first-child td:last-child": {
            borderTopRightRadius: "10px",
        },
        "&:last-child th:first-child": {
            borderBottomLeftRadius: "10px",
        },
        "&:last-child td:last-child": {
            borderBottomRightRadius: "10px",
        },
        backgroundColor: (props) =>
            props["checked"] ? "rgb(193 203 223)" : "inherit",
    },
}))(TableRow);

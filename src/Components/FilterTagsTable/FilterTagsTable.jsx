import React from "react";
import styled from "@emotion/styled";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import "./FilterTagsTable.css";

const StyledTagTitle = styled.div({
  fontWeight: "bold",
  textAlign: "left",
  marginBottom: 8,
});
const TableContainer = styled.div({
  width: "95%",
  overflowX: "auto",
  margin: "16px 8px 0",
});
const StyledTableCell = withStyles((theme) => ({
  body: {
    fontSize: 13,
  },
  root: {
    padding: 8,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    cursor: "pointer",
    "&:nth-of-type(odd)": {
      backgroundColor: "#cdcdcd",
    },
    "&:hover": {
      backgroundColor: "#b0bdba",
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
  },
}))(TableRow);

const FilterTagsTable = ({ tableTitle, returnSelectedTags, tags }) => {
  return (
    <TableContainer>
      <StyledTagTitle>{tableTitle}:</StyledTagTitle>
      <Table aria-label="tags-table">
        <TableBody>
          {[...tags, {}].map(({ name, checked }, index) => (
            <StyledTableRow key={`${name}-${index}`}>
              <StyledTableCell component="th" scope="row">
                {name}
              </StyledTableCell>
              <StyledTableCell
                style={{ display: "none" }}
                align="right"
              ></StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FilterTagsTable;

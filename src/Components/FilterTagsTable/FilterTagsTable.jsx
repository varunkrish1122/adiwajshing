import React, { useEffect, useState } from "react";
import {noop} from 'lodash';
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import CheckBox from "../CheckBox/CheckBox";
import "./FilterTagsTable.css";
import { StyledTagTitle } from "../Components.styled";

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

const FilterTagsTable = ({ tableTitle, tagType, setTagFilter=noop }) => {
  let tags = useSelector((state) => state?.tagsData?.tagsSucess?.tags);
  const [renderTags, setRenderTags] = useState([]);
  const updateParentValues = () => {    
    const selectedTags = renderTags.filter(({checked}) => !!checked)
    setTagFilter(selectedTags, tagType)
  }
  const tagClickHandler = (tagName) => {    
    const tagIndex = renderTags.findIndex(({ name }) => name === tagName);
    const tagInfo = renderTags[tagIndex];
    const { checked } = tagInfo || {};
    tagInfo["checked"] = !checked;
    renderTags[tagIndex] = tagInfo;
    setRenderTags([...renderTags]);
    updateParentValues();
  };
  useEffect(() => {
    setRenderTags(tags);
  }, [tags]);
  useEffect(() => {
    console.log('Calling!!', renderTags, tagType)
    updateParentValues()
  }, [renderTags])
  return (
    <TableContainer>
      <StyledTagTitle>{tableTitle}:</StyledTagTitle>
      <Table aria-label="tags-table">
        <TableBody>
          {renderTags.map(({ name, checked }, index) => (
            <StyledTableRow
              checked={checked}
              key={`${name}-${index}-${tagType}`}
              onClick={() => tagClickHandler(name)}
            >
              <StyledTableCell component="th" scope="row">
                {name}
              </StyledTableCell>
              <StyledTableCell align="right">
                <CheckBox checked={!!checked} />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FilterTagsTable;

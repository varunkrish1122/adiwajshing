import React, { useEffect, useState } from "react";
import { noop } from "lodash";
import { useSelector } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";

import CheckBox from "../CheckBox/CheckBox";
import { StyledTagTitle } from "../Components.styled";
import {TableContainer, StyledTableCell, StyledTableRow, } from './FilterTagsTable.style'

const FilterTagsTable = ({ tableTitle, tagType, setTagFilter = noop }) => {
  let tags = useSelector((state) => state?.tagsData?.tagsSucess?.tags);
  const [renderTags, setRenderTags] = useState([]);
  const updateParentValues = () => {
    const selectedTags = renderTags.filter(({ checked }) => !!checked);
    setTagFilter(selectedTags, tagType);
  };
  const tagClickHandler = (tagName) => {
    const newRenderTags = [...renderTags]
    const tagIndex = newRenderTags.findIndex(({ name }) => name === tagName);
    const tagInfo = newRenderTags[tagIndex];
    const { checked } = tagInfo || {};
    tagInfo["checked"] = !checked;
    newRenderTags[tagIndex] = tagInfo;
    setRenderTags([...newRenderTags]);
    updateParentValues();
  };
  useEffect(() => {
    if (renderTags.length === 0) {
      setRenderTags(tags.map(({ name }) => ({ name, checked: false })));
    }
  }, [tags]);
  useEffect(() => {
    updateParentValues();
  }, [renderTags]);
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

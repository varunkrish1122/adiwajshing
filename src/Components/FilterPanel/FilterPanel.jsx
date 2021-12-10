import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "@emotion/styled";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignCenter";
import TextField from "@material-ui/core/TextField";

import { AudienceText, GreyText, cardStyles } from "../Components.styled";
import FilterTagsTable from "../FilterTagsTable/FilterTagsTable";
import { Creators as tagActions } from "../../store/actions/tagsActions";
import { StyledTagTitle } from "../Components.styled";
import { Creators as contactActions } from "../../store/actions/contactsActions";

import "./FilterPanel.css";

const numCheck= (event) => {
var keyCode = event.keyCode;
if (keyCode > 31 &&(keyCode <48 || keyCode >57)) event.preventDefault()
}
const StyledButton = styled.button({
  padding: "8px 8px",
  width: "90%",
  fontSize: "16px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#09a391",
  color: "white",
  fontWeight: 500,
  cursor: "pointer",
});
const TagsDiv = styled.div({});
const FilterPanel = ({}) => {
  const dispatch = useDispatch();
  const [includeTags, setIncludeTags] = useState([])
  const [excludeTags, setExcludeTags] = useState([])
  const [minMax, setMinMax] = useState({
    minMessagesSent: 0,
    minMessagesRecv: 0,
    maxMessagesSent: 0,
    maxMessagesRecv: 0
  });

  const { totalCount } = useSelector(
    (state) => state?.contactsData?.contactsSucess
  );
  const cardClasses = cardStyles();
  const onChangeHandler = (event, key) => {
    const value = event.target.value;
    setMinMax({...minMax, [key]: value})
  }
  useEffect(() => {
    dispatch(tagActions.tagsRequest());
  }, []);
  
  const saveFilters = () => {
    const notTags = excludeTags.reduce((acc, {name}, index) => {
      return `${acc}${name}`+(index === (excludeTags.length - 1) ? '' : '&notTags=')
    }, '');
    const includeTagsQuery = includeTags.reduce((acc, {name}, index) => {
      return `${acc}${name}`+(index === (includeTags.length - 1) ? '' : '&tags=')
    }, '');
    const getMinMaxParams = () => {
      const {
        minMessagesSent,
        minMessagesRecv,
        maxMessagesSent,
        maxMessagesRecv
      } = minMax;
      return{
      ...(!!minMessagesRecv ? {minMessagesRecv} : {}),
      ...(!!maxMessagesRecv ? {maxMessagesRecv} : {}),
      ...(!!maxMessagesSent ? {maxMessagesSent} : {}),
      ...(!!minMessagesSent ? {minMessagesSent} : {}),
    }
  }
    const requestParmas = {
      returnTotalCount: true,
      ...getMinMaxParams(),
      ...(!!notTags ? {notTags} : {}),
      ...(!!includeTagsQuery ? {tags: includeTagsQuery} : {})
    };
    dispatch(contactActions.contactsRequest(requestParmas));
  };

  const setTagFilter = (data, type) => {
    if(type === 'include'){
      setIncludeTags(data)
    }else{
      setExcludeTags(data)
    }
  };

  return (
    <Card className={cardClasses.root}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          container
          direction="row"
          xs={7}
          display="flex"
          alignItems="center"
          wrap="nowrap"
        >
          <FormatAlignCenterIcon />
          <AudienceText>Audience</AudienceText>
        </Grid>
        <Grid item xs={5}>
          <GreyText>{totalCount} Contacts</GreyText>
        </Grid>
      </Grid>
      <TagsDiv>
        <FilterTagsTable
          tableTitle="Included Tags"
          tagType="include"
          setTagFilter={setTagFilter}
        />
        <FilterTagsTable
          tableTitle="Excluded Tags"
          tagType="exclude"
          setTagFilter={setTagFilter}
        />
      </TagsDiv>
      <div style={{ padding: "16px 0 8px" }}>
        <StyledTagTitle>Message Sent:</StyledTagTitle>
        <Grid container display="row" spacing={2}>
          <Grid item xs={6}>
            <TextField
              id="filled-basic"
              label="Min"
              variant="filled"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              onKeyDown={numCheck}
              onChange={(event) => onChangeHandler(event, 'minMessagesSent')}
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="filled-basic"
              label="Max"
              variant="filled"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              onKeyDown={numCheck}
              onChange={(event) => onChangeHandler(event, 'maxMessagesSent')}
              size="small"
            />
          </Grid>
        </Grid>
      </div>
      <div style={{ padding: "16px 0 8px" }}>
        <StyledTagTitle>Message Received:</StyledTagTitle>
        <Grid container display="row" spacing={2}>
          <Grid item xs={6}>
            <TextField
              id="filled-basic"
              label="Min"
              variant="filled"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              onKeyDown={numCheck}
              onChange={(event) => onChangeHandler(event, 'minMessagesRecv')}
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="filled-basic"
              label="Max"
              variant="filled"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              onKeyDown={numCheck}
              onChange={(event) => onChangeHandler(event, 'maxMessagesRecv')}
              size="small"
            />
          </Grid>
        </Grid>
      </div>
      <StyledButton onClick={saveFilters}>Save Filters</StyledButton>
    </Card>
  );
};

export default FilterPanel;

import React, {useState, useEffect} from "react";
import styled from '@emotion/styled'
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignCenter";

import { AudienceText, GreyText, cardStyles } from "../Components.styled";
import FilterTagsTable from '../FilterTagsTable/FilterTagsTable';
import ContactServices from "../../Services/ContactServices";

import "./FilterPanel.css";

const StyledButton = styled.button({
    padding: '8px 8px',
    width: '90%',
    fontSize: '16px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#52ad9e',
    position: 'relative',
    top: '135px',
    color: 'white',
    fontWeight: 500,
    cursor: "pointer"
})
const FilterPanel = ({}) => {
  const [includeTags, setIncludeTags] = useState([])
  const [excludeTags, setExcludeTags] = useState([])
  const cardClasses = cardStyles();
  useEffect(() => {
    const contactServices = new ContactServices();
    contactServices.getAllTags().then((response) => {
      const {data = {}} = response;
      const {tags = []} = data;
      setIncludeTags(tags)
      setExcludeTags(tags)
    })
  }, [])
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
        direction="row" xs={8} display='flex' alignItems="center" 
        wrap='nowrap'>
          <FormatAlignCenterIcon />
          <AudienceText>Audience</AudienceText>
        </Grid>
        <Grid item xs={4}>
          <GreyText>
            100 Contacts
          </GreyText>
        </Grid>
      </Grid>
      <FilterTagsTable tableTitle="Included Tags" tags={includeTags} />
      <FilterTagsTable tableTitle="Excluded Tags" tags={excludeTags} />
      <StyledButton>Save Filters</StyledButton>
    </Card>
  );
};

export default FilterPanel;

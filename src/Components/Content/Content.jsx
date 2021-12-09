import React from "react";
import Grid from "@material-ui/core/Grid";

import ContactsPanel from '../ContactsPanel/ContactsPanel';
import FilterPanel from '../FilterPanel/FilterPanel';

import "./Content.css";

const Content = ({}) => {
  return (
    <Grid container>
      <Grid item xs={3}>
          <FilterPanel />
      </Grid>
      <Grid item xs={9}>
          <ContactsPanel />
      </Grid>
    </Grid>
  );
};

export default Content;

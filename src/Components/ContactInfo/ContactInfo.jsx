import React, { useEffect, useState } from "react";
import {noop} from 'lodash';
import styled from "@emotion/styled";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Chip from "@mui/material/Chip";

import CheckBox from "../CheckBox/CheckBox";

const UserName = styled.span({
  fontSize: 16,
  fontWeight: 500,
});
const PhoneNumber = styled.span({
  fontSize: 12,
  color: "grey",
});

const AddTags = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
});

const Tags = styled.div({
  marginRight: 24,
});

const ContactDiv = styled.div`
  display: flex;
  align-items: flex-start;
  margin-left: 16px;
  flex-direction: column;
  justify-content: space-between;
  align-content: space-between;
`;
const defaultUrl =
  "https://www.clipartmax.com/png/middle/171-1717870_stockvader-predicted-cron-for-may-user-profile-icon-png.png";
const ContactInfo = ({ checked, contactId, name, phoneNumber, tags, onClickHandler=noop }) => {
  const useStyles = makeStyles({
    root: {
      cursor: "pointer",
      padding:8,
      borderBottom: '1px solid #cfcfcf',
      backgroundColor: checked ? '#f5efef' : 'inherit',
      "&:hover": {
        backgroundColor: "#f5efef",
      },
    },
  });
  const [userImage, setUserImage] = useState(defaultUrl);
  const styles = useStyles();
  useEffect(() => {}, []);
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      className={styles.root}
      onClick={onClickHandler}
    >
      <Grid item xs={5}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <CheckBox checked={!!checked} />
          <img src={userImage} alt={name} style={{ width: "10%" }} />
          <ContactDiv>
            <UserName>{name}</UserName>
            <PhoneNumber>{phoneNumber}</PhoneNumber>
          </ContactDiv>
        </div>
      </Grid>
      <Grid item xs={7}>
        <AddTags>
          <Tags>
            {tags.map(({ name }) => (
              <Chip
                label={name}
                variant="outlined"
                color="primary"
                onClick={() => {}}
                onDelete={() => {}}
              />
            ))}
          </Tags>
          <AddCircleIcon style={{ color: "#64b5b9" }} />
        </AddTags>
      </Grid>
    </Grid>
  );
};

export default ContactInfo;

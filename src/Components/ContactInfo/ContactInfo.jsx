import React, { useEffect, useState } from "react";
import { noop } from "lodash";
import styled from "@emotion/styled";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CancelIcon from "@material-ui/icons/Cancel";

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

const Chip = styled.div({
  backgroundColor: "#10a6df",
  color: "white",
  display: "flex",
  flexDirection: "row",
  alignContent: "center",
  alignItems: "center",
  padding: "0 4px",
  borderRadius: 16,
  fontSize: 14,
});

const ChipSpan = styled.div({
  overflow: "hidden",
  textOverflow: "ellipsis",
  padding: "0 12px",
  whiteSpace: "nowrap",
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
const ContactInfo = ({
  checked,
  contactId,
  name,
  phoneNumber,
  tags,
  onClickHandler = noop,
}) => {
  const useStyles = makeStyles({
    root: {
      cursor: "pointer",
      padding: 8,
      borderBottom: "1px solid #cfcfcf",
      backgroundColor: checked ? "rgb(193 203 223)" : "inherit",
      "&:hover": {
        backgroundColor: "#dcecee",
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
            {tags.map(({ name }, index) => (
              <Chip key={`${name}-${index}`}>
                <ChipSpan>{name}</ChipSpan>
                <CancelIcon style={{ fontSize: "inherit" }} />
              </Chip>
            ))}
          </Tags>
          <AddCircleIcon style={{ color: "#09a391" }} />
        </AddTags>
      </Grid>
    </Grid>
  );
};

export default ContactInfo;

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

import { cardStyles } from "../Components.styled";
import CheckBox from "../CheckBox/CheckBox";
import ContactInfo from "../ContactInfo/ContactInfo";
import { Creators as contactActions } from "../../store/actions/contactsActions";
import {useStyles, ExportAll, ContactsText} from './ContactsPanel.style';

const ContactsPanel = () => {
  const dispatch = useDispatch();
  const cardClasses = cardStyles();
  const classes = useStyles();
  const { totalCount, nextPage } = useSelector(
    (state) => state?.contactsData?.contactsSucess
  );
  let contacts = useSelector(
    (state) => state?.contactsData?.contactsSucess?.contacts
  );
  const [searchItem, setSearchItem] = useState("");
  const [renderContacts, setRenderContacts] = useState([]);
  const handleChange = (event) => {
    setSearchItem(event.target.value);
  };
  const debounceSearchHandler = useMemo(() => {
    return debounce(handleChange, 300);
  }, []);
  const onContactSelectHandler = (id) => {
    const contactInfoIndex = contacts.findIndex(
      ({ id: contactId }) => id === contactId
    );
    const contactInfo = contacts[contactInfoIndex];
    const { checked } = contactInfo;
    contactInfo["checked"] = !checked;
    contacts[contactInfoIndex] = contactInfo;
    renderContactList();
  };
  const renderContactList = () => {
    const newRenderContacts = contacts.filter(({ name }) =>
      name.toLowerCase().includes(searchItem.toLowerCase())
    );
    setRenderContacts(newRenderContacts);
  };
  useEffect(() => {
    renderContactList();
  }, [searchItem, contacts]);
  useEffect(() => {
    const requestParmas = {
      returnTotalCount: true,
    };
    dispatch(contactActions.contactsRequest(requestParmas));
    return () => {
      debounceSearchHandler.cancel();
    };
  }, []);
  const allContactsSelected = renderContacts.every(({ checked }) => !!checked);
  const allContactsSelectedHandler = () => {
    let newContacts = [];
    if (allContactsSelected) {
      newContacts = renderContacts.map((obj) => ({ ...obj, checked: false }));
    } else {
      newContacts = renderContacts.map((obj) => ({ ...obj, checked: true }));
    }
    contacts = newContacts;
    setRenderContacts(newContacts);
  };

  // Infinite Scroll We can Write Hook as well
  const observer = useRef();
  const referenceDiv = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const [element1, element2] = nextPage ? JSON.parse(nextPage) : "";
        const page = `["${element1}",${element2}]`;
        const requestParmas = {
          returnTotalCount: true,
          page: page,
        };
        dispatch(contactActions.updateRequest(requestParmas));
      }
    });
    if (node) observer.current.observe(node);
  });
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
          xs={11}
          display="flex"
          alignItems="center"
          wrap="nowrap"
        >
          <ContactsText>All Contacts({totalCount})</ContactsText>
        </Grid>
        <Grid item xs={1} style={{ textAlign: "right" }}>
          <AddCircleIcon style={{ color: "#64b5b9" }} />
        </Grid>
        <Grid item xs={12} style={{ marginTop: 16 }}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search Contacts"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={debounceSearchHandler}
            />
          </div>
        </Grid>
        <Grid
          container
          xs={12}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          style={{ margin: "16px 0" }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <CheckBox
              checked={allContactsSelected}
              onClickHandler={allContactsSelectedHandler}
            />
            <span>Select All</span>
          </div>
          <ExportAll>Export All</ExportAll>
        </Grid>
        {renderContacts.map(
          ({ checked, id, name, phoneNumber, tags }, index) => (
            <div
              {...(index === contacts.length - 7 ? { ref: referenceDiv } : {})}
              key={`${name}-${index}`}
            >
              <ContactInfo
                checked={checked}
                contactId={id}
                name={name}
                phoneNumber={phoneNumber}
                tags={tags}
                onClickHandler={() => onContactSelectHandler(id)}
              />
            </div>
          )
        )}
      </Grid>
    </Card>
  );
};

export default ContactsPanel;

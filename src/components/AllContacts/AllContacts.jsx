import css from "./AllContacts.module.css";

import clear from "../../img/clear_24dp_5F6368.png";

import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

import {
  useDeleteContactMutation,
  useGetContactsQuery,
} from "../../RTKQuery/contactsSlice";
import { LoaderSpiner } from "../../services/LoaderSpiner";
import { NavLink } from "react-router-dom";

import { Toastify } from "../../services/Toastify";
import { ToastContainer } from "react-toastify";
import { ToastError } from "../../services/ToastError";
import { useEffect } from "react";

const AllContacts = () => {
  const { data, isLoading, error } = useGetContactsQuery();
  const [deleteContact] = useDeleteContactMutation();

  useEffect(() => {
    error && ToastError("Error, try again later");
  }, [error]);

  const handleDeleteClick = async (deleteId) => {
    try {
      const data = await deleteContact(deleteId);
      if (data?.error?.data?.message || data?.error?.status) {
        ToastError(data?.error?.data?.message || data?.error?.status);
        return;
      }
      Toastify("Contact delete successfully");
    } catch (error) {}
  };

  return (
    <div>
      <ToastContainer />
      <h1>Contacts</h1>
      {isLoading && (
        <div className={css.loader}>
          <LoaderSpiner />
        </div>
      )}

      <List>
        {data?.resources?.map(({ avatar_url, fields, id, tags2 }) => (
          <>
            <ListItem key={id} className={css.list_item}>
              <NavLink to={id} className={css.link}>
                <ListItemAvatar className={css.avatar}>
                  <Avatar>
                    <img src={avatar_url} alt="avatar" />
                  </Avatar>
                </ListItemAvatar>

                <ListItemText className={css.text_list_item}>
                  {`${fields["first name"]?.[0].value} ${fields["last name"]?.[0].value}`}
                  <div>{fields?.email?.[0].value}</div>

                  {tags2?.map((tag) => (
                    <div className={css.tag_container}>
                      <button className={css.tag}>{tag}</button>
                    </div>
                  ))}
                </ListItemText>
              </NavLink>
              <button
                className={css.btn_clear}
                onClick={() => handleDeleteClick(id)}
              >
                <div className={css.img_clear}>
                  <img src={clear} alt="clear" />
                </div>
              </button>
            </ListItem>
          </>
        ))}
      </List>
    </div>
  );
};

export default AllContacts;

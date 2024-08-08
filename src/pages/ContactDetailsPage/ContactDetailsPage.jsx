import css from "./ContactDetailsPage.module.css";

import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
} from "@mui/material";

import {
  useGetContactByIdQuery,
  usePutTagsContactMutation,
} from "../../RTKQuery/contactsSlice";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoaderSpiner } from "../../services/LoaderSpiner";
import { Toastify } from "../../services/Toastify";
import { ToastContainer } from "react-toastify";
import { ToastError } from "../../services/ToastError";

const ContactDetailsPage = () => {
  const { contactId } = useParams();

  const [prevTag, setPrevTag] = useState({
    tag: [],
  });
  const [addTags, setAddTags] = useState([]);
  const [render, setRender] = useState(true);

  const { data, isLoading, error } = useGetContactByIdQuery(contactId);

  useEffect(() => {
    error && ToastError("Error, try again later");
  }, [error]);

  const [putTagsContact] = usePutTagsContactMutation();

  useEffect(() => {
    if (render) {
      console.log("useEffect");

      const searchTag = data?.resources[0]?.tags;

      searchTag?.filter(({ tag }) =>
        tag.length > -1 ? addTags.push(tag) : ""
      );
    }
  }, [addTags, data?.resources, render]);

  const handleChangeForm = (e) => {
    const { value } = e.target;

    if (value === "") return;

    setPrevTag({
      tag: value,
    });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    addTags.push(prevTag.tag);

    try {
      const data = await putTagsContact({ id: contactId, tags: addTags });

      if (data?.error?.data?.message || data?.error?.status) {
        ToastError(data?.error?.data?.message || data?.error?.status);
        return;
      }

      Toastify("Tag saved successfully");
    } catch (error) {
    } finally {
      setRender(false);
    }

    setPrevTag({
      tag: "",
    });
  };

  return (
    <div>
      <ToastContainer />
      {isLoading && (
        <div className={css.loader}>
          <LoaderSpiner />
        </div>
      )}
      <List>
        {data?.resources?.map(({ avatar_url, fields, id, tags2, tags }) => (
          <ListItem key={id} className={css.list_item}>
            <ListItemAvatar className={css.avatar}>
              <Avatar>
                <img src={avatar_url} alt="avatar" />
              </Avatar>
            </ListItemAvatar>

            <ListItemText className={css.text_list_item}>
              {`${fields["first name"]?.[0].value} ${fields["last name"]?.[0].value}`}
              <div>{fields?.email?.[0].value}</div>
            </ListItemText>
            {tags2.length > 0 && <p className={css.descr}>Tags</p>}
            {tags.map(({ tag }) => (
              <div className={css.tag_container}>
                <button className={css.tag}>{tag}</button>
              </div>
            ))}

            <form onSubmit={handleSubmitForm} className={css.form}>
              <TextField
                id="outlined-controlled"
                type="text"
                name="first name"
                label="Add new Tag"
                value={prevTag.tag}
                className={css.inputField}
                onChange={handleChangeForm}
              />

              <div className={css.btn_container}>
                <Button
                  type="submit"
                  variant="outlined"
                  className={css.btn_submitForm}
                >
                  Add Tag
                </Button>
              </div>
            </form>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ContactDetailsPage;

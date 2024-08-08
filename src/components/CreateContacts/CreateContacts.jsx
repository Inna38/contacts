import css from "./CreateContacts.module.css";

import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { usePostContactMutation } from "../../RTKQuery/contactsSlice";

import { Toastify } from "../../services/Toastify";
import { ToastError } from "../../services/ToastError";

import contactSchema from "../../services/validationContactSchema";

const CreateContacts = () => {
  const [postContact] = usePostContactMutation();

  const [errorField, setErrorField] = useState({});

  const [formData, setFormData] = useState({
    avatar_url: "https://live.devnimble.com/api/avatars/person_default",

    fields: {
      email: [
        {
          label: "",
          modifier: "",
          value: "",
          is_primary: false,
        },
      ],
      "first name": [
        {
          label: "",
          modifier: "",
          value: "",
          is_primary: false,
        },
      ],
      "last name": [
        {
          label: "",
          modifier: "",
          value: "",
          is_primary: false,
        },
      ],
    },
    record_type: "person",
    privacy: {
      edit: null,
      read: null,
    },
  });

  const handleChangeForm = (e) => {
    const { name, value } = e?.target;
    setFormData({
      ...formData,
      fields: {
        ...formData.fields,
        [name]: [
          {
            label: name,
            modifier: "",
            value: value,
            is_primary: false,
          },
        ],
      },
    });

    setErrorField({
      fields: [
        {
          ...errorField,
          [name]: "",
        },
      ],
    });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    console.log(formData);
    contactSchema
      .validate(formData, { abortEarly: false })
      .then(async () => {
        try {
          const data = await postContact(formData);
          if (data?.error?.data?.message || data?.error?.status) {
            ToastError(data?.error?.data?.message || data?.error?.status);
            return;
          }
          Toastify("Contact save successfully");
        } catch (error) {}

        setErrorField({});
        setFormData({
          ...formData,
          fields: {
            email: {
              ...formData,
              value: "",
            },
            "first name": {
              ...formData,
              value: "",
            },
            "last name": {
              ...formData,
              value: "",
            },
          },
        });
      })
      .catch((validationErrors) => {
        const errorsMap = {};
        validationErrors.inner.forEach((error) => {
          errorsMap[error.path] = error.message;
        });

        setErrorField(errorsMap);
      });
  };

  return (
    <div className={css.createContact_container}>
      <h1 className={css.title}>Create Contact</h1>
      <form onSubmit={handleSubmitForm}>
        <p className={css.textField}>First Name</p>
        <TextField
          id="outlined-controlled"
          type="text"
          name="first name"
          value={formData?.fields["first name"].value}
          className={`${css.inputField}  ${
            errorField["fields.first name[0].value"]?.length > 0
              ? css.errorField
              : ""
          }`}
          onChange={handleChangeForm}
        />
        {errorField["fields.first name[0].value"]?.length > 0 && (
          <p className={css.errorText}>
            {errorField["fields.first name[0].value"]}
          </p>
        )}

        <p className={css.textField}>Last Name</p>
        <TextField
          id="outlined-controlled"
          type="text"
          name="last name"
          value={formData?.fields["last name"].value}
          className={`${css.inputField}  ${
            errorField["fields.last name[0].value"]?.length > 0
              ? css.errorField
              : ""
          }`}
          onChange={handleChangeForm}
        />
        {errorField["fields.last name[0].value"]?.length > 0 && (
          <p className={css.errorText}>
            {errorField["fields.last name[0].value"]}
          </p>
        )}

        <p className={css.textField}>Email</p>

        <TextField
          id="outlined-controlled"
          type="email"
          name="email"
          value={formData?.fields?.email?.value}
          className={`${css.inputField} ${
            errorField["fields.email[0].value"]?.length > 0
              ? css.errorField
              : ""
          }`}
          onChange={handleChangeForm}
        />
        {errorField["fields.email[0].value"]?.length > 0 && (
          <p className={css.errorText}>{errorField["fields.email[0].value"]}</p>
        )}

        <div className={css.btn_container}>
          <Button
            type="submit"
            variant="outlined"
            className={css.btn_submitForm}
          >
            Add Contact
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateContacts;

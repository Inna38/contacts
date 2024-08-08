import * as yup from "yup";

let contactSchema = yup.object().shape({
  fields: yup.object().shape({
    email: yup.array().of(
      yup.object().shape({
        value: yup
          .string()
          .matches(/^[^\s]*$/, "Please enter valid characters")
          .matches(/^[^а-яА-ЯіІїЇєЄ]*$/, "Please enter valid characters")
          .matches(
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Please enter a valid email address"
          )
          .required("Email is required"),
      })
    ),
    "first name": yup.array().of(
      yup.object().shape({
        value: yup.string().required("First name is required"),
      })
    ),
    "last name": yup.array().of(
      yup.object().shape({
        value: yup.string().required("Last name is required"),
      })
    ),
  }),
});

export default contactSchema;

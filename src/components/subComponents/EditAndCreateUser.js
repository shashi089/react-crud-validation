/* eslint-disable no-useless-escape */
import { Formik, Form, Field, ErrorMessage } from "formik";

function EditAndCreateUser(props) {
  const textcheck = /^[a-z ,.'-]+$/i;
  const validateEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return (
    <Formik
      initialValues={{
        name: props.name,
        email: props.email,
        country: props.country,
      }}
      validate={(values) => {
        const errors = {};
        //errors for name
        if (values.name.length === 0) {
          errors.name = "*Required";
        } else if (!textcheck.test(values.name)) {
          errors.name = "*should not contain Special characters and Numbers";
        }
        //errors for country
        if (values.country.length === 0) {
          errors.country = "*Required";
        } else if (!textcheck.test(values.country)) {
          errors.country = "*should not contain Special characters and Numbers";
        }
        //errors for email
        if (values.email.length === 0) {
          errors.email = "*Required";
        } else if (!validateEmail.test(values.email)) {
          errors.email = "*Email is not valid";
        }
        return errors;
      }}
      onSubmit={(values) => {
        props.PostOrPutuser(values);
      }}
      enableReinitialize //this is used to make setstates work such as setName.setEmail,etc then only form will reintialized and values are displayed.
    >
      {() => {
        return (
          <div className="card mx-auto createuser">
            <div className="card-body">
              <Form className="form">
                <div className="form-group">
                  <label className="font-weight-bold">Name:</label>
                  <br />
                  <Field
                    className="form-control"
                    type="text"
                    placeholder="userName"
                    name="name"
                  />
                  <ErrorMessage
                    className="text-danger"
                    name="name"
                    component="div"
                  />
                </div>
                <div className="form-group">
                  <label className="font-weight-bold">Email:</label>
                  <br />
                  <Field
                    className="form-control"
                    type="email"
                    placeholder="Email"
                    name="email"
                  />
                  <ErrorMessage
                    className="text-danger"
                    name="email"
                    component="div"
                  />
                </div>
                <div className="form-group">
                  <label className="font-weight-bold">Country:</label>
                  <br />
                  <Field
                    className="form-control"
                    type="text"
                    placeholder="Country"
                    name="country"
                  />
                  <ErrorMessage
                    className="text-danger"
                    name="country"
                    component="div"
                  />
                </div>
                <br />
                <div className="text-center">
                  <button className="mx-auto btn btn-primary" type="submit">
                    Submit
                  </button>
                </div>
              </Form>
            </div>
          </div>
        );
      }}
    </Formik>
  );
}

export default EditAndCreateUser;

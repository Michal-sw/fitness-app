import "../../styles/auth/Login.scss";
import { Field, Form, Formik } from "formik";
import useAuth from "../../core/providers/AuthContext";
import { LoginDT } from "../../core/types/LoginDT";
import { Alert } from "@mui/material";

function SignIn() {
  const { signIn } = useAuth();

  const handleSignIn = (values: LoginDT) => {
    signIn(values);
  };

  return (
    <>
      <div className={"login_container"}>
        <Formik
          initialValues={{
            login: "",
            password: "",
          }}
          onSubmit={(values) => handleSignIn(values)}
        >
          <Form className={"login_form"}>
            <Field name={"login"} placeholder={"Email or mobile number"} />
            <Field
              name={"password"}
              placeholder={"Password"}
              type={"password"}
            />
            <button type={"submit"} className={"login_button"}>
              Sign in
            </button>
          </Form>
        </Formik>
      </div>
      <Alert id="signin_alert" severity="info">
        If you have problems signing in, please visit{" "}
        <a href="https://michal-sw.com/fitness" target="_blank">
          https://michal-sw.com/fitness
        </a>{" "}
        and mark the website certificate as valid
      </Alert>
    </>
  );
}

export default SignIn;

import React from 'react';
import '../../styles/auth/Login.scss';
import { Field, Form, Formik } from 'formik';
import { LoginDT } from '../../core/types/LoginDT';

function Login() {

  const handleLogin = (values: LoginDT) => {
      // validate values and send to the backend
  }

  return (
    <div className={"login_container"}>
        <Formik initialValues={{
            login: "",
            password: ""
        }} onSubmit={(values) => handleLogin(values)}>
            <Form className={"login_form"}>
                <Field name={"login"} placeholder={"Email or mobile number"} />
                <Field name={"password"} placeholder={"Password"} type={"password"} />
                <button type={"submit"} className={"login_button"}>Log in</button>
                <button className={"forgot_password_button"}>Forgot password?</button>
                <button className={"new_acc_button"}>Create new account</button>
            </Form>
        </Formik>   
    </div>
  )
}

export default Login
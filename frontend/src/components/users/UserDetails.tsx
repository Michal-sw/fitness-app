import "../../styles/users/UserDetails.scss";

import { TextField } from "@mui/material";
import { UserDT } from "../../core/types/UserDT";
import axiosService from "../../services/axiosService";
import useAuth from "../../core/providers/AuthContext";
import { useFormik } from "formik";
import useNotifications from "../../hooks/useNotifications";

interface userDetailsProps {
  user: UserDT;
  isOwner: boolean;
}

const UserDetails = ({ user, isOwner }: userDetailsProps) => {
  const { actions } = useNotifications();
  const { token } = useAuth();

  const formik = useFormik({
    initialValues: {
      login: user.login || "",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
    },
    onSubmit: (values) => {
      if (!values.login)
        return actions.addNotification("Login must not be empty!");
      axiosService
        .updateUser(token, user._id, values)
        .then(() => actions.addSuccessNotification("New profile saved"))
        .catch(() => actions.addErrorNotification("This login is taken"));
    },
  });

  const registrationDate: Date = user
    ? new Date(user.registrationDate)
    : new Date();

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="user-details">
        <div>
          <label>Login: </label>
          <TextField
            id="login"
            name="login"
            value={formik.values.login}
            onChange={formik.handleChange}
            InputProps={{ readOnly: !isOwner }}
            variant="standard"
          />
        </div>
        <div>
          <label>First name: </label>
          <TextField
            id="firstName"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            InputProps={{ readOnly: !isOwner }}
            variant="standard"
          />
        </div>
        <div>
          <label>Last name: </label>
          <TextField
            id="lastName"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            InputProps={{ readOnly: !isOwner }}
            variant="standard"
          />
        </div>
        <div>
          <label>Registration Date: </label>
          <TextField
            InputProps={{ readOnly: true }}
            defaultValue={registrationDate.toLocaleDateString()}
            variant="standard"
          />
        </div>
        {isOwner && <button type="submit">Save profile</button>}
      </div>
    </form>
  );
};

export default UserDetails;

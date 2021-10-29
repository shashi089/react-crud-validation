import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { Context } from "../Context";
import "./components.css";
import EditAndCreateUser from "./subComponents/EditAndCreateUser";

export default function EditUser({ match }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const context = useContext(Context);
  const [userNotEdited, setUserNotEdited] = useState(true);

  //to set the user data in input when clicked editprofile button
  let setInput = async () => {
    let uservalue = context.users.filter((user) => user.id === match.params.id);
    //to fetch api and get user if page refreshed
    if (uservalue.length === 0) {
      const { data } = await axios.get(
        `https://611f263e9771bf001785c72a.mockapi.io/crud/${match.params.id}`
      );
      uservalue.push(data);
    }
    uservalue.forEach((user) => {
      setName(user.name);
      setEmail(user.email);
      setCountry(user.country);
    });
  };

  useEffect(() => {
    setInput();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let PutUser = async () => {
    const { data } = await axios.put(
      `https://611f263e9771bf001785c72a.mockapi.io/crud/${match.params.id}`,
      {
        name: name,
        email: email,
        country: country,
      }
    );

    console.log(data);
    let tempusers = [...context.users];
    let index = context.users.findIndex((user) => user.id === match.params.id);
    tempusers[index] = data;
    context.setUsers(tempusers);
    setUserNotEdited(false);
  };

  return (
    <>
      <div className="container">
        {userNotEdited ? (
          <>
            <h2 className="text-center text-info">
              Edit User {match.params.id}
            </h2>
            <EditAndCreateUser
              name={name}
              email={email}
              country={country}
              PostOrPutuser={PutUser}
            />
          </>
        ) : (
          <>
            <div className="confirm-text  text-center mt-5">
              <h3>
                User Successfully Edited !{" "}
                <i className="fas fa-check-circle"></i>
              </h3>
            </div>
          </>
        )}
      </div>
    </>
  );
}

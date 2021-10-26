import "./components.css";
import axios from "axios";
import { useState, useContext } from "react";
import { Context } from "../Context";
import ProfileEdit from "./subComponents/ProfileEdit";

function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [company, setCompany] = useState("");
  const [city, setCity] = useState("");
  const [state, setStatename] = useState("");
  const context = useContext(Context);
  const [addeduser, setAddeduser] = useState(true);

  //creating
  const postUser = async () => {
    let { data } = await axios.post(
      "https://611f263e9771bf001785c72a.mockapi.io/crud",
      {
        name: name,
        email: email,
        company: company,
        country: country,
        city: city,
        state: state,
      }
    );
    console.log(data);
    let tempost = [...context.users];
    tempost.push(data);
    console.log(tempost);
    context.setUsers(tempost);
    setAddeduser(false);
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    postUser();
  };

  return (
    <>
      <div className="Container">
        {addeduser ? (
          <>
            <h2 className="text-center text-info">Create Profile</h2>
            <ProfileEdit
              name={name}
              email={email}
              company={company}
              country={country}
              state={state}
              city={city}
              setName={setName}
              setEmail={setEmail}
              setCompany={setCompany}
              setCountry={setCountry}
              setStatename={setStatename}
              setCity={setCity}
              handleSubmit={handleSubmit}
            />
          </>
        ) : (
          <>
            <div className="confirm-text text-center mt-5">
              <h3>
                User added Successfully !{" "}
                <i className="fas fa-check-circle"></i>
              </h3>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default CreateUser;

import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { Context } from "../Context";
import { Link } from "react-router-dom";
import "./components.css";

export default function Profile({ match }) {
  const context = useContext(Context);
  const [user, setUser] = useState([]);

  let getUser = async () => {
    let tempuser = context.users.filter((user) => user.id === match.params.id);
    if (tempuser !== 0) {
      setUser(tempuser);
    } else {
      const { data } = await axios.get(
        `https://611f263e9771bf001785c72a.mockapi.io/crud/${match.params.id}`
      );
      console.log(data);
      setUser([data]);
    }
  };

  useEffect(() => {
    getUser();
  });

  return (
    <>
      <div className="container d-flex justify-content-center">
        {user.map((user) => {
          return (
            <div className="card profile mt-3" key={user.id}>
              <div className="card-body">
                <div>
                  <h2 className="text-center ">
                    Profile
                    <Link
                      to={`/edit-profile/${user.id}`}
                      className="btn btn-danger ml-3"
                    >
                      <i className="fas fa-user-edit"></i>
                    </Link>
                  </h2>
                </div>
                <div className="image mt-3 mb-3 ">
                  <img src={user.avatar} alt="avatar" />
                </div>
                <p>
                  <b>Name :</b> {user.name}
                </p>
                <p>
                  <b>Email :</b>

                  {user.email}
                </p>
                <p>
                  <b>Company :</b>

                  {user.company}
                </p>
                <p>
                  <b>Country :</b>

                  {user.country}
                </p>
                <p>
                  <b>State :</b>

                  {user.state}
                </p>
                <p>
                  <b>City :</b>

                  {user.city}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

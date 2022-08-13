import "./App.css";
import {
  FaUser,
  FaRegHandPaper,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";
const url = "https://randomuser.me/api";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";
function App() {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState(null);
  const [value, setValue] = useState("random person");
  const [title, setTitle] = useState("name");

  const getPerson = async () => {
    setLoading(true);
    const res = await fetch(url);
    const data = await res.json();
    const person = data.results[0];
    const { phone, email } = person;
    const { large: image } = person.picture;
    const { password } = person.login;
    const { first, last } = person.name;
    const {
      dob: { age },
    } = person;
    const {
      street: { name, number },
    } = person.location;
    const newPerson = {
      phone,
      email,
      image,
      password,
      age,
      name: `${first}${last}`,
      street: `${name}${number}`,
    };

    setPerson(newPerson);
    setLoading(false);
    setTitle(name);
    setValue(newPerson.name);
  };

  useEffect(() => {
    getPerson()
  }, []);

  const handleValue = (e) => {
    if (e.target.classList.contains('icon')) {
      const newValue = e.target.dataset.label;
      setTitle(newValue);
      setValue(person[newValue]);
    }
  };
  return (
    <div className="App">
      <main>
        <div className="block bcg-black"></div>
        <div className="block">
          <div className="container">
            <img
              src={(person && person.image) || defaultImage}
              alt={"random user"}
              className="user-img"
            />
            <p className="user-title">My {title} is</p>
            <p className="user-value">{value}</p>
            <div className="values-list">
              <button
                className="icon"
                data-label="name"
                onMouseOver={handleValue}
              >
                <FaUser />
              </button>
              <button
                className="icon"
                data-label="email"
                onMouseOver={handleValue}
              >
                <FaRegHandPaper />
              </button>
              <button
                className="icon"
                data-label="age"
                onMouseOver={handleValue}
              >
                <FaCalendarTimes />
              </button>
              <button
                className="icon"
                data-label="street"
                onMouseOver={handleValue}
              >
                <FaMap />
              </button>
              <button
                className="icon"
                data-label="phone"
                onMouseOver={handleValue}
              >
                <FaPhone />
              </button>
              <button
                className="icon"
                data-label="password"
                onMouseOver={handleValue}
              >
                <FaLock />
              </button>
            </div>
            <button className="btn" type="button" onClick={getPerson}>
              {loading ? "Loading...." : "random User"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

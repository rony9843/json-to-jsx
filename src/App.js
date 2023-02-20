import { useState } from "react";
import "./App.css";
import formData from "./formData.json";

function App() {
  // ? convert object to array
  const objToArr = (obj) => {
    const arr = Object.keys(obj).map((key) => ({
      name: key,
      ...formData[key],
    }));

    return arr;
  };

  // ? add value property in object
  const transformObject = (obj) => {
    return Object.keys(obj).reduce((acc, cur) => {
      acc[cur] = {
        ...obj[cur],
        value: "",
      };

      return acc;
    }, {});
  };

  const [formState, setFormState] = useState(transformObject(formData));

  // ? onchange handler every input
  const onChangeHandler = (props) => {
    console.log(props.target.name);

    // ? update object value property
    setFormState({
      ...formState,
      [props.target.name]: {
        ...formState[props.target.name],
        value: props.target.value,
      },
    });
  };

  const handelSubmit = (event) => {
    event.preventDefault();

    // ? create new object
    const value = Object.keys(formState).reduce((acc, cur) => {
      acc[cur] = formState[cur].value;

      return acc;
    }, {});

    // ? log 3
    console.log(value);
    console.log("formState", formState);
  };

  return (
    <div className="App">
      <div style={{ margin: "30px" }}>
        <form onSubmit={handelSubmit}>
          {objToArr(formData).map((item) => (
            <div style={{ padding: "10px" }}>
              <span>{item.name} : </span>
              <input
                onChange={onChangeHandler}
                type={item.type}
                name={item.name}
                placeholder={item.placeholder}
              />
            </div>
          ))}

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;

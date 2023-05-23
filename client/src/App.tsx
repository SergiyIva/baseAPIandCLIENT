import React from "react";
import { useMutation } from "@apollo/client";
import "./App.css";
import { useFormInput } from "./hooks/useFormInput";
import { graphql } from "./gql";

export const sendMsg = graphql(`
  mutation SendMessage($msg: String!) {
    sendMessage(msg: $msg)
  }
`);

function App() {
  const [formInput, reset] = useFormInput({
    textInput: ""
  });

  const [send, { loading, error }] = useMutation(sendMsg, {
    onError: (err) => console.log(err)
  });
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formInput.value);
    await send({
      variables: {
        msg: formInput.value.textInput
      }
    }).then(reset);
  };
  if (loading) return <div>Loading</div>;
  return (
    <div className="App">
      <form>
        <label htmlFor={"textInput"}>
          <input
            id={"textInput"}
            placeholder={"Text"}
            name={"textInput"}
            value={formInput.value.textInput}
            onChange={formInput.onChange}
          />
        </label>
        <button onClick={onSubmit}>Send</button>
      </form>
    </div>
  );
}

export default App;

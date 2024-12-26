import React, { useState } from "react";

function usePasswordGenerator() {
  const [errorMsg, setErrorMsg] = useState("");
  const [password, setPassword] = useState("");
  const generatePassword = (checkboxData, length) => {
    let generatedPassword = "";
    let charset = "";
    const selectedOption = checkboxData.filter(
      (checkedBox) => checkedBox.state
    );

    if (selectedOption.length === 0) {
      setErrorMsg("Select atleast one option");
      setPassword("");
      return;
    }

    selectedOption.forEach((option) => {
      switch (option.title) {
        case "Includes Uppercase Letters":
          charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          break;
        case "Includes Lowercase Letters":
          charset += "abcdefghijklmnopqrstuvwxyz";
          break;
        case "Includes Symbols Letters":
          charset += "!@#$%^&*()_+{}[]";
          break;
        case "Includes Numbers Letters":
          charset += "1234567890";
          break;
        default:
          break;
      }
    });
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset[randomIndex];
    }
    setPassword(generatedPassword);
    setErrorMsg("");
  };
  return { errorMsg, password, generatePassword };
}

export default usePasswordGenerator;

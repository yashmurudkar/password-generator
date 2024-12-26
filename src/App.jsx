import { useState } from "react";
import "./App.css";
import PasswordStrengthIndicator from "./hooks/PasswordStrengthIndicator";
import Button from "./hooks/Button";
import usePasswordGenerator from "./hooks/passwordGenerator";

function App() {
  const [passLength, setPassLength] = useState(5);
  const [copied, setCopied] = useState(false);
  const { errorMsg, password, generatePassword } = usePasswordGenerator();

  const [checkBoxData, setCheckBoxData] = useState([
    { title: "Includes Uppercase Letters", state: false },
    { title: "Includes Lowercase Letters", state: false },
    { title: "Includes Symbols Letters", state: false },
    { title: "Includes Numbers Letters", state: false },
  ]);

  const handleCheckBoxChange = (i) => {
    const copyData = [...checkBoxData];
    copyData[i].state = !copyData[i].state;
    setCheckBoxData(copyData);
  };

  const handleCopy = ()=>{
    navigator.clipboard.writeText(password)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1500);
  }

  return (
    <>
      <div className="App">
        <h1>PASSWORD GENERATOR</h1>
        <div className="container">
          {password && (
            <div className="password__section">
              <span>{password}</span>
              <Button
                text={copied ? "COPIED" : "COPY"}
                customClass="btn"
                onClick={handleCopy}
              />
            </div>
          )}
          <div className="passwordLength__section">
            <div className="characters">
              <span>Character Length</span>
              <span>{passLength}</span>
            </div>
            <input
              type="range"
              max="20"
              value={passLength}
              onChange={(e) => setPassLength(e.target.value)}
              className="slider"
            />
          </div>
          <div className="checkBox__section">
            {checkBoxData.map((checkbox, index) => {
              return (
                <div key={index}>
                  <input
                    type="checkbox"
                    onChange={() => handleCheckBoxChange(index)}
                    checked={checkbox.status}
                  />
                  <label>{checkbox.title}</label>
                </div>
              );
            })}
          </div>
          <div className="generatePassword__section">
            <PasswordStrengthIndicator password={password} />
            {errorMsg && <div className="errorMsg">{errorMsg}</div>}
            <Button
              text="GENERATE PASSWORD"
              customClass="generateBtn"
              onClick={() => generatePassword(checkBoxData, passLength)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

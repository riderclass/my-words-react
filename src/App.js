import React, { useState, useEffect } from "react";
import "./App.css";
import "./items/iphone-btn.css";
import Word from "./items/Word";
import Modal from "./items/modal";
import { customData1 } from "./data/words";
import { customData2 } from "./data/words-2";

function App() {
  const [isActive, setActive] = useState(false);
  const [word, setWord] = useState("");
  const [numer, setNumer] = useState(0);
  const [ann, setAnn] = useState("");
  const [score, setScore] = useState(0);
  const [name, setName] = useState("");
  const [theme, setTheme] = useState(customData1);
  const [message, setMessage] = useState("Здесь будут комментарии..");
  const [regime, setRegime] = useState({
    pos1: "rusWord",
    pos2: "engWord",
  });
  const [lineLong, setLineLong] = useState(customData1.length);

  const toggleClass = () => {
    setActive(!isActive);
  };

  function listenInput(event) {
    setAnn(event.target.value);
  }

  function listenName(event) {
    setName(event.target.value);
    setScore(0);
  }

  function check(answer) {
    let thePart = answer.substr(0, 4);
    let aPart = answer.substr(0, 2);
    if (thePart === "the ") {
      answer = answer.substr(-(answer.length - thePart.length));
    } else if (aPart === "a ") {
      answer = answer.substr(-(answer.length - aPart.length));
    }
    return answer;
  }

  function checkAnn() {
    let myAnn = ann.toLowerCase();
    if (myAnn === "") {
      return setMessage("Введите ваш ответ!");
    }

    myAnn = check(myAnn);
    let rightAnn;
    if (regime.pos1 === "engWord") {
      rightAnn = theme[numer].rusWord.toLowerCase();
    } else if (regime.pos1 === "rusWord") {
      rightAnn = theme[numer].engWord.toLowerCase();
    }
    if ((myAnn === rightAnn) & (theme[numer].repeat === 0)) {
      setScore(score + 1);
      setMessage("Верно! Полуаете 1 очко");
      addColor();
    } else if (myAnn !== rightAnn && theme[numer].repeat === 0) {
      setMessage("Неверно, будет вторая попытка");
      theme[numer].repeat = 1;
      theme.push(theme[numer]);
    } else if (myAnn === rightAnn && theme[numer].repeat !== 0) {
      setScore(score + 0.5);
      setMessage("Наконец-то! Получаете 0.5 очков");
      addColor();
    } else {
      setMessage("Неверно второй раз!");
    }
    setAnn("");
    setNumer(numer + 1);
  }

  useEffect(() => {
    if (regime.pos1 === "engWord") {
      theme[numer]
        ? setWord(theme[numer].engWord)
        : setWord("Слов больше нет..");
    } else {
      theme[numer]
        ? setWord(theme[numer].rusWord)
        : setWord("Слов больше нет..");
    }
  }, [numer, theme, regime]);

  useEffect(() => {
    if (word === "Слов больше нет..") {
      setMessage(
        "Категория закончилась с результатом " +
          score +
          ". Выберите в меню новую категорию."
      );
    }
  }, [word]);

  function clearInput() {
    setAnn("");
  }

  function changeTheme1() {
    setNumer(0);
    setTheme(shuffle(customData1));
    setLineLong(customData1.length);
    clearLine();
  }
  function changeTheme2() {
    setNumer(0);
    setTheme(shuffle(customData2));
    setLineLong(customData2.length);
    clearLine();
  }

  function changeRegime() {
    if (regime.pos1 == "rusWord") {
      setRegime({
        pos1: "engWord",
        pos2: "rusWord",
      });
    } else {
      setRegime({
        pos1: "rusWord",
        pos2: "engWord",
      });
    }
  }

  function shuffle(arr) {
    var j, temp;
    for (var i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  }

  function addChunks(data) {
    return [...Array(data)].map((e, i) => (
      <div id={i} className="linePart" key={i}></div>
    ));
  }

  function clearLine() {
    let chunks = document.querySelectorAll(".correctAnn");
    for (let i = 0; i < chunks.length; i++) {
      if (chunks[i].className === "correctAnn") {
        chunks[i].className = "linePart";
      }
    }
  }

  function addColor() {
    let chunks = document.querySelectorAll(".linePart");
    for (let i = 0; i < chunks.length; i++) {
      if (chunks[i].className !== "correctAnn") {
        return (chunks[i].className = "correctAnn");
      }
    }
  }

  return (
    <div className="body-box">
      <div className="mobile-box">
        <div className="mobile-content">
          <div className="container-fluid screenBox">
            <div className="head-block">
              <div className="logo-block">
                <figure>
                  <blockquote className="blockquote">
                    <a className="logo-link" href="/">
                      <p className="app-title">My Words App</p>
                      <img className="logo-img" src="/logo192.png" />
                    </a>
                  </blockquote>
                  <figcaption className="blockquote-footer">
                    Check your vocabulary{" "}
                    <cite title="Source Title">Right now!</cite>
                  </figcaption>
                </figure>
              </div>

              <div className="menu-block">
                <div
                  id="container"
                  className={isActive ? "change" : null}
                  onClick={toggleClass}
                >
                  <div className="bar1"></div>
                  <div className="bar2"></div>
                  <div className="bar3"></div>
                </div>
              </div>
            </div>

            {isActive ? (
              <Modal
                mySwitch={toggleClass}
                myTheme1={changeTheme1}
                myTheme2={changeTheme2}
              />
            ) : (
              <p></p>
            )}

            <div className="lineZone">{addChunks(lineLong)}</div>

            <div className="word-space">
              {theme[numer] ? (
                <span className="themeNote">{theme[numer].mainTheme}</span>
              ) : (
                <span className="themeNote"></span>
              )}

              <div className="imgBox">
                {theme[numer] ? (
                  <img
                    className="wordImage"
                    src={"./images/" + theme[numer].engWord + ".jpg"}
                  />
                ) : (
                  <img className="wordImage" src={"./images/empty.jpg"} />
                )}
              </div>

              <Word data={word} />
            </div>
            {theme[numer] ? (
              <div>
                <input
                  placeholder="Ответ..."
                  value={ann}
                  onInput={listenInput}
                  type="text"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-lg"
                />
                <div className="btn-block my-3">
                  <button
                    onClick={() => checkAnn()}
                    type="button"
                    className="btn btn-lg sub-btn"
                  >
                    Проверить
                  </button>
                  <button
                    onClick={clearInput}
                    type="button"
                    className="btn btn-secondary btn-lg clear-btn"
                  >
                    Очистить
                  </button>
                </div>
              </div>
            ) : (
              <div></div>
            )}

            <p>
              Комментарий:{" "}
              <span className="comment blockquote-footer">{message}</span>
            </p>
            <p>Итог: {score}</p>

            <div id="toggles">
              <input
                onClick={changeRegime}
                type="checkbox"
                name="checkbox1"
                id="checkbox1"
                className="ios-toggle"
                defaultChecked
              />
              <label
                htmlFor="checkbox1"
                className="checkbox-label"
                data-off="EN"
                data-on="RU"
              ></label>
            </div>
            <div className="auth-name">
              <p>by Vladimir Repin</p>
              <a href="mailto:vladimirrepin.IT@gmail.com">
                vladimirrepin.IT@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

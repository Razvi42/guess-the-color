import React, { useEffect, useState } from "react";
import { TfiFaceSad } from "react-icons/tfi";
import { RiEmotionHappyLine } from "react-icons/ri";

const getRandomColor = () => {
  const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
  const color = new Array(6)
    .fill("")
    .map(() => digits[Math.floor(Math.random() * digits.length)])
    .join("");
  return `#${color}`;
};

function Game() {
  const [color, setColor] = useState("");
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState();
  const [score, setScore] = useState(0);
  const [playerName, setPlayerName] = useState("");
  const [highScores, setHighScores] = useState([
    { name: "Mario", score: 6 },
    { name: "Luigi", score: 5 },
    { name: "Clark", score: 3 },
    { name: "Tony", score: 1 },
  ]);

  const [startGame, setStartGame] = useState(false);

  const generateColor = () => {
    const actualColor = getRandomColor();
    setColor(actualColor);
    setAnswers([actualColor, getRandomColor(), getRandomColor()].sort(() => 0.5 - Math.random()));
  };

  useEffect(() => {
    generateColor();
  }, []);

  const handleAnswerClicked = (answer) => {
    if (answer === color) {
      setResult(false);
      generateColor();
      setScore(score + 1);
      updateScore(score + 1);
    } else {
      setResult(true);
      setScore(0);
    }
  };

  function updateScore(newScore) {
    const updatedHighScores = [...highScores, { name: playerName, score: newScore }].sort((a, b) => b.score - a.score);
    setHighScores(updatedHighScores.slice(0, 5));
  }

  const handlePlayerName = (e) => {
    setPlayerName(e.target.value);
    if (playerName.length < 1) {
      return "please select a valid name";
    }
  };

  const handleStartGame = (e) => {
    e.preventDefault();
    if (playerName.length > 1) {
      setStartGame(true);
    } else {
      return "please enter a valid name";
    }
  };

  return (
    <main className="h-screen flex items-center justify-center bg-green-800  overlay relative overflow-hidden ">
      <div className="container mx-auto px-4 py-2">
        {startGame ? (
          <>
            <div className="flex flex-col items-center justify-center space-y-4 text-white">
              <h2 className="text-xl font-bold twitch-effect">HALL OF FAME</h2>
              <ul className=" w-[18em] gap-6 text-left text-sm pb-8">
                {highScores.map((entry, index) => (
                  <li key={index}>
                    {index + 1}. {entry.name}: {entry.score} points
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className=" flex flex-col  items-center ">
                <p className="text-[#f1f1f1] mb-4 text pt-8 lg:pt-0">Score: {score}</p>
                <div
                  style={{ background: color }}
                  className="w-[200px] h-[200px] lg:w-[300px] lg:h-[300px] rounded-sm shadow-inner z-[9999]"></div>
                <div className="flex gap-x-2 lg:gap-x-6 mt-4">
                  {answers.map((answer) => (
                    <button
                      style={{ color: getRandomColor(), borderColor: getRandomColor() }}
                      className="border-2 border-[#Ff1f1f1] px-4 py-2 rounded-sm tracking-wide shadow-inner"
                      onClick={() => handleAnswerClicked(answer)}
                      key={answer}>
                      {answer}
                    </button>
                  ))}
                </div>
                <div className="text-center text-[20px] mt-4">
                  {result === true && (
                    <div className="twitch text-red-500 shadow-inner flex gap-x-4 justify-center items-center">
                      Wrong answer
                      <i>
                        <TfiFaceSad size={25} />
                      </i>
                    </div>
                  )}
                  {result === false && (
                    <div className="text-[#228b22] shadow-inner flex gap-x-4 justify-center items-center">
                      Correct
                      <i>
                        <RiEmotionHappyLine size={35} />
                      </i>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <form onSubmit={handleStartGame}>
            <div className="flex flex-col text-center justify-center text-[#f1f1f1]">
              <div className="flex flex-col justify-center items-center">
                <h1 className="italic mb-4 text-xl">Guess the Color Game</h1>
                <p className="text-sm leading-6 mb-6">Test your #HEX knowledge.</p>
                <div className="w-full lg:w-[550px] flex flex-col justify-center items-center ">
                  <p className="mb-4 text-left">Instructions:</p>
                  <p className="text-sm leading-6 mb-2 text-left">
                    1.Each player gets a random #HEX color and 3 options from where to pick.
                  </p>
                  <p className="text-sm leading-6 mb-2 text-left">
                    2.The best player gets in HALL OF FAME and remains there until another player takes their throne.{" "}
                  </p>
                  <p className="text-sm leading-6 mb-2 text-left">
                    What are you waiting for? Tell us your name and enter the battle!
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center text-[#f1f1f1] pt-16 text-center">
              <p className="mb-6">Enter your name here</p>
              <input
                type="text"
                placeholder="e.g Parry Hotter"
                onChange={handlePlayerName}
                className="mb-6 px-2 py-1  outline-none shadow-inner bg-transparent border-[3px] border-dashed "
              />
              <button className="retro-text">Start Game</button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}

export default Game;

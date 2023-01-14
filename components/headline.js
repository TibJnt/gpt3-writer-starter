import { useState, useEffect } from "react";

function Headline() {
  const [word, setWord] = useState("Machine Learning");
  const words = ["Machine Learning", "Web3", "Italian Cuisine", "Basket-Ball", "Video  Editing", "Poker", "Music"];
  let i = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      setWord(words[i]);
      i = (i + 1) % words.length;
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <h1>{word}</h1>
  );
}

export default Headline;
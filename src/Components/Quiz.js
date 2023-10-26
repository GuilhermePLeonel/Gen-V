import questions from '../Texts/perguntas.js';
import cate_answer from '../Texts/respostas/cate.js';
import emma_answer from '../Texts/respostas/emma.js';
import jordan_answer from '../Texts/respostas/jordan.js';
import { marie_answer } from '../Texts/respostas/marie.js';
import React, { useState, useEffect } from 'react';
import links from '../Images/links.js';
import boys from '../Images/boys.png';
import resumes from '../Texts/resumes.js';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function Quiz() {
  const [counter, setCount] = useState(0);
  const [character, setCharacter] = useState({
    cate: 0,
    emma: 0,
    jordan: 0,
    marie: 0,
  });
  const [options, setOptions] = useState([]);

  function getMaxValueKey(obj) {
    return Object.keys(obj).reduce(function (a, b) {
      return obj[a] > obj[b] ? a : b;
    });
  }

  const characters = [cate_answer, emma_answer, jordan_answer, marie_answer];

  const handleOptionClick = (optionIndex) => {
    console.log(character);
    const characterIndex = characters.findIndex(
      (char, index) => char[counter] === options[optionIndex]
    );
    if (characterIndex !== -1) {
      const characterKey = Object.keys(character)[characterIndex];
      setCharacter({
        ...character,
        [characterKey]: character[characterKey] + 1,
      });
    }
    setCount(counter + 1);
  };

  const handleReset = () => {
    window.location.reload();
  };

  useEffect(() => {
    const currentOptions = [
      cate_answer[counter],
      emma_answer[counter],
      jordan_answer[counter],
      marie_answer[counter],
    ];
    shuffleArray(currentOptions);
    setOptions(currentOptions);
  }, [counter]);

  return (
    <div className='flex flex-col justify-center items-center h-full bg-black'>
      {counter === 10 ? (
        <div className='quiz-container text-xl font-bold mt-2 mb-2 bg-neutral-800 p-4 max-w-md rounded-lg shadow-lg '>
          <h1 class='quiz-container text-xl text-neutral-700 font-bold mb-2 bg-yellow-400 p-4 max-w-md  flex justify-center rounded-lg '>
            RESULTADO
          </h1>
          <img
            className='w-full flex justify-center p-4 max-w-md rounded-lg object-scale-down h-80  '
            alt=''
            src={links[getMaxValueKey(character)]}
          />
          <h2 class='quiz-container text-xl text-neutral-700 font-bold mb-5 bg-yellow-400 p-4 max-w-md  flex justify-center rounded-lg'>
            {getMaxValueKey(character)}
          </h2>
          <h2 class='quiz-container text-xl text-neutral-300 font-bold mb-5 p-4 max-w-md  flex justify-center rounded-lg'>
            {console.log(resumes['jordan'])}
            {resumes[getMaxValueKey(character)]}
          </h2>
          <button
            className='quiz-container text-xl text-neutral-700 font-bold mb-2 bg-yellow-400 p-4 max-w-md  flex justify-center rounded-lg'
            onClick={handleReset}
          >
            {'<--'} Refaça o teste!
          </button>
        </div>
      ) : (
        <div class='quiz-container p-4 max-w-md  rounded-lg shadow-lg h-full'>
          <img src={boys} alt='' className='w-1/2' />
          <div class='quiz-container bg-yellow-400 p-4 max-w-md  rounded-lg shadow-lg'>
            <p class='text-xl font-semibold mb-5 text-black'>
              {questions[counter]}
            </p>
            <div class='options'>
              {options.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleOptionClick(index)}
                  class='option py-2 px-4 mb-1 cursor-pointer hover:bg-yellow-700 bg-neutral-800 text-white font-medium transition rounded-lg duration-200'
                >
                  {String.fromCharCode(97 + index)}) {option}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;

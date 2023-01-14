import Head from 'next/head';
import Image from 'next/image';
import Headline from '../components/headline';
import { useState } from 'react';
import buildspaceLogo from '../assets/buildspace-logo.png';

const Home = () => {

  const [prompt, setPrompt] = useState('');

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}

  return (
    <div className="root">
      <Head>
        <title>Break Into | Tailored Learning Path</title>
      </Head>
      <div className="container">
        <div className="header">
        <h1>Break Into</h1>
          <div className="header-title">
            <Headline />
          </div>
          <div className="header-subtitle">
            <h2>Get a custom learning path to master any skill you want super fast.</h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea 
          value={prompt}
          onChange={handleChange}
          placeholder="Write here what you want to learn" 
          className="prompt-box" />
        </div>
        <div className="prompt-buttons">
  <a
    className={isGenerating ? 'generate-button loading' : 'generate-button'}
    onClick={callGenerateEndpoint}
  >
    <div className="generate">
    {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
    </div>
  </a>
</div>
        {apiOutput && (
  <div className="output">
    <div className="output-header-container">
      <div className="output-header">
        <h3>Output</h3>
      </div>
    </div>
    <div className="output-content">
      <p>{apiOutput}</p>
    </div>
  </div>
)}
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;

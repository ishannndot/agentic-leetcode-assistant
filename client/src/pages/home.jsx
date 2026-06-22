import { useState } from "react";
import "./home.css";

function Home() {
  const [problem, setProblem] = useState("");
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");

  const analyze = async () => {
    try {
      const res = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          problem,
          code,
        }),
      });

      const data = await res.json();
      setResult(data.response);
    } catch (err) {
      setResult("Backend not connected.");
    }
  };

  return (
    <div className="home">

      <div className="blob blob1"></div>
      <div className="blob blob2"></div>
      <div className="blob blob3"></div>

      <section className="hero">

        <div className="hero-content">
          <span className="badge">AI Powered DSA Mentor</span>

          <h1>
            Master
            <span> LeetCode </span>
            With AI
          </h1>

          <p>
            Get pattern detection, hints, code reviews,
            complexity analysis and personalized guidance.
          </p>
        </div>

      </section>

      <div className="main-card">

        <div className="input-section">

          <div className="card">
            <h3>Problem Statement</h3>

            <textarea
              placeholder="Paste LeetCode problem here..."
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
            />
          </div>

          <div className="card">
            <h3>Your Solution</h3>

            <textarea
              placeholder="Paste your code here..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>

        </div>

        <button
          className="analyze-btn"
          onClick={analyze}
        >
          Analyze Solution ✨
        </button>

        {result && (
          <div className="result-card">
            <h2>AI Analysis</h2>

            <pre>{result}</pre>
          </div>
        )}

      </div>

    </div>
  );
}

export default Home;
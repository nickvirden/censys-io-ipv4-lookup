import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div>hello world</div>
        <p>{!data ? "Loading..." : data}</p>
      </header>
    </div>
  );
}

export default App;

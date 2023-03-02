import React, { useEffect, useState } from 'react';

interface IResponseData {
  message: string;
}

function App() {
  const [data, setData] = useState<IResponseData | null>(null);

  useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data): Partial<IResponseData> => setData(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div>hello world</div>
        <p>{data !== {} || !data ? "Loading..." : data}</p>
      </header>
    </div>
  );
}

export default App;

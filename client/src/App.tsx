import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';

interface IResponseData {
  longitude?: number;
  latitude?: number;
}

function App() {
  const [data, setData] = useState<IResponseData>({});

  useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div>
      <div>
        {
          !isEmpty(data) ? (
            <>
              <div><b>Longitude:</b> { data?.longitude }</div>
              <div><b>Latitude:</b> { data?.latitude }</div>
            </>
          ) : 'Loading...'
        }
      </div>
    </div>
  );
}

export default App;

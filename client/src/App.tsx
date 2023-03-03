import React, { useRef, useState } from 'react';
import { isEmpty } from 'lodash';
import { Button, Container, Form, Spinner } from 'react-bootstrap';

import './App.css';

interface IResponseData {
  longitude?: number;
  latitude?: number;
}

function App() {
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState<IResponseData>({});
  const inputRef = useRef<HTMLInputElement>(null);

  async function fetchLongLat() {
    if (inputRef?.current) {
      setIsFetching(true);

      await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ipAddress: inputRef.current.value })
      })
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((error) => console.log(error));

      setIsFetching(false);
    }
  }

  return (
    <div id="app">
      <Container>
        <div id="submission-form-box">
          <div>
            <Form onSubmit={(e) => e.preventDefault()} className="mb-3">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>IPv4 Address</Form.Label>
                <Form.Control type="text" placeholder="Enter IPv4 address" defaultValue="142.1.1.1" ref={inputRef} />
                <Form.Text className="text-muted">
                  Big brother is watching you. Just kidding! Or am I...?
                </Form.Text>
              </Form.Group>
              <Button variant="primary" type="submit" disabled={isFetching} onClick={fetchLongLat}>
                {
                  isFetching ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      <span className="visually-hidden">Loading...</span>
                    </>
                  ) : 'Submit'
                }
              </Button>
            </Form>
            <div id="long-lat-display">
              {
                !isEmpty(data) && (
                  <>
                    <div><b>Longitude:</b> { data?.longitude }</div>
                    <div><b>Latitude:</b> { data?.latitude }</div>
                  </>
                )
              }
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default App;

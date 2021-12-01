import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Timer = (props) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const doubleSigns = (num) => (num.toString().length === 1 ? "0" + num : num);

  useEffect(() => {
    let hours = Math.floor(props.passedTime / 3600);
    let minutes = Math.floor((props.passedTime % 3600) / 60);
    let seconds = props.passedTime % 60;

    setHours(() => doubleSigns(hours));
    setMinutes(() => doubleSigns(minutes));
    setSeconds(() => doubleSigns(seconds));
  }, [props.passedTime]);

  return (
    <Container>
      <Card style={{ margin: "10% 15%", minWidth: "380px" }}>
        <Card.Header>Timer</Card.Header>
        <Card.Body>
          <ButtonGroup aria-label="Basic example">
            <Button variant="dark" size="lg" className="hours" disabled>
              {hours}
            </Button>
            <Button variant="dark" size="lg" className="minutes" disabled>
              {minutes}
            </Button>
            <Button variant="dark" size="lg" className="seconds" disabled>
              {seconds}
            </Button>
          </ButtonGroup>
        </Card.Body>
      </Card>

      <ButtonGroup aria-label="Basic example" style={{ marginTop: "20px" }}>
        <Button variant="danger" onClick={props.onTimerStart}>
          Start/Stop
        </Button>
        <Button variant="warning" onClick={props.onTimerWait}>
          Wait
        </Button>
        <Button variant="success" onClick={props.onTimerReset}>
          Reset
        </Button>
      </ButtonGroup>
    </Container>
  );
};

export default Timer;

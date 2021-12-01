import "./App.css";
import Timer from "./components/timer";

import { useState } from "react";
import { interval } from "rxjs";
import { map } from "rxjs/operators";

const intervalDelay = 1000;

const App = () => {
  const [timer, setTimer] = useState(0);
  const [pass, setPass] = useState(0);

  const [subscription, setSubscription] = useState("");
  const [prevent, setPrevent] = useState(true);

  const onStart = () => {
    if (!subscription) {
      const timerSubscription = interval(intervalDelay)
        .pipe(map((t) => t + 1))
        .subscribe((t) => setTimer(t + pass));
      setSubscription(timerSubscription);
    } else {
      subscription.unsubscribe();
      setTimer(0);
      setPass(0);
      setSubscription("");
    }
  };

  const onWait = (event) => {
    if (prevent) {
      setPrevent(false);
      const timerInstance = setTimeout(function () {
        setPrevent(true);
        clearTimeout(timerInstance);
      }, Math.floor(intervalDelay / 3));
    } else {
      if (subscription) {
        subscription.unsubscribe();
      }
      setPass(timer);
      setSubscription("");
    }
  };

  const onReset = () => {
    if (subscription) {
      subscription.unsubscribe();
    }

    const timerSubscription = interval(intervalDelay).subscribe((t) =>
      setTimer(t)
    );

    setSubscription(timerSubscription);
  };

  return (
    <div className="App">
      <Timer
        passedTime={timer ? timer : pass}
        onTimerStart={onStart}
        onTimerWait={onWait}
        onTimerReset={onReset}
      />
    </div>
  );
};

export default App;

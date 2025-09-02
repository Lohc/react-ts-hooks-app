import { useEffect, useState } from 'react';

const colors = {
  red: 'bg-red-500 animate-pulse',
  yellow: 'bg-yellow-500 animate-pulse',
  green: 'bg-green-500 animate-pulse',
};

// type defaultColor = 'red' | 'yellow' | 'green';
type defaultColor = keyof typeof colors;

export const useTrafficLight = () => {
  const [light, setLight] = useState<defaultColor>('red');
  const [countdown, setCountdown] = useState(5);

  //Countdown effect
  useEffect(() => {
    if (countdown === 0) {
      return;
    }
    const intervalId = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [countdown]);

  useEffect(() => {
    if (countdown > 0) return;
    setCountdown(5);
    if (light === 'red') {
      setLight(() => 'green');
      return;
    } else if (light === 'green') {
      setLight('yellow');
      return;
    } else {
      setLight(() => 'red');
      return;
    }
    return;
  }, [countdown, light]);
  return {
    //Values
    colors,
    light,
    countdown,

    //Computed
    percentage: (countdown / 5) * 100,
    redLight: light === 'red' ? colors[light] : 'bg-gray-500',
    yellowLight: light === 'yellow' ? colors[light] : 'bg-gray-500',
    greenLight: light === 'green' ? colors[light] : 'bg-gray-500',

    //Functions
  };
};

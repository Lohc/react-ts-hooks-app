import { useCounter } from '@/hooks/useCounter';
import { useMemo } from 'react';

const heavyStuff = (iterationNumber: number) => {
  console.time('Heavy_stuff_started');

  for (let i = 0; i < iterationNumber; i++) {
    console.log('Aquí vamos...');
  }

  console.timeEnd('Heavy_stuff_started');

  return `${iterationNumber} iteraciones realizadas`;
};

export const MemoCounter = () => {
  const { counter, increment } = useCounter(40_000);

  const myHeavyValue = useMemo(() => heavyStuff(counter), [counter]);

  return (
    <>
      <div className="bg-gradient flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Memo - useMemo - {myHeavyValue}</h1>
        <hr />
        <h4>Counter: {counter}</h4>

        <button
          className="bg-blue-500 text-white px-4 rounded-md py-2 cursor-pointer"
          onClick={increment}
        >
          +1
        </button>
      </div>
    </>
  );
};

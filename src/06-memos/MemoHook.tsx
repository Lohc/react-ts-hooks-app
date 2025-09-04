import { useCallback, useState } from 'react';
import { Title } from './ui/Title';
import { Subtitle } from './ui/Subtitle';

export const MemoHook = () => {
  const [title, setTitle] = useState('Hola');
  const [subtitle, setSubtitle] = useState('Mundo');

  const handleMyAPICall = useCallback(() => {
    console.log('Llamara a mi API', subtitle);
  }, [subtitle]);

  return (
    <div className="bg-gradient flex flex-col gap-4">
      <h1 className="text-2xl font-thin text-white">Memo App</h1>

      <Title title={title} />
      <Subtitle subtitle={subtitle} callMyAPI={handleMyAPICall} />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={() => setTitle('Hello ' + new Date().getTime())}
      >
        Cambiar título
      </button>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={() => setSubtitle('World')}
      >
        Cambiar Subtítulo
      </button>
    </div>
  );
};

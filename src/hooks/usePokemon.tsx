import { useCallback, useEffect, useState } from 'react';

interface Pokemon {
  id: number;
  name: string;
  imgNormal: string;
  imgShiny: string;
}

interface Props {
  id: number;
}

export const usePokemon = ({ id }: Props) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [brillos, setBrillos] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleShiny = () => {
    if (brillos) setBrillos(false);
    else setBrillos(true);
  };

  const capitalizedName = (name: string) => {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const getPokemonById = useCallback(async (id: number) => {
    setIsLoading(true);
    console.log('llamada');

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();

    setPokemon({
      id: id,
      name: capitalizedName(data.name),
      imgNormal: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
      imgShiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`,
    });
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getPokemonById(id);
  }, [getPokemonById, id]);

  return {
    //Props
    pokemon,
    brillos,
    isLoading,

    //Computed
    formattedId: id.toString().padStart(3, '0'),

    //Methods
    handleShiny,
  };
};

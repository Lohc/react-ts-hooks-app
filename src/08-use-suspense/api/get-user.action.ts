export interface User {
  id: number;
  name: string;
  location: string;
  role: string;
}

export const getUserAction = async (id: number): Promise<User> => {
  await new Promise((res) => setTimeout(res, 2000));

  return {
    id: id,
    name: 'Olaio',
    location: 'Manzanas, Colima',
    role: 'Milk drinker',
  };
};

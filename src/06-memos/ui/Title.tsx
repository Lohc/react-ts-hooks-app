interface Props {
  title: string;
}

export const Title = ({ title }: Props) => {
  console.log('MyTitle re-render');
  return <h1 className="text-3xl">{title}</h1>;
};

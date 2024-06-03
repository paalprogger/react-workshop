import { Pokemon } from "../types/pokemon"

type Props = {
  pokemon: Pokemon
}

export const PokemonDisplay = ({ pokemon }: Props) => {
  return (
    <div>
      <p className="capitalize">{pokemon.name}</p>
      <p>{`#${pokemon.id}`}</p>
      <p>Types:</p>
      <ul>
        {pokemon.types.map((type) => (
          <li key={type.type.name} className="capitalize">
            {type.type.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

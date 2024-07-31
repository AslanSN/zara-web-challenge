"use client"
import { useCharactersContext } from "@/contexts/CharactersContext"
import { useEffect } from "react"
import CharacterCard from "../CharacterCard/CharacterCard"
import { useCharacters } from "@/hooks/useCharacters"

const CharactersList = () => {
  // const { allCharacters, fetchNextPage, isLoading, hasMore, error } =
  // useCharactersContext()
 const {characters, isLoading, error, fetchNextPage} = useCharacters()

  useEffect(() => {
  if (characters.length === 0) {
    fetchNextPage()
  }
})
	if (isLoading && characters.length === 0) {
		return <p>Loading...</p>
	}

	if (error) {
		return <p>Error: {error}</p>
	}


  return (
    
    <ul className={""}>
    {characters.map((character) => (
      <CharacterCard
        key={character.id}
        // src={'https://picsum.photos/250/300'}
        name={character.name}
      />
    ))}
  </ul>
)
}
export default CharactersList
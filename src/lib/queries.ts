import { correctCapitalLetter, blobToBase64 } from './utils'
import type { Pokemon } from './utils'

// Query key factory for type-safe cache keys
export const pokemonKeys = {
  all: ['pokemon'] as const,
  info: (id: number) => [...pokemonKeys.all, 'info', id] as const,
  image: (id: number) => [...pokemonKeys.all, 'image', id] as const,
  batch: (ids: number[]) => [...pokemonKeys.all, 'batch', ids.join(',')] as const,
}

const POKEMON_API_BASE = 'https://pokeapi.co/api/v2'
const POKEMON_SPRITE_BASE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'

// Fetch single pokemon info
export async function fetchPokemonInfoFn(pokemonNumber: number): Promise<Pokemon> {
  const res = await fetch(`${POKEMON_API_BASE}/pokemon-species/${pokemonNumber}`)
  if (!res.ok) throw new Error(`Failed to fetch pokemon ${pokemonNumber}`)
  const data = await res.json()
  return {
    number: pokemonNumber,
    name: correctCapitalLetter(data.name),
  }
}

// Fetch pokemon image as base64
export async function fetchPokemonImageFn(pokemonNumber: number): Promise<string> {
  const res = await fetch(`${POKEMON_SPRITE_BASE}/${pokemonNumber}.png`)
  if (!res.ok) throw new Error(`Failed to fetch image for pokemon ${pokemonNumber}`)
  const blob = await res.blob()
  return blobToBase64(blob)
}

// Fetch multiple pokemon info in parallel
export async function fetchMultiplePokemonInfoFn(pokemonNumbers: number[]): Promise<Pokemon[]> {
  const results = await Promise.all(
    pokemonNumbers.map(async (num) => {
      try {
        return await fetchPokemonInfoFn(num)
      } catch {
        return null
      }
    })
  )
  return results.filter((p): p is Pokemon => p !== null)
}

// Query options factories for use with createQuery
export const pokemonInfoQueryOptions = (pokemonNumber: number) => ({
  queryKey: pokemonKeys.info(pokemonNumber),
  queryFn: () => fetchPokemonInfoFn(pokemonNumber),
  staleTime: Infinity, // Pokemon data never changes
  gcTime: 1000 * 60 * 60, // Keep in cache for 1 hour
})

export const pokemonImageQueryOptions = (pokemonNumber: number) => ({
  queryKey: pokemonKeys.image(pokemonNumber),
  queryFn: () => fetchPokemonImageFn(pokemonNumber),
  staleTime: Infinity,
  gcTime: 1000 * 60 * 60,
})

export const multiplePokemonInfoQueryOptions = (pokemonNumbers: number[]) => ({
  queryKey: pokemonKeys.batch(pokemonNumbers),
  queryFn: () => fetchMultiplePokemonInfoFn(pokemonNumbers),
  staleTime: Infinity,
  gcTime: 1000 * 60 * 60,
  enabled: pokemonNumbers.length > 0,
})

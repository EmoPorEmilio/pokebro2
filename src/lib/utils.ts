import { types } from '@/data/types'
import { TYPE_EFFECTIVENESS_OPTION } from './constants'

export interface Pokemon {
  number: number
  name: string
}

export const generateRandomAvailablePokemonNumber = (
  availableNumbers: number[],
  amount: number
): { randomPokemonNumbers: number[]; indexToRemove: number | null } => {
  const randomPokemonNumbers: number[] = []
  let indexToRemove: number | null = null

  while (randomPokemonNumbers.length < amount) {
    const randomPokeIndex = Math.floor(Math.random() * availableNumbers.length)
    indexToRemove = indexToRemove ?? randomPokeIndex
    const randomPoke = availableNumbers[randomPokeIndex]
    if (!randomPokemonNumbers.includes(randomPoke)) {
      randomPokemonNumbers.push(randomPoke)
    }
  }
  return { randomPokemonNumbers, indexToRemove }
}

export const pokemonIMGURL = (pokemonNumber: number): string =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonNumber}.png`

export const PokemonInfoURL = (pokemonNumber: number): string =>
  `https://pokeapi.co/api/v2/pokemon-species/${pokemonNumber}`

export const randomizePokemonList = <T>(pokemonList: T[]): T[] => {
  const list = [...pokemonList]
  const randomizedPokemon: T[] = []
  while (list.length) {
    const pokeToPick = Math.floor(Math.random() * list.length)
    randomizedPokemon.push(list.splice(pokeToPick, 1)[0])
  }
  return randomizedPokemon
}

export const correctCapitalLetter = (name: string): string =>
  name.charAt(0).toUpperCase() + name.slice(1)

export const fetchPokemonImage = async (number: number): Promise<Response> =>
  fetch(pokemonIMGURL(number))

export const fetchPokemonInfo = async (pokemonNumber: number): Promise<Response> =>
  fetch(PokemonInfoURL(pokemonNumber))

export const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsDataURL(blob)
    reader.onloadend = function () {
      resolve(reader.result as string)
    }
  })
}

export const padScorePoints = (intPoints: number): string => {
  return intPoints.toString().padStart(3, '0')
}

export const getTypesCombinationDamageCorrectOption = (
  typesCombination: [number, number, number | null]
): string => {
  let damageMultiplier = 100

  const attackType = typesCombination[0]
  const firstDefense = typesCombination[1]
  const secondDefense = typesCombination[2]

  const damageRelations = types[attackType].damage_relations
  const noDamageToList = damageRelations.no_damage_to
  const halfDamageToList = damageRelations.half_damage_to
  const doubleDamageToList = damageRelations.double_damage_to

  for (const noDamage of noDamageToList) {
    if (
      noDamage.name === types[firstDefense].name ||
      (secondDefense !== null && noDamage.name === types[secondDefense]?.name)
    ) {
      damageMultiplier = 0
    }
  }

  for (const halfDamage of halfDamageToList) {
    if (halfDamage.name === types[firstDefense].name) {
      damageMultiplier = damageMultiplier / 2
    }
    if (secondDefense !== null && halfDamage.name === types[secondDefense]?.name) {
      damageMultiplier = damageMultiplier / 2
    }
  }

  for (const doubleDamage of doubleDamageToList) {
    if (doubleDamage.name === types[firstDefense].name) {
      damageMultiplier = damageMultiplier * 2
    }
    if (secondDefense !== null && doubleDamage.name === types[secondDefense]?.name) {
      damageMultiplier = damageMultiplier * 2
    }
  }

  switch (damageMultiplier) {
    case 0:
      return TYPE_EFFECTIVENESS_OPTION.NO_DAMAGE
    case 25:
      return TYPE_EFFECTIVENESS_OPTION.QUARTER_DAMAGE
    case 50:
      return TYPE_EFFECTIVENESS_OPTION.HALF_DAMAGE
    case 100:
      return TYPE_EFFECTIVENESS_OPTION.REGULAR_DAMAGE
    case 200:
      return TYPE_EFFECTIVENESS_OPTION.DOUBLE_DAMAGE
    case 400:
      return TYPE_EFFECTIVENESS_OPTION.QUADRUPLE_DAMAGE
    default:
      return TYPE_EFFECTIVENESS_OPTION.REGULAR_DAMAGE
  }
}

export const generateRandomAvailableTypeCombination = (
  availableTypeCombinations: [number, number, number | null][]
): { randomTypeCombination: [number, number, number | null]; randomTypeIndex: number } => {
  const randomTypeIndex = Math.floor(Math.random() * availableTypeCombinations.length)
  const randomTypeCombination = availableTypeCombinations[randomTypeIndex]
  return { randomTypeCombination, randomTypeIndex }
}

export const b64toBlob = (
  b64Data: string,
  contentType = '',
  sliceSize = 512
): Blob => {
  const byteCharacters = atob(b64Data)
  const byteArrays: BlobPart[] = []

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)

    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray as BlobPart)
  }

  const blob = new Blob(byteArrays, { type: contentType })
  return blob
}

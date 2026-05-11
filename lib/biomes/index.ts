import { biologyBiome } from './biology'
import { religionBiome } from './religion'

export const BIOMES: Record<string, any> = {
  biology: biologyBiome,
  religion: religionBiome,
}

export function getBiomeById(id: string) {
  return BIOMES[id] || null
}

export function getAllBiomes() {
  return Object.values(BIOMES)
}
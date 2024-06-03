export type Pokemon = {
  id: number
  name: string
  height: number
  order: number
  weight: number
  types: { type: { name: string } }[]
}

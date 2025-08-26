import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

const easyFetch = async <T>(url: string): Promise<T> => {
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`NOT OK RESPONSE: ${response.status}`)
        }
        debugger
        const json = await response.json()
        return json.results
    } catch (error) {
        console.log({ error })
        throw new Error("API_ERROR")
    }
}

interface Pokemon {
    id: number
    name: string
    createdAt: Date
}

interface PokemonState {
    pokemonArray: Pokemon[]
    setPokemonArray(pokemonArray: Pokemon[]): void
    getPokemonAll(): void
}

export const usePokemonStore = create<PokemonState>()(
    persist(
        (set, get) => ({
            pokemonArray: [],
            setPokemonArray(pokemonArray): void {
                set({ pokemonArray })
            },
            async getPokemonAll(): Promise<void> {
                if (get().pokemonArray.length !== 0) {
                    debugger
                    return
                }
                const url = "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"
                const data: {
                    name: string
                    url: string
                }[] = await easyFetch(url)
                const pokemonArray: Pokemon[] = data.map((el, index) => ({
                    id: index,
                    name: el.name,
                    createdAt: new Date(),
                }))

                set({ pokemonArray })
            },
        }),
        {
            name: "pokemon-storage",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
)

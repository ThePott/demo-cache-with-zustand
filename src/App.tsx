import { useEffect, type ReactNode } from "react"
import { usePokemonStore } from "./store"

const App = (): ReactNode => {
    const pokemonArray = usePokemonStore((state) => state.pokemonArray)
    const getPokemonAll = usePokemonStore((state) => state.getPokemonAll)

    console.log("----this is good")
    useEffect(() => {
    //     debugger
        getPokemonAll()
    }, [])
    return (
        <div>
            <p>여기에 출력</p>
            <p>{JSON.stringify(pokemonArray)}</p>
        </div>
    )
}

export default App

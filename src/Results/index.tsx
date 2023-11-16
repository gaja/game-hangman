import { useScores } from "../MainScreen/api"

export function Results() {
    const { data, loading, error } = useScores()

    console.log(data)

    return (
        <>Results</>
    )
}
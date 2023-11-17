import { Error } from "../ErrorScreen"
import { useScores } from "../MainScreen/api"
import { Loader } from "../components/Loader"
import { prepareHighscoreData } from "../utlis"

import './index.css'

export function Results() {
    const { data, loading, error } = useScores()

    const renderData = prepareHighscoreData(data as any)

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <Error />
    }

    return (
        <>
            <div className="container">
                <h3>
                    HIGHSCORES:
                </h3>
                {
                    renderData?.map(rd => <p key={rd.id} className="tab">{rd?.userName} {rd?.score}</p>)
                }
            </div>
        </>
    )
}

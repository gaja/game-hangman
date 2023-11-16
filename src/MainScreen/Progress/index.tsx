import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { max_misses } from "../../constants"

export function Progress() {
    const misses = useSelector((state: RootState) => state.mainScreen.misses)
    const missedChars = useSelector((state: RootState) => state.mainScreen.missedChars).join(' ')

    return <>
        <p>
            ({misses}/{max_misses})
        </p>
        <p>
            Missed letters: {missedChars}
        </p>
    </>
}
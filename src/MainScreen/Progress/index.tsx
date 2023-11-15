import { useSelector } from "react-redux"
import { RootState } from "../../store"

export function Progress() {
    const misses = useSelector((state: RootState) => state.mainScreen.misses)
    const missedChars = useSelector((state: RootState) => state.mainScreen.missedChars).join(' ')

    return <>
        <p>
            ({misses}/6)
            <br />
            Missed letters: {missedChars}
        </p>
    </>
}
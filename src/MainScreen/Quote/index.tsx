import { useDispatch, useSelector } from "react-redux"

import { RootState } from "../../store"
import { useEffect, useState } from "react"
import { maskQuote } from "../../utlis"
import { setFailedGame, setFinishTime } from "../mainScreenSlice"
import { max_misses } from "../../constants"

export function Quote() {
    const dispatch = useDispatch()
    const DEFAULT_BLUR = 'blur(4px)'
    const misses = useSelector((state: RootState) => state.mainScreen.misses)

    const quote = useSelector((state: RootState) => state.mainScreen.quote)
    const guess = useSelector((state: RootState) => state.mainScreen.guess)

    const [maskedQuote, setMaskedQuote] = useState('')
    const [blur, setBlur] = useState(DEFAULT_BLUR)

    useEffect(() => {
        const masked = maskQuote(quote, guess)
        setMaskedQuote(masked)
    }, [guess])

    useEffect(() => {
        if (!!maskedQuote.length && !maskedQuote.split('').includes('*')) {
            console.log('game completed')

            dispatch(setFinishTime())
        }
        if (misses >= max_misses) {
            console.log('fail')
            dispatch(setFailedGame())
            alert('You loose!')

        }
    }, [misses, maskQuote])

    const toggleBlur = () => {
        blur === DEFAULT_BLUR ? setBlur('blur(0px)') : setBlur(DEFAULT_BLUR)
    }

    return <>
        <p style={{
            filter: `${blur}`,
            cursor: "pointer",
        }}
            onClick={toggleBlur}>
            {quote}
        </p >
        <p>
            {maskedQuote}
        </p>
    </>
}
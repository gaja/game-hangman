import { useDispatch, useSelector } from "react-redux"

import { RootState } from "../../store"
import { useEffect, useState } from "react"
import { maskQuote } from "../../utlis"
import { setFinishTime } from "../mainScreenSlice"

export function Quote() {
    const DEFAULT_BLUR = 'blur(4px)'
    const dispatch = useDispatch()

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
            finishGame()
            dispatch(setFinishTime())
        }
    }, [maskedQuote])

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

function finishGame() {
    console.log('game completed')
}
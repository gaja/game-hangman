import { useSelector } from "react-redux"

import { RootState } from "../../store"
import { useEffect, useState } from "react"
import { maskQuote } from "../../utlis"

export function Quote() {
    const [maskedQuote, setMaskedQuote] = useState('')
    const quote = useSelector((state: RootState) => state.mainScreen.quote)
    const guess = useSelector((state: RootState) => state.mainScreen.guess)

    useEffect(() => {
        const masked = maskQuote(quote, guess)
        setMaskedQuote(masked)
    }, [guess])

    return <>
        {quote}
        <br />
        {maskedQuote}
        <br />
    </>
}

import { useState } from "react"


export default function CarForm() {

    const [hits, setHits] = useState([])

    const search = async (event) => {
        const query = event.target.value

        if (query.length > 2) {
            const params = new URLSearchParams({ q: query })

            const res = await fetch('/api/search?' + params)

            const result = await res.json()
            console.log(result)
            setHits(result['cars'])
        }
    }

    return (
        <div>
            <input onChange={search} type="text" />

            <ul>
                {
                    hits.map((hit) => (
                        <li key={hit.entityId}>
                            {hit.make} {hit.model} 
                            <img src={hit.image} alt="car image" style={{display: 'block'}}/>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
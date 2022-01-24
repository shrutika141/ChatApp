import React from 'react'
import loading from './loading_route.gif'

const Loading = () => {
    return (
        <div style={{ position: "relative" }}>
            <h2 style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                <img src={loading} />
            </h2>
        </div>
    )
}

export default Loading

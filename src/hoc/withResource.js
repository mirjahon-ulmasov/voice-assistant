import axios from "axios";
import React, { useEffect, useState } from "react"

export const withResource = (Component, resourcePath, resourceName) => {
    return props => {
        const [orginalData, setOriginalData] = useState(null);
        const [data, setData] = useState(null);

        useEffect(() => {
            (async () => {
                const response = await axios.get(resourcePath);
                setOriginalData(response.data);
                setData(response.data);
            })()
        }, [])

        const resourceProps = {
            [resourceName]: data
        }



        return <Component {...props} {...resourceProps} />
    }
}
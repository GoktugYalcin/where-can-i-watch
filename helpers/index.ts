import axios from "axios";

export const searchQuery = (query: (string | object)) => {
    const cancel = axios.CancelToken;
    const src = cancel.source()
    return axios({
        cancelToken: src.token,
        method: "POST",
        url: typeof query === "string" ? `/api/search/multi` : `/api/search/country`,
        data: JSON.stringify({
            query: query
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export const getCountryName = (countryCode: string): (string | undefined) => {
    const regionNames = new Intl.DisplayNames(['en'], {type: 'region'})
    return regionNames.of(countryCode) || ''
}
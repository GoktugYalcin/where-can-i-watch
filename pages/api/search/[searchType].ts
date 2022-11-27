// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios";



export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const parseQuery = (query: any): (string | boolean) => {
        const BASE_URL = "https://api.themoviedb.org/3";
        const api = axios.create({ baseURL: BASE_URL })
        const key = process.env.TMDB_API_KEY
        const { searchType } = req.query

        if(req.method === "POST") {
            if(searchType === "multi") {
                api.get("search/multi", {
                    params: {
                        api_key: key,
                        language: 'en-US',
                        query: query,
                        page: 1,
                        include_adult: false
                    },
                }).then(response => {
                    console.log("turned with " + response.data.results)
                    res.status(200).json(response.data.results)
                }).catch((err): void => {
                    console.log("error..." + err.message)
                    if (axios.isCancel(err)) {
                        console.log('Previous request canceled, new request is send', err.message);
                    }
                    else {
                        console.log(err.message)
                    }
                })
            }
            else if(searchType === "country") {
                api.get(`${query.media_type}/${query.id}/watch/providers`, {
                    params: {
                        api_key: key
                    },
                }).then(response => {
                    res.status(200).json(response.data.results)
                }).catch((err: Error): void => {
                    if (axios.isCancel(err)) {
                        console.log('Previous request canceled, new request is send', err.message);
                    }
                    else {
                        console.log(err)
                    }
                })
            }
        }


        return true
    }

    parseQuery(req.body.query)
}

import React from "react";
import styles from "../styles/watchProviders.module.css";
import {Provider, ProviderCard} from "./providerCard";

export interface countryNode {
    link: string,
    buy?: Array<object>,
    rent?: Array<object>,
    flatrate?: Array<object>,
}

interface Props {
    country: countryNode
}

enum providerTypes {
    BUY,
    RENT,
    FLATRATE
}

const WatchProviders = (props: Props) => {
    const {country} = props
    return <div className={styles.containerProviders}>
            {
                country.buy && country.buy.map((value: object, index: number) => {
                    return <ProviderCard type={providerTypes.BUY} key={index} value={value}/>
                })
            }
            {
                country.rent && country.rent.map((value: object, index: number) => {
                    return <ProviderCard type={providerTypes.RENT} key={index} value={value}/>
                })
            }
            {
                country.flatrate && country.flatrate.map((value: object, index: number) => {
                    return <ProviderCard type={providerTypes.FLATRATE} key={index} value={value}/>
                })
            }
        </div>
}

export default WatchProviders
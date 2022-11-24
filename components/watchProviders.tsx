import React from "react";
import styles from "../styles/watchProviders.module.css";
import ProviderCard, {Provider} from "./providerCard";

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
                country.buy ?
                    <div className={`${styles.section} animate__animated animate__fadeIn`}>
                        <span>
                            Buy
                        </span>
                        <div className={styles.sectionItems}>
                            {
                                country.buy.map((value: object, index: number) => {
                                    return <ProviderCard type={providerTypes.BUY} key={index} value={value}/>
                                })
                            }
                        </div>
                    </div>
                    : <></>
            }
            {
                country.rent ?
                    <div className={`${styles.section} animate__animated animate__fadeIn`}>
                        <span>Rent</span>
                    {
                        <div className={styles.sectionItems}>
                            {country.rent.map((value: object, index: number) => {
                                return <ProviderCard type={providerTypes.RENT} key={index} value={value}/>
                            })}
                        </div>
                    }
                    </div> : <></>
            }
            {
                country.flatrate ?
                    <div className={`${styles.section} animate__animated animate__fadeIn`}>
                        <span>Streaming Service</span>
                    {
                        <div className={styles.sectionItems}>
                            {country.flatrate.map((value: object, index: number) => {
                                return <ProviderCard type={providerTypes.FLATRATE} key={index} value={value}/>
                            })}
                        </div>
                    }
                    </div>: <></>
            }
        </div>
}

export default WatchProviders
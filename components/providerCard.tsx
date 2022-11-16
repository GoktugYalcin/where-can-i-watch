import React from 'react'
import styles from "../styles/watchProviders.module.css";
import Image from "next/image";
import {object} from "prop-types";

interface Props {
    type: number,
    value: any
}

export interface Provider{
    logo_path: string,
    provider_id: number,
    provider_name: string,
    display_priority: number
}

const getTypeName = (type: number): string => {
    switch (type) {
        case 0:
            return 'You can buy';
            break;
        case 1:
            return 'You can rent';
            break;
        case 2:
            return 'You can watch with flatrate';
            break;
        default:
            return ''
            break;
    }
}

export const ProviderCard = (props: Props) => {
    const {value, type} = props
    return <div className={`${styles.card} animate__animated animate__fadeIn`}>
        <Image src={`https://image.tmdb.org/t/p/h632/${value.logo_path}`} alt={value.provider_name} width={100} height={100} className={styles.logo}/>
        <div className={styles.infoContainer}>
            <span className={styles.name}>{value.provider_name}</span>
            <span className={styles.info}>{getTypeName(type)}</span>
        </div>
    </div>
}
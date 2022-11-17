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
            return 'You can buy it';
            break;
        case 1:
            return 'You can rent it';
            break;
        case 2:
            return 'You can watch it with streaming service';
            break;
        default:
            return ''
            break;
    }
}

export const ProviderCard = (props: Props) => {
    const {value, type} = props
    return <div className={`${styles.card} animate__animated animate__fadeIn`}>
        <Image src={`https://image.tmdb.org/t/p/h632/${value.logo_path}`} alt={value.provider_name} width={125} height={125} className={styles.logo} placeholder={"blur"} blurDataURL={"https://placehold.jp/170x170.png"}/>
        <div className={styles.infoContainer}>
            <span className={styles.name}>{value.provider_name}</span>
        </div>
    </div>
}
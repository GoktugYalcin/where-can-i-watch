import Head from 'next/head'
import styles from '../styles/Home.module.css'
import 'animate.css';
import AsyncSelect from "react-select/async";
import Select, {SingleValue} from "react-select";
import React, {useId, useState} from "react";
import {getCountryName, searchQuery} from "../helpers";
import {countryCodeEmoji} from "country-code-emoji";
import WatchProviders, {countryNode} from "../components/watchProviders";

export interface Option {
    value?: any,
    label?: any
}

export default function Home() {
    const [value, setValue] = useState<object|null>(null)

    const [countryValue, setCountryValue] = useState<Option | null>(null)
    const [countryOpts, setCountryOpts] = useState<Array<countryNode>>([])

    return (
    <div className={styles.container}>
      <Head>
        <title>Where Can I Watch?</title>
        <meta name="description" content="Retrieves the data you can watch the" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍿</text></svg>" />
      </Head>

      <main className={styles.main}>
        <h1 className={"animate__animated animate__fadeIn"}>
          Where Can I Watch?
        </h1>

        <div className={styles.selectContainer}>
            <AsyncSelect
                loadOptions={(input) => {
                    return searchQuery(input).then((r: any) => r.data)
                }}
                instanceId={useId()}
                className={"animate__animated animate__fadeIn"}
                getOptionLabel={(item: any) => (item.title || item.name)}
                getOptionValue={(item: any) => item.id}
                styles={{
                    container: () => ({
                        width: "400px",
                        fontSize: "18px",
                        zIndex: '9999 !important'
                    }),
                    menu: () => ({
                        width: "auto",
                        backgroundColor: '#ffffff',
                        zIndex: '9999 !important',
                        position: 'fixed'
                    }),
                    menuPortal: ({ left, top, ...provided }, state) => ({
                        ...provided,
                        zIndex: '9999 !important'
                    })
                }}
                onChange={(item: SingleValue<object>) => {
                    setValue(item || {})
                    setCountryValue(null)
                    searchQuery(item || {}).then((res: any) => setCountryOpts(res.data))
                }}
                value={value}
                placeholder={"Search the movie..."}
                menuPlacement={'bottom'}
                menuPosition={'fixed'}
            />
            <Select
                isSearchable
                isDisabled={!Boolean(Object.keys(countryOpts).length)}
                options={Object.keys(countryOpts).map((item: string) => {
                    return {
                        label: `${getCountryName(item)} ${countryCodeEmoji(item)}`,
                        value: item
                    }
                })}
                onChange={(item) => {
                    setCountryValue(item || {})
                }}
                value={countryValue}
                instanceId={useId()}
                className={"animate__animated animate__fadeIn"}
                styles={{
                    container: () => ({
                        width: "300px",
                        fontSize: "18px"
                    }),
                    menu: () => ({
                        width: "auto",
                        backgroundColor: '#ffffff',
                        zIndex: '9999 !important',
                        position: 'fixed'
                    }),
                    menuPortal: ({ left, top, ...provided }, state) => ({
                        ...provided,
                        zIndex: '9999 !important'
                    })
                }}
                placeholder={"Country..."}
                menuPlacement={'bottom'}
                menuPosition={'fixed'}
             />
        </div>
          {
              countryValue?.value ? <WatchProviders country={countryOpts[countryValue.value]} /> : <></>
          }
      </main>
    </div>
  )
}

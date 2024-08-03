import React, {KeyboardEventHandler, useEffect, useId, useRef} from 'react';

import CreatableSelect from 'react-select/creatable';
import Select from "react-select/base";

const components = {
    DropdownIndicator: null,
};

interface Option {
    readonly label: string;
    readonly value: string;
}

export default () => {
    const selectRef = useRef();
    const [inputValue, setInputValue] = React.useState('');

    useEffect(() => {
        if(selectRef) {
            (selectRef.current as Select).focus()
        }
    }, [selectRef])

    return (
        <Select
            instanceId={useId()}
            ref={selectRef}
            components={components}
            inputValue={inputValue}
            menuIsOpen={false}
            onInputChange={(newValue) => setInputValue(newValue)}
            onChange={(val) => val}
            placeholder="Search..."
            classNames={{
                control: () => 'input',
                container: () => 'container'
            }}
            onMenuClose={() => true}
            onMenuOpen={() => true}
            value={null}
        />
    );
};
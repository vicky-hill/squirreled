import React from 'react'

const Input = ({ number, dollar, name, label, onChange, value, error, placeholder, noLabel, className = '', groupClassName = '', identifier, style, ...rest }) => {

    const preventMinus = (e) => {
        if (e.code === 'Minus') {
            e.preventDefault();
        }
    };

    const round = (n, d) => Number(Math.round(n + "e" + d) + "e-" + d)

    const handleBlur = (e) => {
        e.target.value = round(e.target.value, 2).toFixed(2);
        onChange(e);
    }

    if (number && dollar) {
        throw new Error('Input received both dollar and number props, please pass only numer OR dollar');
    }

    const TextInput = (
        <input
            className={'form__group-input ' + className}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            name={name}
            id={name}
            type="text"
            autoComplete="off"
            {...rest}
        />
    )

    const NumberInput = (
        <input
            className={'form__group-input ' + className}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            name={name}
            id={name}
            type="number"
            onWheel={(e) => e.target.blur()}
            {...rest}
        />
    )

    const DollarInput = (
        <input
            className={'form__group-input ' + className}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            name={name}
            id={name}
            type="number"
            min="0"
            onWheel={(e) => e.target.blur()}
            onKeyDown={preventMinus}
            onBlur={handleBlur}
            {...rest}
        />
    )

    return (
        <div className={`${groupClassName} form__group ${error ? 'invalid' : ''}`} style={style ? style : {}}>
            {
                number ? NumberInput : dollar ? DollarInput : TextInput
            }
            {!noLabel && <label className='form__group-label' htmlFor={name}>{label}</label>}
            <div className="form__group-feedback">{error}</div>
        </div>
    )
}

export default Input;

import React from 'react';
import { spellButton } from './helper';

const Button = (props) => {
    return (
        <button 
            id={spellButton(props.value)}
            value={props.value}
            className={props.classes}
            onClick={(e) => {
                e.preventDefault();
                e.target.blur();
                if (props.handleClick) {
                    props.handleClick(e);
                }
            }}
        >
            {props.value}
        </button>
    )
}

export default Button;
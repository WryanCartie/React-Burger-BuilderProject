import React from 'react'

import classes from './Input.css'
const input = (props)=>{
    let InputElement;
    const inputClasses = [classes.InputElement]

    console.log(props.shouldValidate);
    if(props.shouldValidate && props.invalid && props.touched){
        inputClasses.push(classes.Invalid);
        console.log('Declare toyan interest!'    );
       
    }
    switch(props.elementType){
        case('input'):
            InputElement = <input type={props.elementConfig.type}
            className={inputClasses.join(' ')} 
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}
            />
            break;
        case('textarea'):
            InputElement = <textarea
            className={inputClasses.join(' ')} 
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}
            />
            break;
        case('select'):
            InputElement = <select
            className={inputClasses.join(' ')}
            value={props.value} 
            onChange={props.changed}>
                {props.elementConfig.options.map((option)=>{
                   return <option value={option.value}key={option.value}>{
                       option.displayValue
                   }
                   </option>
                })}

            </select>
            break;
        default:
            InputElement = <input 
            className={classes.InputElement} 
            {...props.elementConfig}
            value={props.value}
            />
            break;
        
    }
    return(
        <div className={classes.Input}>
            <label className={classes.Label}></label>
            {InputElement}
        </div>
    )
}
export default input;
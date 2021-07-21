import React from 'react'
import classes from './Order.css'
const order = (props) => {
    const ingredients = [];
    for(let ingredientName in props.ingredients){
        ingredients.push({
            name:ingredientName,
            amount:props.ingredients[ingredientName]
        })
    }
    const ingredientOutput = ingredients.map((ingredient)=>{
        return<span className={classes.Ingredient}>{ingredient.name} ({ingredient.amount})</span>
    })
    console.log(props)
    return(
        <div className={classes.Order}>
            {ingredientOutput}
            <p>Price: <strong>{props.price}</strong></p>
        </div>
    )
}

export default order;
import React,{Component} from 'react'
import classes from './Orders.css'
import Order from '../../components/Order/Order'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import axios from '../../axios-orders'
class Orders extends Component{
    state={
        orders:[],
        loading:true
    }
    componentDidMount(){
        const fetchedData=[];
        axios.get('/orders.json')
        .then((res)=>{
            for(let key in res.data){
                fetchedData.push({
                    id:key,
                    ...res.data[key]
                })
            }
            console.log(fetchedData)
            this.setState({
                loading:false,
                orders:fetchedData
            })
        })
        .catch((err)=>{
            this.setState({
                loading:false
            })
        })
    }
    render(){
        return(
            <div className={classes.Orders}>
                {this.state.orders.map(order=>{
                    return <Order key={order.id} 
                    ingredients ={order.ingredients}
                    price={order.price}/>
                })}
            </div>
            )
        }
}
export default withErrorHandler(Orders,axios);
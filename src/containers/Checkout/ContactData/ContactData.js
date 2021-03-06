import React,{Component} from 'react'
import {connect} from 'react-redux'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
class ContactData extends Component{
    state={
        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value:'',
                validation : {
                    required : true,
                    minLength: 5,
                    maxLength: 15
                },
                valid:false,
                touched:false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder:'Your Street Name'
                },
                value:'',
                validation : {
                    required : true,
                    minLength: 5,
                    maxLength: 15
                },
                valid:false,
                touched:false
            },
            zipCode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Zip Code'
                },
                value:'',
                validation : {
                    required : true,
                    minLength: 5,
                    maxLength: 15
                },
                valid:false,
                touched:false
            },
            country: {
                elementType:'input',
                elementConfig: {
                    type: 'text',
                    placeholder:'Your Country'
                },
                value:'',
                validation : {
                    required : true,
                    minLength: 5,
                    maxLength: 15
                },
                valid: false,
                touched:false
            },
            email: {
                elementType:'input',
                elementConfig: {
                    type:'email',
                    placeholder:'Your Email'
        
                },
                value:'',
                validation : {
                    required : true,
                    minLength: 5,
                    maxLength: 15
                },
                valid:false,
                touched:false
            },
           deliveryMethod: {
               elementType: 'select',
               elementConfig : {
                   options : [
                       {value:'fastest', displayValue:'Fastest'},
                       {value:'cheapest', displayValue:'Cheapest'}
                   ]
               },
               value: '',
               validation:{}
          
           } 

        },
       
        loading: false
    }
    
    checkValidity(value,rules){
        let isValid = true;
     
            if(rules.required ){
                isValid = value.trim() !== '' && isValid; 
            }
            
            if(rules.minLength ){
                isValid = value.length >= rules.minLength && isValid
            }
           
            if(rules.maxLength ){
                isValid = value.length <= rules.maxLength && isValid 
            }
          
            return isValid;

    }
    orderHandler = (event) =>{
        event.preventDefault();
        this.setState({loading: true });
        const formData = {};
        for(let formDataIdentifier in this.state.orderForm){
            formData[formDataIdentifier] = this.state.orderForm[formDataIdentifier].value;
        }
        const order = {
             ingredients: this.props.ings,
             price: this.props.price,
             orderData:formData
            }
         
         axios.post( '/orders.json', order )
             .then( response => {
                 this.setState( { loading: false} );
                 this.props.history.push( '/' );
             } )
             .catch( error => {
                 this.setState( { loading: false} );
             } );
             
    }
    inputChangedHandler(event,identifier){
        const updatedOrderForm = {...this.state.orderForm}
        const updatedFormElement = {...updatedOrderForm[identifier]}
        updatedFormElement.value = event.target.value;
        console.log('greetings');
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[identifier] = updatedFormElement;
        this.setState({
            orderForm : updatedOrderForm
        })
  
        
    } 
    render(){
        const formElementsArray = [];

        for(let key in this.state.orderForm){
            formElementsArray.push(
                {
                    id:key,
                    config: this.state.orderForm[key]
                }
            )
        }
        console.log(this.props);
        let form = null;
        if(this.state.loading){
            form = <Spinner/>
        }
        else{
           form = <form onSubmit={this.orderHandler}>
                    {formElementsArray.map((formElement) =>{
                        console.log(formElement)
                        
                       return <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) =>this.inputChangedHandler(event,formElement.id)}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}/>
                        
                    })}
                    <Button btnType="Danger">Click to submit</Button>
                </form>
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}

            </div>
        )
    }
}

const mapStateToProps = state =>{
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}
export default connect(mapStateToProps)(ContactData);
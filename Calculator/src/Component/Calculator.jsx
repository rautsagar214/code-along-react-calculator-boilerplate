import React, { useReducer} from 'react'
import "./Calculator.css"
const initState = {
    input : "",
    result : ""
}

let operators = ["+" , "-" , "*" , "/"]

const reducer = (state=initState , {type , payload}) =>{
    switch(type){

        case "AddInput":{
            console.log(payload , type)
            let addOps = true;
            
            if (operators.includes(payload) && operators.includes(state.input.slice(state.input.length-1 , state.input.length))){
                addOps = false
            }else{
                addOps = true
            }

            if (addOps){
                console.log({...state , input:state.input + payload})
                return {...state , input:state.input + payload}
            }
            return {...state}
        }

        case "Calculate":{
            const inpLen = state.input.length

            if (!operators.includes(state.input.slice(state.input.length-1 , state.input.length))){

                try{
                    const result = eval(state.input)
                    if (!Number.isFinite(result)){
                        throw new Error("Cannot Divide by Zero")
                    }
                    const newInp = {...state , res : "" , input : result.toString()}
                    return newInp
                }catch (error) {
                    console.log(error)
                }

            }else{
                return {
                    ...state , 
                    input : eval(state.input.slice(0 , inpLen-1)).toString(),
                    res:""
                }
            }
        }

        case "Delete":{
            return {...state , input:state.input.slice(0 , state.input.length - 1)}
        }

        case "Clear":{
            return {...state,input:"",result:""}
        }

        default: {return state}
    }
}

export default function Calculator() {

    const [state , dispatch] = useReducer(reducer , initState)

    let handleClick = (val) =>{
        dispatch({
            type:"AddInput",
            payload:val
        })
    }

    let handleClear = () =>{
        dispatch({
            type : "Clear"
        })
    }

    let handleCalculate = () =>{
        dispatch({
            type : "Calculate"
        })
    }

    let handleDelete = () =>{
        dispatch({
            type : "Delete"
        })
    }

    return (
    <>
        <div className='calculator'>
            <input type="text+" value={state.input} disabled/>

            <div className='buttons-div grid-col4'>
                <button className='btns span2' onClick={handleClear}>AC</button>
                <button className='btns' onClick={handleDelete}>Del</button>
                <button className='btns' onClick={()=>{handleClick("/")}}>/</button>
                <button className='btns' onClick={()=>{handleClick("7")}}>7</button>
                <button className='btns' onClick={()=>{handleClick("8")}}>8</button>
                <button className='btns' onClick={()=>{handleClick("9")}}>9</button>
                <button className='btns' onClick={()=>{handleClick("")}}></button>
                <button className='btns' onClick={()=>{handleClick("4")}}>4</button>
                <button className='btns' onClick={()=>{handleClick("5")}}>5</button>
                <button className='btns' onClick={()=>{handleClick("6")}}>6</button>
                <button className='btns' onClick={()=>{handleClick("-")}}>-</button>
                <button className='btns' onClick={()=>{handleClick("1")}}>1</button>
                <button className='btns' onClick={()=>{handleClick("2")}}>2</button>
                <button className='btns' onClick={()=>{handleClick("3")}}>3</button>
                <button className='btns' onClick={()=>{handleClick("+")}}>+</button>
                <button className='btns' onClick={()=>{handleClick(".")}}>.</button>
                <button className='btns' onClick={()=>{handleClick("0")}}>0</button>
                <button className='btns span2' onClick={handleCalculate}>=</button>
            </div>
        </div>  
    </>
    )
}
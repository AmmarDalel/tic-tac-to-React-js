/*--------création d'un component à l'aide d'une fonction-------------*/
/*export default function HelloWorld(){
    return <h1> Hello World</h1>
}*/

/*--------création d'un component à l'aide d'une classe-------------*/
import React from "react";
// import {Component} from "react" ;
export default class HelloWorld extends React.Component /* extends Component*/ 
{
    render(){
        return <h1>Hello World</h1> 
    }
}
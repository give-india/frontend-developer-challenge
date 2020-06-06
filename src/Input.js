import React,{useCallback} from 'react';
import Wraper from './HOC/Wraper';

    

function Input (props) {
    const Clickfuntion=()=>
  {
    props.onclickfunction();
  }
    return(<input style={props.styles} id="reenter" onClick={Clickfuntion} value="ADD LINK" type="submit"  />)
}

export default (Wraper(Input)); 
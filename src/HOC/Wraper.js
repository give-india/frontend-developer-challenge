import React from 'react';
import Styles from './Styles';

const Inputstyl = (props) => {
    let _styles = {...Styles.default};
    const newProps = {...props,styles:_styles};
    return newProps
}

export default (WrappedComponent) => {
    return function wrappedRender(args) {
        return WrappedComponent(Inputstyl(args))
    }

}
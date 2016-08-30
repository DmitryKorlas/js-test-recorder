import React from 'react';
import Ink from 'react-ink';
import classnames from 'classnames';
import style from './Button.pcss';

export class Button extends React.Component {

    static propTypes = {
        flat: React.PropTypes.bool, // opt
        floating: React.PropTypes.bool, // opt
        disabled: React.PropTypes.bool, // opt
        iconOnly: React.PropTypes.bool // opt
    };

    static defaultProps = {
        flat: false,
        floating: false,
        disabled: false,
        iconOnly: false
    };

    render() {
        let {flat, disabled, floating, iconOnly, className,  ...props} = this.props;
        let classes = classnames('btn', 'waves-effect', 'waves-light', className, {
            'btn-flat': flat,
            'btn-floating': floating,
            disabled: disabled,
            [style['icon-only']]: iconOnly
        });
        let rippleStyles = iconOnly ? {color:'#1e1e1e'} : null;

        return (
            <button className={classes} {...props}>
                {this.props.children}
                <Ink background={false} style={rippleStyles}/>
            </button>
        );
    }
}

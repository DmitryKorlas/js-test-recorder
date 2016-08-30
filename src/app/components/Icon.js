import React from 'react';
import classnames from 'classnames';

const SIZE_TINY = 'SIZE_TINY';
const SIZE_SMALL = 'SIZE_SMALL';
const SIZE_MEDIUM = 'SIZE_MEDIUM';
const SIZE_LARGE = 'SIZE_LARGE';

export class Icon extends React.Component {

    static propTypes = {
        name: React.PropTypes.string.isRequired,
        size: React.PropTypes.string, // opt
    };

    static defaultProps = {
        size: 'small'
    };

    render() {
        let {size, name} = this.props;
        let classes = classnames('mdi', `mdi-${name}`, {
            tiny: size === SIZE_TINY,
            small: size === SIZE_SMALL,
            medium: size === SIZE_MEDIUM,
            large: size === SIZE_LARGE,
        });

        return (
            <i className={classes}></i>
        );
    }
}

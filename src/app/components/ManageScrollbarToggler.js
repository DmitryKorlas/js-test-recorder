import React from 'react';
import {Button} from './Button';
import {Icon} from './Icon';
import classnames from 'classnames';
import style from './ManageScrollbarToggler.pcss';

export class ManageScrollbarToggler extends React.Component {

    static propTypes = {
        stickToBottom: React.PropTypes.func // opt
    };

    render() {
        return (
            <div className={classnames([style['manage-scrollbar-toggler']])}>
                <Button floating={true} onClick={this.props.stickToBottom} title="Scroll to the end">
                    <Icon style={{color:'white'}} name="arrow-down"></Icon>
                </Button>
            </div>
        );
    }
}

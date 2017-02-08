import React from 'react';
import {Icon} from './Icon';

export class ApplicationBar extends React.Component {

    static propTypes = {
        onSettingsClick: React.PropTypes.func
    };

    renderSettingsLink() {
        return (
            <a onClick={this.props.onSettingsClick}>
                <Icon style={{color:'white'}} name="settings" size="SIZE_LARGE"></Icon>
            </a>
        );
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper orange lighten-2 ">

                    <span className="brand-logo">
                        JS Test Recorder
                    </span>

                    <ul className="right ">
                        <li className="hide-on-med-and-down">version 1.0.1</li>
                        <li>{this.renderSettingsLink()}</li>
                    </ul>
                </div>
            </nav>
        );
    }
}

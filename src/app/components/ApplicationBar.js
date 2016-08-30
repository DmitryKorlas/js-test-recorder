import React from 'react';

export class ApplicationBar extends React.Component {

    render() {
        return (
            <nav>
                <div className="nav-wrapper orange lighten-2 ">
                    <span className="brand-logo">
                        JS Test Recorder
                    </span>

                    <ul className="right hide-on-med-and-down">
                        <li>version 1.0</li>
                    </ul>
                </div>
            </nav>
        );
    }
}

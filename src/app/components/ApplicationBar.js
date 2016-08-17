import React from 'react';
import AppBar from 'material-ui/AppBar';


export class ApplicationBar extends React.Component {

    render() {
        return (
            <AppBar
                title="JS Test Recorder"
                showMenuIconButton={false}
            />
        );
    }
}

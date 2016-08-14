import React from 'react';
import {Provider} from 'react-redux';
import {App} from './App';

export class AppContainer extends React.Component {

    static propTypes = {
        store: React.PropTypes.object.isRequired
    };

    render() {
        const { store } = this.props;
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
}

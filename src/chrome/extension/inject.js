import React, {Component} from 'react';
import {render} from 'react-dom';
import Dock from 'react-dock';
console.log('exec extension code');

class InjectApp extends Component {
    constructor(props) {
        super(props);
        this.state = {isVisible: false};
    }

    buttonOnClick = () => {
        this.setState({isVisible: !this.state.isVisible});
    };

    render() {
        return (
            <div>
                <button onClick={this.buttonOnClick}>
                    Open App
                </button>
                <Dock
                    position="right"
                    dimMode="transparent"
                    defaultSize={0.4}
                    isVisible={this.state.isVisible}
                >
                    <iframe
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                        frameBorder={0}
                        allowTransparency="true"
                        src={chrome.extension.getURL(`inject.html?protocol=${location.protocol}`)}
                    />
                </Dock>
            </div>
        );
    }
}


function findPath(node) {
    var path = '';

    while (node) {
        path = node.nodeName + ' ' + path;
        node = node.parentNode;
    }

    return path;
}

function attachTracer() {
    document.body.addEventListener('click', function (e) {
        //console.log('click happened on ' + findPath(e.target));
        console.log('chrome.extension.id', chrome.extension.id);
        chrome.extension.sendMessage({ololo: 'trololo', path: findPath(e.target), url: document.location.href});
    });
}


window.addEventListener('load', () => {

    const injectDOM = document.createElement('div');
    injectDOM.className = 'inject-react-example';
    injectDOM.style.textAlign = 'center';
    document.body.appendChild(injectDOM);
    render(<InjectApp />, injectDOM);
    attachTracer();
});

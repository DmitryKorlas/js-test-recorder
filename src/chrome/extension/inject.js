import React, {Component} from 'react';
import {render} from 'react-dom';
import Dock from 'react-dock';

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
                {/*<button onClick={this.buttonOnClick}>
                    Open App
                </button>*/}
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


function extractNodeAttributes(node) {
    let nodeAttrs = {};

    if (node.hasAttributes()) {
        nodeAttrs = [...node.attributes].reduce((acc, attribute) => {
            acc[attribute.name] = attribute.value;
            return acc;
        }, {});
    }

    return {
        nodeName: node.nodeName,
        attributes: nodeAttrs // map of attributes
    }
}

function pathFetcher(node) {
    var pathChain = [];

    while (node && node !== document) {
        pathChain.push(extractNodeAttributes(node));
        node = node.parentNode;
    }

    return pathChain;
}

function isTextField(node) {
    return (node.nodeName == 'INPUT' && ['text', 'search'].indexOf(node.type) >= 0) || node.nodeName == 'TEXTAREA';
}

function isSelect(node) {
    return node.nodeName == 'SELECT';
}

function attachTracer() {
    document.body.addEventListener('click', function (e) {
        chrome.extension.sendMessage({
            eventType: 'CLICK', // TODO move to constants
            eventData: null,
            target: {
                url: document.location.href,
                nodePath: pathFetcher(e.target)
            }
        });
    });

    document.body.addEventListener('change', function (e) {
        if (isTextField(e.target)) {
            chrome.extension.sendMessage({
                eventType: 'MUTATE_TEXT_FIELD', // TODO move to constants
                eventData: {value: e.target.value},
                target: {
                    url: document.location.href,
                    nodePath: pathFetcher(e.target)
                }
            });
        } else if (isSelect(e.target)) {
            chrome.extension.sendMessage({
                eventType: 'MUTATE_DROPDOWN', // TODO move to constants
                eventData: {
                    value: e.target.value,
                    selectedIndex: e.target.selectedIndex,
                    selectedOptionText: e.target.options[e.target.selectedIndex].text
                },
                target: {
                    url: document.location.href,
                    nodePath: pathFetcher(e.target)
                }
            });
        }
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

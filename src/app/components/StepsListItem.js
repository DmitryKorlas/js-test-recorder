import React from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid/lib/index';
import _ from 'lodash';
import {Button} from './Button';
import {Icon} from './Icon';
import * as visitorEvents from '../constants/VisitorEvents';
import classnames from 'classnames';
import style from './StepsListItem.pcss';


export class StepsListItem extends React.Component {
    static propTypes = {
        stepNumber: React.PropTypes.number.isRequired, // zero based
        record: React.PropTypes.object.isRequired,
        useChainedAttrs: React.PropTypes.bool,
        deleteStep: React.PropTypes.func.isRequired
    };

    static defaultProps = {
        useChainedAttrs: true
    };

    constructor(props, context) {
        super(props, context);
        this.handleDeleteStepClick = ::this.handleDeleteStepClick; // bind to context
        this.handleExpandChange = ::this.handleExpandChange;
        this.state = {
            isExpanded: false
        };
    }

    handleExpandChange = () => {
        this.setState({isExpanded: !this.state.isExpanded});
    };

    handleDeleteStepClick() {
        this.props.deleteStep(this.props.record.id);
    }

    formatStepData(step) {
        return JSON.stringify(step.data, undefined, '  ');
    }

    formatStepTarget(step) {
        return JSON.stringify(step.target, undefined, '  ');
    }

    formatBriefLine(step, useChainedAttrs) {
        let {data, target} = step;

        if (!useChainedAttrs) {
            return _.takeRight(target.nodePath, 1)[0];
        }

        let tail = _.takeRight(target.nodePath, 3);
        let head = [];

        let lenDiff = target.nodePath.length - tail.length;
        if (lenDiff > 1) {
            head = [target.nodePath[0], ' .... '];
        } else if (lenDiff == 1) {
            head = [target.nodePath[0]];
        }

        return head.concat(tail).join(', ');
    }

    formatActionName(actionName) {
        let names = {
            [visitorEvents.CLICK]: 'Click',
            [visitorEvents.MUTATE_TEXT_FIELD]: 'Change text field',
            [visitorEvents.MUTATE_DROPDOWN]: 'Change dropdown'
        };
        return names[actionName] || actionName;
    }

    render() {
        let {record, stepNumber, useChainedAttrs} = this.props;
        let {isExpanded} = this.state;
        let itemClasses = classnames(style['steps-list-item'], {
            [style['is-expanded']]: !!isExpanded,
            [style['is-collapsed']]: !isExpanded
        });

        let itemBoxClasses = classnames(style['item-box'], {
            [style['act-click']]: record.visitorAction === visitorEvents.CLICK,
            [style['act-edit-text-field']]: record.visitorAction === visitorEvents.MUTATE_TEXT_FIELD,
            [style['act-edit-dropdown']]: record.visitorAction === visitorEvents.MUTATE_DROPDOWN,
        });

        let dataLine = null;
        if (record.data) {
            dataLine = (
                <div className={style['data-line']}>
                    {this.formatStepData(record)}
                </div>
            );
        }

        let briefLine = this.formatBriefLine(record, useChainedAttrs);
        return (
            <div className={itemClasses}>
                <div className={itemBoxClasses}>
                    <Row>
                        <Col xs={2} md={1} onClick={this.handleExpandChange}>
                            <div className={style['step-number']}>{stepNumber}</div>
                        </Col>
                        <Col xs={8} md={9} className={style['content-box']}>
                            <div className={style['brief-line']}>
                                <span className={style['text-primary']}>
                                    {this.formatActionName(record.visitorAction)}&nbsp;
                                </span>
                                <span className={style['text-secondary']} title={briefLine}>
                                    {briefLine}
                                </span>
                            </div>
                            {dataLine}
                            <div className={style['details']}>
                                <h6>Data</h6>
                                <pre>
                                    <code>
                                        {this.formatStepData(record)}
                                    </code>
                                </pre>
                                <h6>Target</h6>
                                <pre>
                                    <code>
                                        {this.formatStepTarget(record)}
                                    </code>
                                </pre>
                            </div>
                        </Col>
                        <Col xs={2}>
                            <div className={classnames(style['actions-box'], 'right-align')}>
                                <Button iconOnly onClick={this.handleDeleteStepClick}>
                                    <Icon style={{color:'black'}} name="delete"></Icon>
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

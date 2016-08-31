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
        deleteStep: React.PropTypes.func.isRequired
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
        return JSON.stringify(step.data, '  ');
    }

    formatStepTarget(step) {
        return JSON.stringify(step.target, '  ');
    }

    formatBriefLine(step) {
        let {data, target} = step;

        let tail = _.takeRight(target.nodePath, 3);
        let head = [];

        let lenDiff = target.nodePath.length - tail.length;
        if (lenDiff > 1) {
            head = [target.nodePath[0], ' .... '];
        } else if (lenDiff == 1) {
            head = [target.nodePath[0]];
        }

        return head.concat(tail).join(',');
    }

    render_old() {
        let {record, stepNumber} = this.props;
        let {isExpanded} = this.state;
        let classes = classnames(style['steps-list-item'], 'collection-item', 'avatar', {
            [style['is-expanded']]: isExpanded,
            [style['is-collapsed']]: !isExpanded
        });
        return (
            <li onClick={this.handleExpandChange}
                 className={classes}>
                <span className="circle green lighten-4">{stepNumber}</span>
                <Button className="secondary-content" iconOnly onClick={this.handleDeleteStepClick}>
                    <Icon style={{color:'black'}} name="delete"></Icon>
                </Button>
                <span className="title">{stepNumber+ ' :: '+ record.visitorAction}</span>
                <p>{this.formatBriefLine(record)}</p>
                <p>
                    <h3>Data</h3>
                    <p>{this.formatStepData(record)}</p>
                    <h3>Target</h3>
                    <p>{this.formatStepTarget(record)}</p>
                </p>
            </li>
        )
    }

    render() {
        let {record, stepNumber} = this.props;
        let {isExpanded} = this.state;
        let itemClasses = classnames(style['steps-list-item'], {
            [style['is-expanded']]: !!isExpanded,
            [style['is-collapsed']]: !isExpanded
        });

        let itemBoxClasses = classnames(style['item-box'], {
            [style['act-click']]: record.visitorAction === visitorEvents.CLICK,
            [style['act-edit']]: record.visitorAction === visitorEvents.EDIT,
        });

        return (
            <div className={itemClasses}>
                <div className={itemBoxClasses}>
                    <Row>
                        <Col xs={1} onClick={this.handleExpandChange}>
                            <div className={style['step-number']}>{stepNumber}</div>
                        </Col>
                        <Col xs={9}>
                            <div className={style['brief-line']}>
                                <strong>{record.visitorAction}</strong>

                                {this.formatBriefLine(record)}
                            </div>
                            <div className={style['data-line']}>
                                {this.formatStepData(record)}
                            </div>
                            <div className={style['details']}>
                                <hr/>
                                <h6>Data</h6>
                                <p>
                                    {this.formatStepData(record)}
                                </p>
                                <h6>Target</h6>
                                <p>
                                    {this.formatStepTarget(record)}
                                </p>
                            </div>
                        </Col>
                        <Col xs={2}>
                            <Button iconOnly onClick={this.handleDeleteStepClick}>
                                <Icon style={{color:'black'}} name="delete"></Icon>
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

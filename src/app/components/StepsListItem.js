import React from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid/lib/index';
import _ from 'lodash';
import {Button} from './Button';
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

    render() {
        let {record, stepNumber} = this.props;
        let {isExpanded} = this.state;
        let classes = classnames(style['steps-list-item'], {
            [style['is-expanded']]: isExpanded,
            [style['is-collapsed']]: !isExpanded
        });
        return (
            <div onClick={this.handleExpandChange}
                 className={classes}>
                <div>{stepNumber+ ' :: '+ record.visitorAction}</div>
                <div>{this.formatBriefLine(record)}</div>
                <div>
                    <Button onClick={this.handleDeleteStepClick}>skip</Button>
                </div>
                <p>
                    <h3>Data</h3>
                    <p>{this.formatStepData(record)}</p>
                    <h3>Target</h3>
                    <p>{this.formatStepTarget(record)}</p>
                </p>
            </div>
        )
    }
}

import React from 'react';
import classnames from 'classnames';
import styles from './SettingsPopup.pcss';
import {Modal} from 'react-overlays';
import {Button} from './Button';

export class SettingsPopup extends React.Component {

    static propTypes = {
        availableFrameworks: React.PropTypes.array.isRequired,
        currentFrameworkId: React.PropTypes.string,
        show: React.PropTypes.bool,
        onClose: React.PropTypes.func,
        onSave: React.PropTypes.func
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            currentFrameworkId: this.props.currentFrameworkId
        };
    }

    componentWillMount() {
        this.setState({currentFrameworkId: this.props.currentFrameworkId});
    }

    onChangeFramework(e) {
        this.setState({currentFrameworkId: e.target.value});
    };

    onSave(e) {
        e.preventDefault();
        if (this.props.onSave) {
            this.props.onSave({currentFrameworkId: this.state.currentFrameworkId});
        }
    }

    onCancelButtonClick(e) {
        e.preventDefault();
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    renderFrameworksList() {
        let list = this.props.availableFrameworks.map((item, index) => {
            return (
                <p key={index}>
                    <input
                        name="framework"
                        type="radio"
                        id={`frameworkItem${index}`}
                        value={item.id}
                        className="with-gap"
                        checked={this.state.currentFrameworkId === item.id}
                        onChange={::this.onChangeFramework}
                    />
                    <label htmlFor={`frameworkItem${index}`}>{item.title}</label>
                </p>
            );
        });

        return (
            <div>
                {list}
            </div>
        );
    }

    render() {
        return (
            <Modal
                aria-labelledby='modal-label'
                className={styles.modal}
                backdropClassName={styles.backdrop}
                show={this.props.show}
                onHide={this.props.onClose}
            >
                <div className={classnames(styles['modal-body'], 'z-depth-2')}>
                    <h5 id='modal-label'>Settings</h5>
                    <div className={styles['section']}>
                        <p>Choose the preferred syntax</p>
                        <form onSubmit={::this.onSave}>
                            {this.renderFrameworksList()}

                            <div className={classnames(styles['modal-footer'], 'right-align')}>
                                <Button flat onClick={::this.onCancelButtonClick}>Cancel</Button>
                                <Button type='submit' flat primary>Save</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        );
    }
}

import React from 'react';
import classnames from 'classnames';
import styles from './SettingsPopup.pcss';
import {Modal} from 'react-overlays';
import {Button} from './Button';

export class SettingsPopup extends React.Component {

    static propTypes = {
        availableFrameworks: React.PropTypes.array.isRequired,
        currentFrameworkId: React.PropTypes.string,
        showSourceOutputHeaderFooter: React.PropTypes.bool,
        attrNameForCapture: React.PropTypes.string,
        show: React.PropTypes.bool,
        onClose: React.PropTypes.func,
        onSave: React.PropTypes.func
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            currentFrameworkId: this.props.currentFrameworkId,
            showSourceOutputHeaderFooter: this.props.showSourceOutputHeaderFooter,
            attrNameForCapture: this.props.attrNameForCapture,
            errors: {}
        };
    }

    componentWillMount() {
        this.setState({
            currentFrameworkId: this.props.currentFrameworkId,
            showSourceOutputHeaderFooter: this.props.showSourceOutputHeaderFooter,
            attrNameForCapture: this.props.attrNameForCapture
        });
    }

    onChangeFramework(e) {
        this.setState({currentFrameworkId: e.target.value});
    };

    onChangeHeaderFooterCheckbox(e) {
        this.setState({showSourceOutputHeaderFooter: e.target.checked});
    }

    onChangeAttrNameForCapture(e) {
        this.setState({attrNameForCapture: e.target.value});
    }

    onSave(e) {
        e.preventDefault();
        let data = {
            currentFrameworkId: this.state.currentFrameworkId,
            showSourceOutputHeaderFooter: this.state.showSourceOutputHeaderFooter,
            attrNameForCapture: this.state.attrNameForCapture.trim()
        };

        let validationResult = this.validateFormData(data);
        this.setState({errors: validationResult});
        if (Object.keys(validationResult).length === 0 && this.props.onSave) {
            this.props.onSave(data);
        }
    }

    onCancelButtonClick(e) {
        e.preventDefault();
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    validateFormData(formData) {
        let result = {};
        if (!/^[-_:.a-z0-9]+$/i.test(formData.attrNameForCapture)) {
            result.attrNameForCapture = 'invalid attribute name';
        }

        return result;
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
                        <form onSubmit={::this.onSave}>
                            <div className={styles['section']}>
                                <p>Choose the preferred syntax</p>
                                {this.renderFrameworksList()}
                            </div>
                            <div className={styles['section']}>
                                <p>Visualisation</p>
                                <p>
                                    <input type="checkbox"
                                           id="showSourceOutputHeaderFooter"
                                           onChange={::this.onChangeHeaderFooterCheckbox}
                                           checked={this.state.showSourceOutputHeaderFooter} />
                                    <label htmlFor="showSourceOutputHeaderFooter">Show header/footer code blocks</label>
                                </p>
                            </div>
                            <div className={styles['section']}>
                                <p>Web page capture</p>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input placeholder="Attribute name for capture"
                                               id="attrNameForCapture"
                                               type="text"
                                               className={classnames(
                                                   {
                                                       validate: true,
                                                       invalid: !!this.state.errors.attrNameForCapture
                                                   }
                                               )}
                                               value={this.state.attrNameForCapture}
                                               onChange={::this.onChangeAttrNameForCapture}
                                        />
                                        <label htmlFor="attrNameForCapture" className="active"
                                               data-error={this.state.errors.attrNameForCapture}>
                                            Attribute name for capture
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className={classnames(styles['modal-footer'], 'right-align')}>
                                <Button flat onClick={::this.onCancelButtonClick}>Cancel</Button>
                                <Button type='submit' flat primary>Save</Button>
                            </div>
                        </form>
                </div>
            </Modal>
        );
    }
}

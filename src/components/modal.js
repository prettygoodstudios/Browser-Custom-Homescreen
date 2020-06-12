import React, {Component} from "react";

export default class Modal extends Component{

    constructor(props){
        super(props);
        this.state = {

        }
    }

    submitModal = () => {
        this.props.submit();
    }

    closeModal = () => {
        this.props.close();
    }

    render(){
        const {children, submitText, title} = this.props;
        return(
            <div className="background-mask">
                <div className="modal">
                    <div className="modal__header">
                        <div className="modal__header__title">
                            {title}
                        </div>
                        <a className="modal__header__close" onClick={this.closeModal}>
                            <div></div>
                            <div></div>
                        </a>
                    </div>
                    <div className="modal__body">
                        {children}
                    </div>
                    <div className="modal__footer">
                        <a className="modal__footer__submit" onClick={this.submitModal}>
                            {submitText}
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}
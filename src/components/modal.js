import React, {Component} from "react";

const Modal = (props) => {
    const {children, submitText, title, show, submit, close} = props;
    if(!show){
        return <div></div>;
    }
    return(
        <div className="background-mask">
            <div className="modal">
                <div className="modal__header">
                    <div className="modal__header__title">
                        {title}
                    </div>
                    {   close &&
                        <a className="modal__header__close" onClick={close}>
                            <div></div>
                            <div></div>
                        </a>
                    }
                </div>
                <div className="modal__body">
                    {children}
                </div>
                {   submitText || submit &&
                    <div className="modal__footer">
                        <a className="modal__footer__submit" onClick={this.submitModal}>
                            {submitText}
                        </a>
                    </div>
                }
            </div>
        </div>
    );
}

export default Modal;
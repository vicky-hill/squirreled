import { useEffect, useState } from 'react'
import classNames from 'classnames'
import Button from './Button'

const Modal = ({ modal, setModal, title, shouldCloseOnOutsideClick, children, saveChanges }) => {
    const [isOpen, setIsOpen] = useState(false);

    const open = () => setIsOpen(true);
    const close = () => setModal ? setModal(false) : setIsOpen(false);

    const classes = classNames('modal', {
        'open': isOpen || modal
    });

    useEffect(() => {
        const body = document.querySelector('body').classList;
        isOpen || modal ? body.add('no-scroll') : body.remove('no-scroll');
    }, [isOpen, modal])


    const closeOnOutsideClick = (e) => {
        if (shouldCloseOnOutsideClick && e.target.classList[0] === 'modal') {
            close();
        }
    }

    return (
        <>
            {!setModal && (<Button onClick={open}> Launch modal within Modal Component </Button>)}

            <div className={classes} onClick={(e) => closeOnOutsideClick(e)}>
                <div className="modal__content">

                    {/* Header */}
                    {title && (
                        <div className="modal__header">
                            <p className="modal__header-title">{title}</p>
                            <span className="modal__header-close" onClick={close}>&times;</span>
                        </div>
                    )}

                    {/* Body */}
                    <div className="modal__body">
                        {children}
                    </div>

                    {/* Footer */}
                    <div className="modal__footer" onClick={() => {saveChanges(); close();}}>
                        <button className="">Save changes</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal;

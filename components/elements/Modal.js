import { useEffect, useState } from 'react'
import classNames from 'classnames'
import Button from './Button'

const Modal = ({ modal, setModal, title, shouldCloseOnOutsideClick, children, onSave, yes, onClose, onOpen }) => {
    const [isOpen, setIsOpen] = useState(false);

    const open = () => { 
        setIsOpen(true);
        onOpen && onOpen();
    }
   
    const close = () => {
        if (setModal) {
            setModal(false);
        }
        else {
            setIsOpen(false)
        }

        onClose && onClose();
    }


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
                    <div className="modal__footer">
                        {onSave && <button type='submit' onClick={onSave}> Save changes</button>}

                        {yes && (
                            <>
                                <button className='mr-6' onClick={close}>No</button>
                                <button onClick={() => { yes(); close(); }}>Yes</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal;

import React from 'react'
import classNames from 'classnames'

const Container = ({ children, className, center, content }) => {

    const classes = classNames('container', {
        [className]: className,
        'center': center,
        'content--extra-narrow': content && content.includes('extra-narrow'),
        'content--fit-screen': content && content.includes('fit-screen')
    });

    return (
        <div className={classes}>
            { children }
        </div>
    )
}

export default Container;

import React from 'react'

const List = ({ products }) => {

    return (
        <div className="flex flex-wrap mt-10 md:mt-16 text-center md:text-left">
            {
                products.map(product => (
                    <span key={product} className='flex-none w-full md:w-1/3 lg:w-1/5 mb-4'>{product}</span>
                ))
            }
        </div>
    )
}

export default List;

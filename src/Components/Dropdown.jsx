import React from 'react'

const Dropdown = ({
    currencies,
    setCurrency,
    currency,
    title=''
}) => {
  return (
    <div>
        
        <label htmlFor={title}>{title}</label>
        <div className='mt-1 relative'>
            <select value={currency} onChange={(e)=>setCurrency(e.target.value)} className='w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'>
                {currencies .map((curr)=>{
                    return(
                        <option value={curr} key={curr}>{curr}</option>
                    );
                })}
            </select>
        </div>
    </div>
  )
}

export default Dropdown;
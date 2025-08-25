import React from 'react';

const Button = ({ onclickHandler, value, title }) => {
  return (
    <button
      onClick={onclickHandler}
      value={value}
      className="bg-white text-black border border-gray-300 px-4 py-2 
                 hover:bg-blue-500 hover:text-white transition-all duration-300"
    >
      {title}
    </button>
  );
};

export default Button;

import React from 'react';
import api from '../services/api';

const Spinner = () => {
    console.log(api)
  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;

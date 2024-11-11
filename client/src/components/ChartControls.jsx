import React from 'react';

const ChartControls = ({ showModeOn, showModeOff, setShowModeOn, setShowModeOff }) => {
  return (
    <div className="items-center ">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Energy Consumed</h2>
      
      
        <div className='flex items-center justify-center mb-3'>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showModeOn && showModeOff}
            onChange={() => {
              const toggleBoth = !(showModeOn && showModeOff);
              setShowModeOn(toggleBoth);
              setShowModeOff(toggleBoth);
            }}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700"> Both</span>
        </label>
        </div>
        <div className="flex items-center justify-center space-x-4">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showModeOn}
            onChange={() => setShowModeOn(!showModeOn)}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Energy Saving Mode ON</span>
        </label>
        
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showModeOff}
            onChange={() => setShowModeOff(!showModeOff)}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Energy Saving Mode OFF</span>
        </label>
      </div>
    </div>
  );
};

export default ChartControls;
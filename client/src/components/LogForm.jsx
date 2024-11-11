import React, { useState } from 'react';
import axios from '../services/api';

const LogForm = () => {
    const [formData, setFormData] = useState({
        access_time: '',
        access_date: '',
        employee_name: '',
        algo_status: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/log', formData);
            alert('Log saved');
        } catch (error) {
            alert('Failed to save log');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg mb-6">
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Access Time</label>
                <input type="time" name="access_time" value={formData.access_time} onChange={handleChange} className="border px-2 py-1 rounded w-full" required />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Access Date</label>
                <input type="date" name="access_date" value={formData.access_date} onChange={handleChange} className="border px-2 py-1 rounded w-full" required />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Employee Name</label>
                <input type="text" name="employee_name" value={formData.employee_name} onChange={handleChange} className="border px-2 py-1 rounded w-full" required />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Energy Saving Mode</label>
                <select name="algo_status" value={formData.algo_status} onChange={handleChange} className="border px-2 py-1 rounded w-full">
                    <option value="">Select Mode</option>
                    <option value="ON">Energy Saving Mode ON</option>
                    <option value="OFF">Energy Saving Mode OFF</option>
                </select>
            </div>
            <button type="submit" className="w-full py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500">Submit Log</button>
        </form>
    );
};

export default LogForm;
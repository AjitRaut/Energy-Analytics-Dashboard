import React, { useEffect, useState } from 'react';
import axios from '../services/api';

const AccessLogs = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        try {
            const response = await axios.get('/log/logs');
            setLogs(response.data);
        } catch (error) {
            alert('Failed to fetch access logs');
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Access Logs</h3>
            <ul>
                {logs.map((log, index) => (
                    <li key={index} className="mb-2">
                        <span>{log.access_time}</span> - <span>{log.employee_name}</span> - <span>{log.algo_status}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AccessLogs;

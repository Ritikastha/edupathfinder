// src/components/AuditLogs.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

 
    const fetchLogs = async () => {
      try {
          const response = await axios.get('/api/audit/logs');
          setLogs(response.data);
          setFilteredLogs(response.data);
      } catch (err) {
          setError(err);
      } finally {
          setLoading(false);
      }
  };
  
  useEffect(() => {
      fetchLogs();
  }, []);
  

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = logs.filter(log => {
      return (
        log.userName.toLowerCase().includes(term.toLowerCase()) ||
        log.eventType?.toLowerCase().includes(term.toLowerCase()) ||
        log.description?.toLowerCase().includes(term.toLowerCase())
      );
    });
    setFilteredLogs(filtered);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching logs: {error.message}</p>;

  return (
    <div>
      <input
        type="text"
        placeholder="Search logs..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>User</th>
            <th>IP Address</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredLogs.map(log => (
            <tr key={log._id}>
              <td>{new Date(log.timestamp).toLocaleString()}</td>
              <td>{log.userName}</td>
              <td>{log.ipAddress}</td>
              <td>{log.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuditLogs;

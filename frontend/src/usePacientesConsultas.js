import { useState, useEffect, useCallback } from 'react';

const usePacientesConsultas = () => {
  const [pacientes, setPacientes] = useState([]);
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPacientes = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/pacientes');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPacientes(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchConsultas = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/consultas');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setConsultas(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPacientes();
    fetchConsultas();
  }, [fetchPacientes, fetchConsultas]);

  return {
    pacientes,
    consultas,
    loading,
    error,
    fetchPacientes,
    fetchConsultas
  };
};

export default usePacientesConsultas;
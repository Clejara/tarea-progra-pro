import React from 'react';

function DeletePaciente({ rut, onDeleteComplete }) {
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/pacientes/${rut}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      onDeleteComplete();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <button onClick={handleDelete}>
      Delete
    </button>
  );
}

export default DeletePaciente;
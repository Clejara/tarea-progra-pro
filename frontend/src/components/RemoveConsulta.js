import React from 'react';

function RemoveConsulta({ codigo, onDeleteComplete }) {
  console.log(codigo);
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/consultas/${codigo}`, {
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
      Remove
    </button>
  );
}

export default RemoveConsulta;
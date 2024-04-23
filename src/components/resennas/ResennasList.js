import Resennna from './Resenna';
import React from 'react';
import { getResenna } from '../../api/resennaApi';
import { useAuth } from '../Context/AuthProvider';
import 'leaflet/dist/leaflet.css';

function ResennaList({ onDeleteResennna, searchTerm }) {
  const { resenna, setResennna } = useAuth();
  const [isLoading, setIsLoading] = React.useState(true);
  const [allResennas, setAllResennas] = React.useState([]);

  const downloadResennas = async () => {
    setIsLoading(true);
    try {
      const resennaData = await getResenna();
      setResennna(resennaData);
      setAllResennas(resennaData); // Guardar todas las reseñas en el estado local
    } catch (error) {
      console.error('Error fetching reseñas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    downloadResennas();
  }, []);

  const filteredResennas = resenna.filter(resenna =>
    resenna.num.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <p>Cargando reseñas...</p>;
  }

  if (filteredResennas.length === 0 && searchTerm) {
    return <p>No se han encontrado reseñas con el número buscado.</p>;
  }

  if (filteredResennas.length === 0) {
    return <p>No hay reseñas disponibles.</p>;
  }

  return (
    <div className="App">
      <div className='results'>
        {filteredResennas.map(resenna =>
          <Resennna key={resenna.id} resenna={resenna} onDeleteResennna={onDeleteResennna} allResennas={allResennas}/>
        )}
      </div>
    </div>
  );
}

export default ResennaList;
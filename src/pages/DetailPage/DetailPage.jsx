import { useParams } from 'react-router-dom';


function DetailPage() {
  const { id } = useParams(); // Per leggere l'ID dalla URL
  return (
    <div className="detail-page">
      <h1>Dettagli Ricetta: ID {id}</h1>
      {/* Qui andranno i dettagli della ricetta */}
    </div>
  );
}

export default DetailPage
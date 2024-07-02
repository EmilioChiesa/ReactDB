import React, { useEffect, useState } from 'react';
import './WineList.css'; // Importar el archivo CSS con los estilos

const WineList = () => {
  // Estado para almacenar la lista de vinos
  const [wines, setWines] = useState([]);

  // Estado para el vino seleccionado
  const [selectedWine, setSelectedWine] = useState(null);

  // Estado para almacenar los detalles del vino seleccionado, incluyendo sus reseñas
  const [wineDetails, setWineDetails] = useState(null);

  // Efecto de efecto para cargar la lista de vinos desde el servidor al montar el componente
  useEffect(() => {
    fetch('http://localhost:3000/wines') // Hacer una solicitud GET al servidor para obtener la lista de vinos
      .then(response => response.json()) // Convertir la respuesta a formato JSON
      .then(data => setWines(data)) // Actualizar el estado 'wines' con los datos obtenidos
      .catch(error => console.error('Error fetching wines:', error)); // Manejar errores de la solicitud
  }, []); // El segundo argumento de useEffect vacío indica que solo se debe ejecutar una vez, equivalente a componentDidMount

  // Manejar el cambio de selección en el selector de vinos
  const handleSelectChange = (event) => {
    setSelectedWine(event.target.value); // Actualizar el estado 'selectedWine' con el vino seleccionado
  };

  // Manejar el clic en el botón 'Ver Detalles' para obtener y mostrar los detalles del vino seleccionado
  const handleButtonClick = () => {
    fetch(`http://localhost:3000/wines/${selectedWine}`) // Hacer una solicitud GET al servidor para obtener los detalles del vino seleccionado
      .then(response => response.json()) // Convertir la respuesta a formato JSON
      .then(data => {
        // Separar las reseñas en usuarios premium y no premium
        const premiumReviews = data.reviews.filter(review => review.isPremium); // Filtrar las reseñas premium
        const nonPremiumReviews = data.reviews.filter(review => !review.isPremium); // Filtrar las reseñas no premium

        // Ordenar las reseñas premium por fecha descendente
        premiumReviews.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Ordenar las reseñas no premium por fecha descendente
        nonPremiumReviews.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Combinar las reseñas ordenadas: primero las premium, luego las no premium
        const sortedReviews = [...premiumReviews, ...nonPremiumReviews];

        // Actualizar el estado 'wineDetails' con los detalles del vino y las reseñas ordenadas
        setWineDetails({ ...data, reviews: sortedReviews });
      })
      .catch(error => console.error('Error fetching wine details:', error)); // Manejar errores de la solicitud
  };

  // Renderizar el componente WineList
  return (
    <div className="wine-list-container">
      <h1 className="wine-list-title">Lista de Vinos</h1>
      {/* Selector de vinos para seleccionar un vino */}
      <select className="wine-list-select" onChange={handleSelectChange}>
        <option value="">Selecciona un vino</option>
        {/* Mapear cada vino en la lista para crear opciones en el selector */}
        {wines.map((wine) => (
          <option key={wine._id} value={wine._id}>
            {wine.name}
          </option>
        ))}
      </select>
      {/* Botón para cargar los detalles del vino seleccionado */}
      <button className="wine-list-button" onClick={handleButtonClick} disabled={!selectedWine}>
        Ver Detalles
      </button>

      {/* Mostrar los detalles del vino seleccionado si existen en el estado 'wineDetails' */}
      {wineDetails && (
        <div>
          <h2>{wineDetails.name}</h2>
          <h3>Reseñas:</h3>
          {/* Mostrar las reseñas del vino seleccionado */}
          {wineDetails.reviews.length > 0 ? (
            <ul className="wine-list-reviews">
              {/* Mapear cada reseña para mostrarla como un elemento de lista */}
              {wineDetails.reviews.map((review, index) => (
                <li key={index} className="wine-list-review-item">
                  <p><strong>Usuario:</strong> {review.username}</p>
                  <p><strong>Premium:</strong> {review.isPremium ? 'Sí' : 'No'}</p>
                  <p><strong>Puntaje:</strong> {review.rating}</p>
                  <p><strong>Comentario:</strong> {review.comment}</p>
                  <p><strong>Fecha:</strong> {new Date(review.date).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="wine-list-no-reviews">No hay reseñas disponibles.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default WineList;

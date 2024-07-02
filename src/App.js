import React, { useState } from 'react';
import WineList from './components/WineList';
import WineDetail from './components/WineDetail';
import CreateReview from './components/CreateReview';
import './App.css';

function App() {
  const [selectedWineId, setSelectedWineId] = useState(null);
  const [wines, setWines] = useState([]);

  const handleReviewAdded = (updatedWine) => {
    setWines(wines.map(wine => wine._id === updatedWine._id ? updatedWine : wine));
  };

  return (
    <div className="App">
      <WineList wines={wines} onSelectWine={setSelectedWineId} />
      {selectedWineId && (
        <>
          <WineDetail wineId={selectedWineId} />
          <CreateReview wineId={selectedWineId} onReviewAdded={handleReviewAdded} />
        </>
      )}
    </div>
  );
}

export default App;

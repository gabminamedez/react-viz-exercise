import { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import ReactApexChart from 'react-apexcharts';
import Papa from 'papaparse';

import dataset from './nba.csv';

import 'bootstrap/dist/css/bootstrap.min.css';

const data = [];

function App() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    Papa.parse(dataset, {
      download: true,
      header: true,
      complete: function(res) {
          console.log("Finished:", res.data[0]);
          setResults(res.data);
      }
    });
  }, []);

  return (
    <div className="App">
      <Container>
        <h1>Yeet</h1>

        {Object.entries(results).map(([key, value]) => {
          return (
            <p key={key}>{value.player}</p>
          );
        })}
      </Container>
    </div>
  );
}

export default App;
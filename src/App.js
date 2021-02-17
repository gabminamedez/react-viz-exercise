import { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import Papa from 'papaparse';
import ReactApexChart from 'react-apexcharts';

import Chart from './components/Chart';
import dataset from './covid.csv';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [dates, setDates] = useState([]);
  const [cases, setCases] = useState([]);
  const [deaths, setDeaths] = useState([]);
  const [recoveries, setRecoveries] = useState([]);

  useEffect(() => {
    Papa.parse(dataset, {
      download: true,
      header: true,
      complete: function(res) {
        for(var i = 0; i < res.data.length; i++){
          setDates(dates => [...dates, String(res.data[i].Date)]);
          setCases(cases => [...cases, parseInt(res.data[i].New)]);
          setDeaths(deaths => [...deaths, parseInt(res.data[i].Deaths)]);
          setRecoveries(recoveries => [...recoveries, parseInt(res.data[i].Recoveries)]);
        }
      }
    });
  }, []);

  const series = [
    {
      name: "Cases",
      data: cases
    },
    {
      name: "Deaths",
      data: deaths
    },
    {
      name: "Recoveries",
      data: recoveries
    }
  ];

  const options = {
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: dates
    },
    tooltip: {
      x: {
        format: "MM/dd/yy"
      }
    }
  };

  return (
    <div className="App">
      <Container>
        <header><h1><b>COVID-19 Cases Dashboard</b></h1></header>
        <hr></hr>

        <ReactApexChart
          series={series}
          options={options}
          type="area"
          height={350}
        />
      </Container>
    </div>
  );
}

export default App;
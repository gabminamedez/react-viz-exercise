import { useState, useEffect } from 'react';
import { Container, Form, FormGroup, Label, Input } from 'reactstrap';
import Papa from 'papaparse';
import ReactApexChart from 'react-apexcharts';

import dataset from './popn.csv';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [years, setYears] = useState([]);
  const [populations, setPopulations] = useState([]);
  const [changes, setChanges] = useState([]);
  const [urbans, setUrbans] = useState([]);
  const [chartType, setChartType] = useState("line");

  useEffect(() => {
    Papa.parse(dataset, {
      download: true,
      header: true,
      complete: function(res) {
        for(var i = 0; i < res.data.length; i++){
          setYears(years => [...years, String(res.data[i].Year)]);
          setPopulations(populations => [...populations, parseInt(res.data[i].Population)]);
          setChanges(changes => [...changes, parseInt(res.data[i].Change)]);
          setUrbans(urbans => [...urbans, parseInt(res.data[i].Urban)]);
        }
      }
    });
  }, []);

  const series = [
    {
      name: "Population",
      data: populations
    },
    {
      name: "Urban Population",
      data: urbans
    },
    {
      name: "Change from Previous Year",
      data: changes
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
      type: "category",
      categories: years
    },
    tooltip: {
      x: {
        format: "yyyy"
      }
    }
  };

  return (
    <div className="App">
      <Container>
        <header className="text-center"><h1><b>🇵🇭 The Philippine Population Through the Years 🇵🇭</b></h1></header>
        <hr></hr>

        <Form>
          <FormGroup>
            <Label for="selectChart"><b>Select Chart Type</b></Label>
            <Input  onChange={e => setChartType(e.target.value)} type="select" name="chart" id="selectChart">
              <option value="line">Line Chart</option>
              <option value="area">Area Chart</option>
              <option value="bar">Bar Chart</option>
            </Input>
          </FormGroup>
        </Form>

        <ReactApexChart
          series={series}
          options={options}
          type={chartType}
          height={500}
        />
      </Container>
    </div>
  );
}

export default App;
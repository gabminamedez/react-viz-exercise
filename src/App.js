import { useState, useEffect } from 'react';
import { Button, Container, FormGroup, Label, Input, Row, Col, Collapse } from 'reactstrap';
import ApexCharts from 'apexcharts';
import { CirclePicker } from 'react-color';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const options = {
    chart: {
      id: "chart",
      type: "line",
      height: 400,
      toolbar: { tools: { selection: false, zoom: false, zoomin: false, zoomout: false, pan: false, reset: false }
      }
    },
    title: {
      text: "",
      align: "center",
      style: { fontSize: "18px", fontWeight: "bold" }
    },
    xaxis: {
      type: "category",
      categories: [1955, 1960, 1965, 1970, 1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015, 2020]
    },
    colors: ["#f44336", "#03a9f4", "#ffeb3b"],
    tooltip: {
      x: { format: "yyyy" }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "smooth"
    },
    legend: {
      position: "right",
    },
    responsive: [
      { breakpoint: 991,
        options: { legend: { position: "bottom" } }
      }
    ],
    series: [
      { name: "Population", data: [22177058, 26269734, 30909988, 35803594, 41285742, 47357743, 54275822, 61895160, 69784088, 77991755, 86326250, 93966780, 102113212, 109581078] },
      { name: "Urban Population", data: [6365919, 7959850, 9770040, 11807882, 14684347, 17752900, 22943780, 29106432, 32515486, 35981065, 39435905, 42487934, 47078199, 52008603] },
      { name: "Change from Previous Year", data: [719314, 818535, 928051, 978721, 1096430, 1214400, 1383616, 1523868, 1577786, 1641533, 1666899, 1528106, 1629286, 1464463] }
    ]
  };

  useEffect(() => { new ApexCharts(document.getElementById("chart"), options).render(); }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [btnText, setBtnText] = useState("Show Table Customizations");
  const toggle = () => {
    setIsOpen(!isOpen);

    if(isOpen){
      setBtnText("Show Table Customizations");
    }
    else{
      setBtnText("Hide Table Customizations");
    }
  }

  const handleTypeChange = (e) => {
    ApexCharts.exec("chart", "updateOptions", {
      chart: { type: e.target.value }
    }, true);
  }

  const handleTitleChange = (e) => {
    if(e.target.value === ""){
      ApexCharts.exec("chart", "updateOptions", {
        title: { text: "" }
      }, true);
    }
    else{
      ApexCharts.exec("chart", "updateOptions", {
        title: { text: e.target.value }
      }, true);
    }
  }

  const handlexLabelChange = (e) => {
    if(e.target.value === ""){
      ApexCharts.exec("chart", "updateOptions", {
        xaxis: { ...options.xaxis, title: { text: "" } }
      }, true);
    }
    else{
      ApexCharts.exec("chart", "updateOptions", {
        xaxis: { ...options.xaxis, title: { text: e.target.value } }
      }, true);
    }
  }

  const handleyLabelChange = (e) => {
    if(e.target.value === ""){
      ApexCharts.exec("chart", "updateOptions", {
        yaxis: { title: { text: "" } }
      }, true);
    }
    else{
      ApexCharts.exec("chart", "updateOptions", {
        yaxis: { title: { text: e.target.value } }
      }, true);
    }
  }

  const handleColor1Change = (color) => {
    const prevColors = options.colors;
    prevColors[0] = color.hex;
    ApexCharts.exec("chart", "updateOptions", {
      colors: prevColors
    }, true);
  }

  const handleColor2Change = (color) => {
    const prevColors = options.colors;
    prevColors[1] = color.hex;
    ApexCharts.exec("chart", "updateOptions", {
      colors: prevColors
    }, true);
  }

  const handleColor3Change = (color) => {
    const prevColors = options.colors;
    prevColors[2] = color.hex;
    ApexCharts.exec("chart", "updateOptions", {
      colors: prevColors
    }, true);
  }

  return (
    <div className="App">
      <Container>
        <header className="text-center"><h1 className="heading"><b>🇵🇭 The Philippine Population Through the Years 🇵🇭</b></h1></header>
        <br />

        <Button color="info" onClick={toggle} className="heading">{btnText}</Button>
        
        <Collapse isOpen={isOpen}>
          <br />
          <FormGroup>
            <Label for="selectChart"><b>Chart Type</b></Label>
            <Input size="sm" onChange={handleTypeChange} type="select" name="chartType" id="selectChart">
              <option value="line">Line Chart</option>
              <option value="area">Area Chart</option>
              <option value="bar">Bar Chart</option>
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="title"><b>Title</b></Label>
            <Input size="sm" type="text" onChange={handleTitleChange} placeholder="Add Title" id="title" />
          </FormGroup>

          <FormGroup>
            <Label for="xLabel"><b>X-Axis Label</b></Label>
            <Input size="sm" type="text" onChange={handlexLabelChange} placeholder="Add X-Axis Label" id="xLabel" />
          </FormGroup>

          <FormGroup>
            <Label for="yLabel"><b>Y-Axis Label</b></Label>
            <Input size="sm" type="text" onChange={handleyLabelChange} placeholder="Add Y-Axis Label" id="yLabel" />
          </FormGroup>

          <Row>
            <Col><FormGroup><Label><b>Population Color</b></Label><br /><CirclePicker circleSize={14} onChange={handleColor1Change} /></FormGroup></Col>
            <Col><FormGroup><Label><b>Urban Population Color</b></Label><br /><CirclePicker circleSize={14} onChange={handleColor2Change} /></FormGroup></Col>
            <Col><FormGroup><Label><b>Change from Previous Year Color</b></Label><br /><CirclePicker circleSize={14} onChange={handleColor3Change} /></FormGroup></Col>
          </Row>
        </Collapse>

        <div id="chart" />
      </Container>
    </div>
  );
}

export default App;
import React from 'react';
import logo from './logo.svg';
import './App.css';
import GridContainer from "../src/molecules/Grid/GridContainer"
import GridItem from "../src/molecules/Grid/GridItem";

function App() {
  return (
    <div className="App">
      <GridContainer><GridItem xs={6}>yrdy</GridItem> </GridContainer>
    </div>
  );
}

export default App;

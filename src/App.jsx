import React from 'react'
import ActiveSinceChart from './components/ActiveSinceChart'
import AgeChart from './components/AgeChart'
import BodyTypeChart from './components/BodyTypeChart'
import CupSizeChart from './components/CupSizeChart'
import DateTypeChart from './components/DateTypeChart'
import GenderChart from './components/GenderChart'
import HairColorChart from './components/HairColorChart'
import HeightChart from './components/HeightChart'
import LanguageChart from './components/LanguageChart'
import OrientationChart from './components/OrientationChart'
import OriginChart from './components/OriginChart'
import PenisSizeChart from './components/PenisSizeChart'
import PriceChart from './components/PriceChart'
import ServiceChart from './components/ServiceChart'
import ServiceExtraPriceChart from './components/ServiceExtraPriceChart'
import GenderSelector from './components/GenderSelector'
import './App.css'

function App() {
  return (
    <>
      <h1>Kinky stats</h1>
      <h2>Basisgegevens</h2>
      <div className="row">
        <GenderChart />
        <AgeChart />
        <DateTypeChart />
      </div>
      <div className="row">
        <OriginChart />
        <LanguageChart />
        <ActiveSinceChart />
      </div>
      <h2>Eigenschappen</h2>
      <div className="row">
        <HairColorChart />
        <BodyTypeChart />
        <OrientationChart />
      </div>
      <div className="row">
        <HeightChart />
        <CupSizeChart />
        <PenisSizeChart />
      </div>
      <h2>Mogelijkheden</h2>
      <div className="row">
        <ServiceChart />
        <ServiceExtraPriceChart />
      </div>
      <h2>Prijzen</h2>
      <div className="row">
        <PriceChart />
      </div>
    </>
  )
}

export default App

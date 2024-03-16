import React from 'react'
import './MainDash.css'
import Dashboard from './Dashboard/Dashboard'
import Conversation from './Conversation/Conversation'
import ImageGenerator from './Image/ImageGenerator'
import BackgroundRemover from './Music/BackgroundRemover'
import Code from './Code/Code'

const MainDash = ({selected, setSelected}) => {
  return (
    <div className='MainDash'>
      <div style={selected !== 0 ? {display: 'none'}:null}><Dashboard setSelected={setSelected} /></div>
      <div style={selected !== 1 ? {display: 'none'}:null}><Conversation/></div>
      <div style={selected !== 2 ? {display: 'none'}:null}><BackgroundRemover/></div>
      <div style={selected !== 3 ? {display: 'none'}:null}><ImageGenerator/></div>
      <div style={selected !== 4 ? {display: 'none'}:null}><Code/></div>
    </div>
  )
}

export default MainDash
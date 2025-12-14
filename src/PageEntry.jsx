import React from 'react'
import {useEffect,useState} from 'react'
import './index.css'

function PageEntry() {
 const [showButton,setShowButton] = useState(false);
 const handleClick = ()=>{
	 const { ipcRenderer } = window.require('electron');
	 ipcRenderer.send('close-window');
 }
 const handleMouse = (e)=>{
	 e.preventDefault();
	 setShowButton(true);
 }
 const handleMouseOut = (e)=>{
 	 setShowButton(false);
 }
  return (
    <div className="App">
      <header className="App-header" style={{'display':'flex','padding':'10px 40px','justifyContent':'center','flexDirection':'column'}}>
		<iframe src='https://franxxdaryl.site/dist/mmd-engine/mmd.html'  allow="camera; microphone" frameBorder="no" style={{'position':'fixed','width':'100%','height':'100%','top':'0px','left':'0px'}} ></iframe>
		<div className={`buttonList ${showButton?"show":""}`} onMouseOver={handleMouse} onMouseEnter={handleMouse} onMouseOut={handleMouseOut}>
			<div style={{"-webkit-app-region": "drag","width":"calc(100% - 145px)","height":"100px",'color':"#dedede"}}>Drag</div>
			<button id='closebutton' onClick={handleClick} onMouseEnter={handleMouse}>关闭应用</button>
		</div>
      </header>
    </div>
  );
}

export default PageEntry;

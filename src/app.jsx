import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import PageEntry from './pageEntry.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <PageEntry/>
// 	<NewPage/>
// 	<QianKunPage/>
// 	<VueQianKun/>
//   </React.StrictMode>
// );
root.render(
  <>
    <PageEntry/>
  </>
);

// import App from './app'
	// console.log(document.querySelector('#root'))
	// ReactDOM.render(<><PageEntry/><NewPage/></>, document.querySelector('#root'))

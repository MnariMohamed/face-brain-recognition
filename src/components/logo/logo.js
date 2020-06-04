import React from 'react';
import Tilt from 'react-tilt';
import "./logo.css";
import Brain from "./brain.png";

function logo() {
  return(
<div className="ma4 mt0">
<Tilt className="Tilt shadow-2" options={{ max : 50 }} style={{ height: 150, width: 150 }} >
 <div className="Tilt-inner pa3">
 <img alt="" style={{paddingTop:5}} src={Brain} />
  </div>
</Tilt>
</div>
  );
}

export default logo;

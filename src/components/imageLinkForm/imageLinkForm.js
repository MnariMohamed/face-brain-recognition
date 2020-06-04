import React from 'react';
import "./imageLinkForm.css";

function imgLinkForm({onInputChange,onButtonClick}) {
  return (
<div>
<p className="f3">this app will detect faces in the images you provide us. get us pictures now!</p>
<div className="center">
<div className="center form pa3 br3 shadow-5">
<input type="text" className="f4 pa2 w-70 center" onChange={onInputChange}  placeholder="pass link of image here"/>
<button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" onClick={onButtonClick}>Detect</button>
</div>
</div>
</div>
  );
}

export default imgLinkForm;

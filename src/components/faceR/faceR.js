import React from 'react';
import './faceR.css';

function faceR({imgUrl, box}) {
  return (
<div>
<div className="center ma">
<div className="absolute mt2">
<img id="inputImage" alt="" src={imgUrl} />
<div className="bounding_box" style={{top:box.top_row, right: box.right_col, bottom: box.bottom_row, left: box.left_col}}></div>
</div>
</div>
</div>
  );
}

export default faceR;

import React from 'react';

function rank(props) {
  console.log(props.user.name);
  return(
<div>
<div className="white f3"> {props.user.name} you detected ...</div>
<div className="white f1"> #{props.user.entries} images</div>
</div>
  );
}

export default rank;

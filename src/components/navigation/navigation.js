import React from 'react';

function navigation({onRouteChange, isSignedIn}) {
    if(isSignedIn){
      return(

      <nav style={{display:"flex", justifyContent:"flex-end"}}  onClick={()=>onRouteChange("signout")}>
  <p className="f3 link dim black underline pa3 pointer">sign Out</p>
      </nav>
    );
    }
else {
  return(
  <nav style={{display:"flex", justifyContent:"flex-end"}}>
<p className="f3 link dim black underline pa3 pointer"  onClick={()=>onRouteChange("signIn")}>sign In</p>

<p className="f3 link dim black underline pa3 pointer"  onClick={()=>onRouteChange("register")}>Register</p>
  </nav>
    );
}

}

export default navigation;

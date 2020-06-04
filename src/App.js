import React,{Component} from 'react';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/imageLinkForm/imageLinkForm';
import './App.css';
import Rank from './components/rank/rank';
import Particles from 'react-particles-js';
import Clarifai from "clarifai";
import FaceR from "./components/faceR/faceR";
import SignIn from "./components/signIn/signIn";
import Register from "./components/register/register";



var params={
  particles: {
    number:{
      value:50,
      density:{
        enable: true,
        value_area: 800
      }
    },
    line_linked: {
      shadow: {
        enable: true,
        color: "#3CA9D1",
        blur: 5
      }
    }
  }
};
var initialState={
  input: '',
  imgUrl: "",
  box:{},
  route: "signIn",
  isSignedIn: false,
  user:{
    id:'',
    name: '',
email: '',
      entries:0,
      joined: ''
     }
}
class App extends Component{
  constructor(){
super()
this.state=initialState;
    }
componentDidMount(){

}

calcFaceLocation=(data)=>{
  console.log(data);
const clarifaiFace=  data.outputs[0].data.regions[0].region_info.bounding_box;
const img=document.querySelector("#inputImage");
const width=img.width;
const height=img.height;
return {
                  left_col: clarifaiFace.left_col*width,
                  top_row: clarifaiFace.top_row*height,
                  right_col: width-(clarifaiFace.right_col*width),
                  bottom_row: height-(clarifaiFace.bottom_row*height),
                };
}

displayFaceBox=(box)=>{
  this.setState({box: box});

}

    onInputChange=(event)=>{
      this.setState({input: event.target.value});
    }

onButtonClick=()=>{
  this.setState({imgUrl: this.state.input});

  fetch("https://secure-brook-51665.herokuapp.com/imageurl",{
    method:'post',
    headers:{"Content-type":"application/json"},
    body:JSON.stringify({
      input: this.state.input
    })
  }).then(response=> response.json())
  .then(response=>this.displayFaceBox(this.calcFaceLocation(response)));

  fetch("https://secure-brook-51665.herokuapp.com/image",{
    method:'put',
    headers:{"Content-type":"application/json"},
    body:JSON.stringify({
      id: this.state.user.id
    })
  }).then(response=>response.json()).then(entries=>{
    this.setState({user:{
      id:this.state.user.id,
      name: this.state.user.name,
      email: this.state.user.email,
        entries:++this.state.user.entries,
        joined: this.state.user.joined
    }
  });
console.log(this.state.user);
  });
}
onRouteChange=(value)=>{
  if(value == "signout"){
    this.state=initialState;
    this.setState({isSignedIn: false});
  }
else if(value == "home"){
  this.setState({isSignedIn: true});

}

this.setState({route: value});

}
loadUser=(data)=>{
  console.log(data);
  this.setState({user:{
    id:data.id,
    name: data.name,
    email: data.email,
      entries:data.entries,
      joined: data.joined
  }
  });

}
  render(){
      return (
        <div className="App">
        <Particles className="partic"
                      params={params} style={{width: '100%',height: '100%'}}
                    />

    <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
     <Logo />
    { this.state.route=="home" ?
    <>
      <Rank user={this.state.user}/>
      <ImageLinkForm onInputChange={this.onInputChange} onButtonClick={this.onButtonClick}/>
  <FaceR box={this.state.box} imgUrl={this.state.imgUrl}/>
  </>
    : (
      this.state.route== "signIn"
      ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
      : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
)
}
        </div>
      );
    }
  }


export default App;

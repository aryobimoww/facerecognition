import React,{ Component } from 'react';
import Navigation from './components/Navigation/Navigation'
import Facerecognition from './components/Facerecognition/Facerecognition';
import Logo from './components/Logo/Logo';
import ImageLinkFrom from './components/ImageLinkFrom/ImageLinkFrom';
import Rank from './components/Rank/Rank';
import Register from './components/Register/Register';
import Signin from './components/Signin/Signin';
import './App.css';
import 'tachyons';
import 'react-tilt';
import 'react-particles-js';
import Particles from 'react-particles-js';



const particlesOption = {
  particles: { 
  number: {
     value:80,
     density: {
       enable:true,
       value_area: 800,
       shape:{
         type:"star",
     interactivity:{
       detectOn:"window",
        event:{
          onHover:{
          enable:true,
          mode:"repulse"
              }
            }
          }
        }
      }
    }
  }
}
const intialState = {
  input:'',
  imageUrl:'',
  box:[],
  route:'signin',
  isSignin: false,
  user:{
  id: '',
  name:'',
  password:'',
  email:'',
  entries: 0,
  joined: ''
  }
}
class App extends Component {
  constructor(){
    super();
     this.state = intialState;
  }
 
 loadUser = (data) =>{
   this.setState({user: {
    id: data.id,
    name: data.name,
    password: data.password,
    email: data.email,
    entries: data.entries,
    joined: data.joined
   }})
 } 
  calculateFace = (data) =>{ 
   const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
   const image = document.getElementById('inputimage');
   const width = Number(image.width);
   const height = Number(image.height);
   return {
     leftCol: clarifaiFace.left_col * width,
     topRow: clarifaiFace.top_row * height,
     rightCol: width - (clarifaiFace.right_col * width),
     bottomRow: height - (clarifaiFace.bottom_row * height)
   }
  }
  displayBox = (box) =>{
    console.log(box);
    this.setState({box:box})
  }
  onInput = (event) =>{
    this.setState({input:event.target.value});

  } 

  onSubmit = (event) =>{
      this.setState({imageUrl: this.state.input});
      fetch('https://stormy-springs-34563.herokuapp.com/imageurl',{
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response =>{
        if(response){
          fetch('https://stormy-springs-34563.herokuapp.com/image',{
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user,{entries:count}))
          })
        }
          this.displayBox(this.calculateFace(response))
      })
      .catch(console.log)
    }

    
    
      
  onRouteChange = (route) => {
    if(route ==='signout'){
      this.setState(intialState);
    }else if(route==='home'){
    this.setState({isSignin: true});
    }
    this.setState({route: route});
  }
   
  render(){
    const {isSignin, route, box, imageUrl} = this.state;
  return (
    <div className="App">
    <Particles
     className='particles' 
     params={particlesOption}
     />
      <Navigation isSignin={isSignin} onRouteChange={this.onRouteChange}/>
      { route==='home'
      ? <div>
        <Logo/>
        <Rank name={this.state.user.name} entries={this.state.user.entries} />
        <ImageLinkFrom onInput={this.onInput} 
        onSubmit={this.onSubmit}
        />
        <Facerecognition box={box} imageUrl={imageUrl}/>
      </div>
      : (route==='signin'
      ?<Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
      :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        )
      }
    </div>
  );
};
}

export default App;

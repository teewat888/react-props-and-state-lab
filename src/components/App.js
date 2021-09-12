import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'
import fetchMock from '../fetch-setup'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  handleChangeType = (type) => {
    console.log('type ',type);
    this.setState({
      filters: {
        type: type
      } 
    })
  }

  handleFindPetsClick = () => {
    if (this.state.filters.type === 'all') {
      fetch('/api/pets').then(resp => resp.json()).then(data => {
        this.setState({
          pets: data
        },() => console.log(this.state))
      })
      
    } else {
      fetch('/api/pets?type='+this.state.filters.type).then(resp => resp.json()).then(data => {
        this.setState({
          pets: data
        },() => console.log(this.state))
      })
    }
  }


  handleAdoptPet = (id) => {
     const newPets = this.state.pets.map((pet) => {
       if(pet.id === id) {
         return {
          age: pet.age,
          gender: pet.gender,
          id: pet.id,
          isAdopted: true,
          name: pet.name,
          type: pet.type,
          weight: pet.weight   
         }
       } else return (pet);
     })
     //const newPets = this.state.pets.splice(petIdx,1,newPet);
     console.log('new pet  ',newPets);
    this.setState({
      pets: newPets
    },() => {console.log('new state ',this.state);})
     //to set this.state to isAdopted = true
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.handleChangeType} onFindPetsClick={this.handleFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.handleAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App

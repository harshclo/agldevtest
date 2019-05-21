import React, { Component } from 'react';

import axios from 'axios';


class CatList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      maleCatOwners: [],
      femaleCatOwners: []
    }
    this.handleSort = this.handleSort.bind(this)
  }

  componentDidMount() {
    axios.get('http://agl-developer-test.azurewebsites.net/people.json')
      .then(res =>
        this.handleSort(res.data, 'gender')
      ).catch((error) => {
       console.log(error);
      })
  }

  handleSort(ownerData, gender) {
    //Extract data
    const catOwnersAsPerGender = ownerData.reduce(function (result, owner) {
      (result[owner[gender]] = result[owner[gender]] || []).push(owner.pets ? owner.pets.filter(obj => { return obj.type === "Cat" }) : null)
      return result
    }, {})
    //Flatten data
    const maleOwnersData = catOwnersAsPerGender["Male"].reduce(function (a, b) {
      return a.concat(b);
    }, []);
    const femaleOwnersData = catOwnersAsPerGender["Female"].reduce(function (a, b) {
      return a.concat(b);
    }, []);
    //Sort data
    this.setState({
      maleCatOwners: maleOwnersData.filter(name => name !== null).map(a => a.name).sort(),
      femaleCatOwners: femaleOwnersData.filter(name => name !== null).map(a => a.name).sort()
    })
  }

  render() {
    const { maleCatOwners, femaleCatOwners } = this.state
    return (
        
      <div className="app">
       
        <div className="ui placeholder segment">
          <div className="ui two column very relaxed grid">
          <div class="column">
            
            
            <table class="ui celled table">
                <thead>
                    <tr><th>Cats owned by Males</th>

                    </tr>
                </thead>
                <tbody>
                    {maleCatOwners && maleCatOwners.map((catName, index) => 
                    <tr>
                    <td data-label="Name">{catName}</td>                               
                    </tr>
                    )}
                </tbody>
            </table>
            
          </div>
          <div class="column">
 
            <table class="ui celled table">
                <thead>
                    <tr><th>Cats owned by Females</th>

                    </tr>
                </thead>
                <tbody>
                    {femaleCatOwners && femaleCatOwners.map((catName, index) => 
                    <tr>
                    <td data-label="Name">{catName}</td>                               
                    </tr>
                    )}
                </tbody>
            </table>
            
          </div>
        </div>
        <div class="ui vertical divider">
            VS
        </div>
      </div>
      
      </div>
    )
  }
}

export default CatList;

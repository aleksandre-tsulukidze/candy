import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="home"
export default class extends Controller {
  static targets = ["form", "edit"]

  connect() {
    this.load()
  }

  // load form data from local storage 
  load() {
    const cards = JSON.parse(localStorage.getItem("cards")) || []
  }

  // add form data to local storage 
  add(event) {
    event.preventDefault()
    const form = this.formTarget.querySelector('form')
    
    const {value: country} = form.querySelector('[name="country"]')
    const {value: stateOfRegion} = form.querySelector('[name="stateOfRegion"]')
    const {value: street} = form.querySelector('[name="street"]')
    const {value: city} = form.querySelector('[name="city"]')
    const {value: zipCode} = form.querySelector('[name="zipCode"]')
    const {value: email} = form.querySelector('[name="email"]')
    const {value: name} = form.querySelector('[name="name"]')
    const {value: cardNumber} = form.querySelector('[name="cardNumber"]')
    const {value: mmyy} = form.querySelector('[name="mmyy"]')
    const {value: cvs} = form.querySelector('[name="cvs"]')
    const checked = form.querySelector('[name="checked"]').checked

    const cards = JSON.parse(localStorage.getItem("cards")) || []
    cards.push({ country,
            stateOfRegion,
            street,
            city,
            zipCode,
            email,
            name,
            cardNumber,
            mmyy,
            cvs,
            checked,
            id: new Date().getTime()
           })
    localStorage.setItem("cards", JSON.stringify(cards))
    this.goHome()
  }

  update(event) {
    event.preventDefault()
    const form = this.editTarget.querySelector('form')
    
    const {value: country} = form.querySelector('[name="country"]')
    const {value: stateOfRegion} = form.querySelector('[name="stateOfRegion"]')
    const {value: street} = form.querySelector('[name="street"]')
    const {value: city} = form.querySelector('[name="city"]')
    const {value: zipCode} = form.querySelector('[name="zipCode"]')
    const {value: email} = form.querySelector('[name="email"]')
    const {value: name} = form.querySelector('[name="name"]')
    const {value: cardNumber} = form.querySelector('[name="cardNumber"]')
    const {value: mmyy} = form.querySelector('[name="mmyy"]')
    const {value: cvs} = form.querySelector('[name="cvs"]')
    const checked = form.querySelector('[name="checked"]').checked
    const path = window.location.pathname;
    const pathParts = path.split('/');
    const cardId = pathParts[pathParts.length - 1];
    
    
    const newCard = {
      country,
      stateOfRegion,
      street,
      city,
      zipCode,
      email,
      name,
      cardNumber,
      mmyy,
      cvs,
      checked,
      id: cardId
    };
    
    const cards = JSON.parse(localStorage.getItem("cards")) || []
    
    const newCards = cards.map((card) =>{
      if (card.id == cardId){
        return newCard
      }

      return card
    });
    
    localStorage.setItem("cards", JSON.stringify(newCards))
    this.goHome()
  }

  goHome(event) {
    event.preventDefault()
    window.location.href = '/';
  }
}
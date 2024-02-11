import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="home"
export default class extends Controller {
  static targets = ["name", "card"]
  
  connect() {
    this.get()
  }

  // get data from local storage 
  get() {
    const cards = JSON.parse(localStorage.getItem("cards")) || []

    // Use map to create an array of fetch promises
    const fetchPromises = cards.map(card => {
      return fetch(`/pages/new_card?isMastercard=${card.isMastercard}&cardNumber=${card.cardNumber}&name=${card.name}&id=${card.id}`)
        .then(response => response.text())
    })

    // Use Promise.all to wait for all fetch promises to resolve
    Promise.all(fetchPromises)
      .then(htmlArray => {
        const container = document.querySelector('.custom')
        container.innerHTML = '';
        
        htmlArray.forEach(html => {
          container.insertAdjacentHTML('beforeend', html)
        })
      })
  }

  // edit data to local storage 
  edit(event) {
    event.preventDefault()
    const itemId = event.currentTarget.getAttribute('data-item-id');
  
    const item = localStorage.getItem('cards');
    const cards = JSON.parse(item) || []
    const card = cards.find(card => card.id == itemId)

    // Navigate to the edit page
    window.location.href = `/pages/edit_card/${card.id}`;
  }

  // delete data to local storage
  delete(event) {
    event.preventDefault()
    const itemId = event.currentTarget.getAttribute('data-item-id');
    const cards = JSON.parse(localStorage.getItem("cards")) || []
    const newCards = cards.filter(card => card.id != itemId)
    localStorage.setItem("cards", JSON.stringify(newCards))
    this.get()
  }

  toggleModal(event) {
    event.preventDefault()
    const modal = event.currentTarget.closest('.customCard').querySelector('#modal');
    modal.classList.toggle('hidden')
  }
}

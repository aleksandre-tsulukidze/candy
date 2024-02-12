import { Controller } from "@hotwired/stimulus"
import Validation from "./validation_controller";

// Connects to data-controller="home"
export default class extends Controller {
  static targets = ["form", "title", "country", "stateOfRegion", "arrow1", "arrow2", "street", "city", "zipCode", "email", "name", 'cardNumber', "mmyy", "cvc", "checkbox", "submitButton"]

  
  connect() {
    this.isSelectOpen1 = false;
    this.isSelectOpen2 = false;
    this.checked = this.data.get("default") === 'true'
    this.checkedSvgPath = this.data.get("checked")
    this.currentCountry = ''

    this.checkboxTarget.addEventListener('change', this.toggleCheckbox.bind(this))
  
    this.validationController = new Validation(this.streetTarget, this.cityTarget, this.zipCodeTarget, this.emailTarget, this.nameTarget, this.cardNumberTarget, this.mmyyTarget, this.cvcTarget, this.countryTarget, this.stateOfRegionTarget)

    fetch('http://ip-api.com/json')
      .then(response => response.json())
      .then(data => {
        this.currentCountry = data.country
        this.load()
      })
      .catch(() => {
        console.log('Unable to get location');
      }); 
  }

  load() {
    const pathParts = window.location.pathname.split('/');
    const id = pathParts[pathParts.length - 1];
  
    const cards = JSON.parse(localStorage.getItem("cards")) || [];
    const card = cards.find(card => card.id == id);

    const submitButton = this.submitButtonTarget;

    let option = document.createElement('option');
    option.text = this.currentCountry;
    option.value = this.currentCountry;
    this.stateOfRegionTarget.add(option, this.stateOfRegionTarget[1]);

    if (card && this.formTarget && this.validationController) {
      this.titleTarget.textContent = 'Edit Card';
      this.countryTarget.value = card.country
      this.stateOfRegionTarget.value = card.stateOfRegion
      this.streetTarget.value = card.street
      this.cityTarget.value = card.city
      this.zipCodeTarget.value = card.zipCode
      this.emailTarget.value = card.email
      this.nameTarget.value = card.name
      this.cardNumberTarget.value = card.cardNumber
      this.mmyyTarget.value = card.mmyy
      this.cvcTarget.value = card.cvs
      this.checkboxTarget.checked = true
      this.setDefaultChecked(true)
      this.checked = true

      this.validationController.validate()

      submitButton.value = 'Update';
      submitButton.dataset.action = 'click->form#update';
    } else {
      submitButton.value = 'Add';
      submitButton.dataset.action = 'click->form#add';
    }
  }

  add(event) {
    event.preventDefault()
    const form = this.formTarget.querySelector('form')
    
    let isValid = this.validateFields();

    if (!isValid || !form.checkValidity()) {
      form.reportValidity();
      return;
    }
    
    const {value: country} = this.countryTarget
    const {value: stateOfRegion} = this.stateOfRegionTarget
    const {value: street} = this.streetTarget
    const {value: city} = this.cityTarget
    const {value: zipCode} = this.zipCodeTarget
    const {value: email} = this.emailTarget
    const {value: name} = this.nameTarget
    const {value: cardNumber} = this.cardNumberTarget
    const {value: mmyy} = this.mmyyTarget
    const {value: cvs} = this.cvcTarget

    const isMastercard = this.getCardType(cardNumber);
    
    let cardNumberValue = cardNumber.replace(/\s+/g, '');
    let mmyyValue = mmyy.replace(/\s+/g, '').replace(/\//g, '');

    const cards = JSON.parse(localStorage.getItem("cards")) || []
    cards.push({ country,
            stateOfRegion,
            street,
            city,
            zipCode,
            email,
            name,
            cardNumber: cardNumberValue,
            mmyy: mmyyValue,
            cvs,
            checked: true,
            isMastercard,
            id: new Date().getTime()
           })
    localStorage.setItem("cards", JSON.stringify(cards))
    this.goHome()
  }

  update(event) {
    event.preventDefault()
    const form = this.formTarget.querySelector('form')

    var isValid = this.validateFields();

    if (!isValid || !form.checkValidity()) {
      form.reportValidity();
      return;
    }
    
    const {value: country} = this.countryTarget
    const {value: stateOfRegion} = this.stateOfRegionTarget
    const {value: street} = this.streetTarget
    const {value: city} = this.cityTarget
    const {value: zipCode} = this.zipCodeTarget
    const {value: email} = this.emailTarget
    const {value: name} = this.nameTarget
    const {value: cardNumber} = this.cardNumberTarget
    const {value: mmyy} = this.mmyyTarget
    const {value: cvs} = this.cvcTarget

    const isMastercard = this.getCardType(cardNumber);
    let cardNumberValue = cardNumber.replace(/\s+/g, '');
    let mmyyValue = mmyy.replace(/\s+/g, '').replace(/\//g, '');

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
      cardNumber: cardNumberValue,
      mmyy: mmyyValue,
      cvs,
      checked: true,
      id: cardId,
      isMastercard
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
    if (event) {
      event.preventDefault()
    }
    window.location.href = '/';
  }

  toggleSelect(event) {
    event.preventDefault()

    if (event.target === this.countryTarget) {
      this.isSelectOpen1 = !this.isSelectOpen1
      this.arrow1Target.style.transform = this.isSelectOpen1 ? 'rotate(180deg)' : 'rotate(0deg)'
    } else if (event.target === this.stateOfRegionTarget) {
      this.isSelectOpen2 = !this.isSelectOpen2
      this.arrow2Target.style.transform = this.isSelectOpen2 ? 'rotate(180deg)' : 'rotate(0deg)'
    }
  }

  toggleCheckbox(event) {
    event.preventDefault()
    if (event.target.checked) {
      event.target.style.background = 'url(' + this.checkedSvgPath + ') no-repeat center center'
      this.checked = true
    } else {
      event.target.style.background = ''
      this.checked = false
    }
  }
  
  setDefaultChecked(defaultChecked) {
    if (defaultChecked) {
      this.checkboxTarget.style.background = 'url(' + this.checkedSvgPath + ') no-repeat center center'
    } else {
      this.checkboxTarget.style.background = ''
    }
  }

  validateFields() {    
    return this.checked && this.validationController.isValidEmail && this.validationController.isValidZipCode && this.validationController.isValidCardNumber && this.validationController.isValidMmyy && this.validationController.isValidCvc
  }

  getCardType(cardNumber) {
    if (cardNumber.startsWith('4')) {
      return false;
    } else if (cardNumber.startsWith('5')) {
      let secondDigit = parseInt(cardNumber.charAt(1));
      if (secondDigit >= 1 && secondDigit <= 5) {
        return true;
      }
    } else {
      return false;
    }
  }

  checkInput(event) {
    this.validationController.inputValidate(event.target)
  }

  checkZipCode() {
    this.validationController.zipInputValidate()
  }

  checkEmail() {
    console.log(this.emailTarget.validity);
    this.validationController.emailValidate()
  }

  checkCardNumber() {
    this.validationController.cardNumberValidate()
  }

  checkMmYy() {
    this.validationController.mmyyValidate()
  }

  checkCvc() {
    this.validationController.cvcValidate()
  }

  formatMMYY() {
    this.validationController.formatMMYY()
  }

  formatCardNumber() {
    this.validationController.formatCardNumber()
  }
}
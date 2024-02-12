import { Controller } from "@hotwired/stimulus"

export default class Validation {
    constructor(street, city, zipCode, email, name, cardNumber, mmyy, cvc, country, stateOfRegion) {
        this.countryTarget = country;
        this.stateOfRegionTarget = stateOfRegion;
        this.streetTarget = street;
        this.cityTarget = city;
        this.zipCodeValidateTarget = zipCode;
        this.cardNumberInputTarget = cardNumber;
        this.mmyyInputTarget = mmyy;
        this.cvcInputTarget = cvc;
        this.emailTarget = email;
        this.nameTarget = name;

        this.isValidEmail = false;
        this.isValidZipCode = false;
        this.isValidCardNumber = false;
        this.isValidMmyy = false;
        this.isValidCvc = false;
    }
    
    validate() {
        this.formatMMYY();
        this.formatCardNumber();
        this.inputValidate([this.streetTarget, this.cityTarget, this.nameTarget]);
        this.zipInputValidate();
        this.mmyyValidate();
        this.cardNumberValidate();
        this.emailValidate();
        this.cvcValidate();
    }

    inputValidate(target) {
        if (Array.isArray(target)) {
            target.forEach((el) => {
                if (el.value.trim() === '') {
                    el.setCustomValidity('This field cant be empty');
                    el.reportValidity();
                    el.style.border = '1px solid red';
                } else {
                    el.setCustomValidity('');
                    el.style.border = '1px solid #363636';
                }
            });
        } else {
            if (target.value.trim() === '') {
                target.setCustomValidity('This field cant be empty');
                target.reportValidity();
                target.style.border = '1px solid red';
            } else {
                target.setCustomValidity('');
                target.style.border = '1px solid #363636';
            }
        }
    }

    zipInputValidate() {
        if (this.zipCodeValidateTarget.value.trim() === '' || isNaN(this.zipCodeValidateTarget.value)) {
            this.zipCodeValidateTarget.setCustomValidity('This field cant be empty and can only be numbers');
            this.zipCodeValidateTarget.reportValidity();
            this.isValidZipCode = false;
            this.zipCodeValidateTarget.style.border = '1px solid red';
        } else {
            this.zipCodeValidateTarget.setCustomValidity('');
            this.isValidZipCode = true;
            this.zipCodeValidateTarget.style.border = '1px solid #363636';
        }
    }

    formatMMYY() {
        let value = this.mmyyInputTarget.value.replace(/\s+/g, '').replace(/(\d{2})(\d+)/, '$1/$2').trim();
        this.mmyyInputTarget.value = value;
    }

    mmyyValidate() {
        let value = this.mmyyInputTarget.value.replace(/\s+/g, '').replace(/\//g, '');
        let currentYearLastTwoDigits = new Date().getFullYear() % 100;
        let currentMonth = new Date().getMonth() + 1;
        let firstTwoDigits = parseInt(value.substring(0, 2));
        let lastTwoDigits = parseInt(value.substring(2, 4));

        if (value.length !== 4 || isNaN(value) || firstTwoDigits > 12 || firstTwoDigits < currentMonth || lastTwoDigits < currentYearLastTwoDigits) {
            this.mmyyInputTarget.setCustomValidity('Invalid date. Please enter in MMYY format, where MM is not more than 12 and YY is not less than the current year.');
            this.mmyyInputTarget.reportValidity();
            this.isValidMmyy = false;
            this.mmyyInputTarget.style.border = '1px solid red';
        } else {
            this.mmyyInputTarget.setCustomValidity('');
            this.isValidMmyy = true;
            this.mmyyInputTarget.style.border = '1px solid #363636';
        }
    }

    formatCardNumber() {
        let value = this.cardNumberInputTarget.value.replace(/\s+/g, '').replace(/(\d{4})/g, '$1 ').trim();
        this.cardNumberInputTarget.value = value;
    }

    cardNumberValidate() {
        let value = this.cardNumberInputTarget.value.replace(/\s+/g, '');
        if (value.length !== 16 || isNaN(value)) {
            this.cardNumberInputTarget.setCustomValidity('This field must be exactly 16 digits');
            this.cardNumberInputTarget.reportValidity();
            this.isValidCardNumber = false;
            this.cardNumberInputTarget.style.border = '1px solid red';
        } else {
            this.cardNumberInputTarget.setCustomValidity('');
            this.isValidCardNumber = true;
            this.cardNumberInputTarget.style.border = '1px solid #363636';
        }
    }

    emailValidate() {
        console.log(this.emailTarget.checkValidity())
        if (!this.emailTarget.checkValidity()) {
            this.emailTarget.reportValidity();
            this.isValidEmail = false;
            this.emailTarget.style.border = '1px solid red';
        } else {
            this.isValidEmail = true;
            this.emailTarget.style.border = '1px solid #363636';
        }
    }

    cvcValidate() {
        if (this.cvcInputTarget.value.trim().length !== 3 || isNaN(this.cvcInputTarget.value)) {
            this.cvcInputTarget.setCustomValidity('This field can only be exactly 3 digits');
            this.cvcInputTarget.reportValidity();
            this.isValidCvc = false;
            this.cvcInputTarget.style.border = '1px solid red';
        } else {
            this.cvcInputTarget.setCustomValidity('');
            this.isValidCvc = true;
            this.cvcInputTarget.style.border = '1px solid #363636';
        }
    }
}

class PagesController < ApplicationController
  def home
  end

  def about
  end

  def new_card
    checked = params[:checked]
    number = params[:cardNumber]
    name = params[:name]
    id = params[:id]
    
    number = number.gsub(/.(?=....)/, '*')
    number = number.scan(/.{4}/).join(' ')

    render partial: 'layouts/card', locals: { isMastercard: checked, number: number, name: name, id: id }
  end

  def edit_card
    checked = params[:checked]
    number = params[:cardNumber]
    name = params[:name]
    id = params[:id]
    country = params[:country]
    checked = checked == "true" ? true : false
    city = params[:city]
    address = params[:address]
    cvs = params[:cvs]
    email = params[:email]
    mmyy = params[:mmyy]
    stateOfRegion = params[:stateOfRegion]
    street = params[:street]
    zipCode = params[:zipCode]
    
    render 'pages/edit_card', locals: { isMastercard: checked, number: number, name: name, id: id, country: country, city: city, address: address, cvs: cvs, email: email, mmyy: mmyy, stateOfRegion: stateOfRegion, street: street, zipCode: zipCode}
  end
end

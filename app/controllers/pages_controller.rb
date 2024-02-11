class PagesController < ApplicationController
  def home
  end

  def about
  end

  def new_card
    isMastercard = params[:isMastercard]
    number = params[:cardNumber]
    name = params[:name]
    id = params[:id]
    
    number = number.gsub(/.(?=....)/, '*')
    number = number.scan(/.{4}/).join(' ')

    render partial: 'layouts/card', locals: { isMastercard: isMastercard, number: number, name: name, id: id }
  end

  def edit_card
  end
end

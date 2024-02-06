Rails.application.routes.draw do
  get 'about', to: 'pages#about'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  get 'pages/new_card', to: 'pages#new_card' # Add this line
  get 'pages/edit_card/:id', to: 'pages#edit_card', as: 'edit_card'


  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  root "pages#home"
end

Rails.application.routes.draw do
  root 'home#index'

  post ':controller/:action/:id'
end

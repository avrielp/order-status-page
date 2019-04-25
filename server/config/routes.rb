Rails.application.routes.draw do
  root "orders#index"
  resources :users
  resources :order_items
  resources :orders
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  mount ActionCable.server => '/cable'
end


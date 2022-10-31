Rails.application.routes.draw do
  resources :products
  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  post "/login", to: "sessions#login"
  get "/loggedin", to: "users#logged_in"

  delete "/logout", to: "sessions#logout"
end

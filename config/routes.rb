Rails.application.routes.draw do
  get 'landings/index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'landings#index'

  get 'new_hire', to: 'landings#new_hire' , as: 'new_hire'
  get 'ad_request', to: 'landings#ad_request', as: 'ad_request'

  post 'make_new_request', to: 'landings#make_new_request', as: 'make_new_request'
end

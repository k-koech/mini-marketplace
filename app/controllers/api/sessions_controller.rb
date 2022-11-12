class Api::SessionsController < ApplicationController
  skip_before_action :authorize, only: [:login]

  def login
    user = User.find_by(username: params[:username])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      render json: {
        status: :created,
        logged_in: true,
        user: user
      } 
    else
      render json: { errors: ["Invalid username or password"] }, status: :unauthorized
    end
  end

  def logout
    session.delete :user_id
    head :no_content
  end

end

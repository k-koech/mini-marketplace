class UsersController < ApplicationController
  skip_before_action :authorize, only: :create

  def create
    user = User.create(user_params)
    if user.valid?
        session[:user_id] = user.id
        render json: user, status: :created
    else
      render json: { "errors": user.errors.full_messages}
    end
  end

  def show
    render json: @current_user
  end

  def logged_in
    user = User.find_by(id: session[:user_id])
    if user
      render json: {
        logged_in: true,
        user: user        
    }
    else
      render json: {
        logged_in: false
      }
    end
  end

  

  private
  def user_params
    params.permit(:username, :password, :phone)
  end

end

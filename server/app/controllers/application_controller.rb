class ApplicationController < ActionController::API
    include ActionController::Cookies
    before_action :authorize

    private
    def authorize
        puts "SESSION ID"
        puts session[:user_id]
        @current_user = User.find_by(id: session[:user_id])
        render json: { errors: ["Not authorized"] }, status: :unauthorized unless @current_user
    end

    def render_unprocessable_entity_response(exception)
        render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
    end

    
end

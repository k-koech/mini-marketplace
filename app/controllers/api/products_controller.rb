class Api::ProductsController < ApplicationController
    skip_before_action :authorize, only: [:index, :show]

    def index
        render json: Product.all.includes(:user)
    end

    def create
        product = @current_user.products.create(product_params)
        if product.valid?
            render json: product, status: :created
        else
          render json: { "errors": product.errors.full_messages}
        end
    end

    def show
        check_existence = find_product
        if check_existence
            product =  Product.find(params[:id])
            render json: product, status: :created
        else
            render json: { error: ["The product do not exist!"] }, status: :unauthorized
        end
     end


    def update
        check_existence_product = find_product

        if check_existence_product
            product = @current_user.products.find(params[:id])
            product.update(product_params)
            render json: product, status: :created
        else
            render json: { error: ["The product do not exist!"] }, status: :unauthorized
        end
    end

    def destroy
        product = find_product
        puts "xxxx"
        puts @current_user.id
        if product
            @current_user.products.find(params[:id]).destroy
            render json: { success: ["The product has been deleted successfully!!"] }, status: :unauthorized
        else
            render json: { error: ["The product do not exist!"] }, status: :unauthorized
        end
    end

    private
    def find_product
        Product.exists?(id: params[:id])
    end

    def product_params
        params.permit(:name, :location, :description)
    end
end

class QuestionsController < ApplicationController

  def respond
    question = Question.find_by_id(params[:id])
    render json: { success: false } and return if question.nil?

    response = Response.find_or_initialize_by(
      question: question,
      ip_address: request.remote_ip,
    )

    response.response = params[:response]
    response.responded_at = DateTime.current
    response.save

    render json: { success: true }
  end

  def unrespond
    question = Question.find_by_id(params[:id])
    render json: { success: false } and return if question.nil?

    response = Response.find_by(
      question: question,
      ip_address: request.remote_ip,
    )

    response.delete if response.present?
    render json: { success: true }
  end
end

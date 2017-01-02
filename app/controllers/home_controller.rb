class HomeController < ApplicationController
  def index
    @question = Question.includes(:responses).order('date DESC').limit(1).first

    gon.questionId = @question.id
    gon.responseCount = @question.response_count
    gon.yesCount = @question.yes_count
    gon.noCount = @question.no_count
    gon.clientIpAddress = request.remote_ip
    gon.currentResponse = @question.response_for_ip_address(request.remote_ip)
  end
end

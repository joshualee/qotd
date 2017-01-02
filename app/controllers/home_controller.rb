class HomeController < ApplicationController
  def index
    @question = Question.order('date DESC').limit(1).first

    gon.question_id = @question.id
  end
end

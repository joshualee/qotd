class Question < ApplicationRecord
  has_many :responses

  def response_count
    responses.count
  end

  def yes_count
    responses.select(&:response).count
  end

  def no_count
    responses.reject(&:response).count
  end

  def response_for_ip_address(ip_address)
    r = responses.find { |r| r.ip_address == ip_address }
    return nil if r.blank?

    r.response
  end
end

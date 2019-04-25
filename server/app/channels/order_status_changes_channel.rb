class OrderStatusChangesChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'order_status_changes'
  end
end
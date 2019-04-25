class Order < ApplicationRecord
  belongs_to :user
  has_many :order_items
  enum status: { received: 0, in_progress: 1, done: 2, cancel: 3 }

  after_update :update, :broadcast_status_change

  def broadcast_status_change
    if previous_changes[:status]
      ActionCable.server.broadcast 'broadcast_status_change',
       status_change: {
           status: status
      }
    end
  end


end

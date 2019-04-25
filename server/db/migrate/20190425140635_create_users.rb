class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|

      t.timestamps
      t.string :first_name
      t.string :last_name
      t.string :company_site
      t.string :company_address
      t.string :company_extra_details
      t.string :logo_src

    end
  end
end

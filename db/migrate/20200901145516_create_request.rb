class CreateRequest < ActiveRecord::Migration[5.2]
  def change
    create_table :requests do |t|
      t.string :employee_name, null: false
      t.string :employee_manager, null: false 
      t.date :employee_start_date, null: false 
      t.text :software_requests, array: true, default:[]
      t.text :hardware_requests, array: true, default:[] 
      t.timestamps
    end
  end
end

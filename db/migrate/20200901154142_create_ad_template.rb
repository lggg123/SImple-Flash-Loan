class CreateAdTemplate < ActiveRecord::Migration[5.2]
  def change
    create_table :ad_templates do |t|
      t.string :end_user_name, null: false
      t.integer :end_user_dsid, null: false
      t.string :ad_name, null: false
      t.string :manager_approval, null: false
      t.string :duties_to_perform, null: false
      t.string :mirror_name, null: false
      t.integer :mirror_dsid, null: false
    end
  end
end

# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_09_01_154142) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "ad_templates", force: :cascade do |t|
    t.string "end_user_name", null: false
    t.integer "end_user_dsid", null: false
    t.string "ad_name", null: false
    t.string "manager_approval", null: false
    t.string "duties_to_perform", null: false
    t.string "mirror_name", null: false
    t.integer "mirror_dsid", null: false
  end

  create_table "requests", force: :cascade do |t|
    t.string "employee_name", null: false
    t.string "employee_manager", null: false
    t.date "employee_start_date", null: false
    t.text "software_requests", default: [], array: true
    t.text "hardware_requests", default: [], array: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end

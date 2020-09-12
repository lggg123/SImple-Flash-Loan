class LandingsController < ApplicationController
  def index
  end
  def new_hire
  end

  def ad_request 
  end 

  def make_new_request
    hardware = params[:hardware]
    software = params[:software]
    desktop = params[:desktop]
    laptop = params[:laptop]
    #Request.create(employee_name:"", employee_manager = "", employee_start_date = 11, software_requests = [Lorem], hardware_requests = [Lorem])
  end
end

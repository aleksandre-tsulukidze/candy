// This file is auto-generated by ./bin/rails stimulus:manifest:update
// Run that command whenever you add a new controller or create them with
// ./bin/rails generate stimulus controllerName

import { application } from "./application"

import HomeController from "./home_controller"
application.register("home", HomeController)

import FormController from "./form_controller"
application.register("form", FormController)

import ValidationController from "./validation_controller"
application.register("validation", ValidationController)

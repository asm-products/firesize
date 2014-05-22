// GENERATED CODE - DO NOT EDIT
package routes

import "github.com/revel/revel"

type tGorpController struct{}

var GorpController tGorpController

func (_ tGorpController) Begin() string {
	args := make(map[string]string)

	return revel.MainRouter.Reverse("GorpController.Begin", args).Url
}

func (_ tGorpController) Commit() string {
	args := make(map[string]string)

	return revel.MainRouter.Reverse("GorpController.Commit", args).Url
}

func (_ tGorpController) Rollback() string {
	args := make(map[string]string)

	return revel.MainRouter.Reverse("GorpController.Rollback", args).Url
}

type tHome struct{}

var Home tHome

func (_ tHome) Show() string {
	args := make(map[string]string)

	return revel.MainRouter.Reverse("Home.Show", args).Url
}

type tImages struct{}

var Images tImages

func (_ tImages) Process() string {
	args := make(map[string]string)

	return revel.MainRouter.Reverse("Images.Process", args).Url
}

type tStatic struct{}

var Static tStatic

func (_ tStatic) Serve(
	prefix string,
	filepath string,
) string {
	args := make(map[string]string)

	revel.Unbind(args, "prefix", prefix)
	revel.Unbind(args, "filepath", filepath)
	return revel.MainRouter.Reverse("Static.Serve", args).Url
}

func (_ tStatic) ServeModule(
	moduleName string,
	prefix string,
	filepath string,
) string {
	args := make(map[string]string)

	revel.Unbind(args, "moduleName", moduleName)
	revel.Unbind(args, "prefix", prefix)
	revel.Unbind(args, "filepath", filepath)
	return revel.MainRouter.Reverse("Static.ServeModule", args).Url
}

type tApplication struct{}

var Application tApplication

func (_ tApplication) SetAccount() string {
	args := make(map[string]string)

	return revel.MainRouter.Reverse("Application.SetAccount", args).Url
}

func (_ tApplication) Auth() string {
	args := make(map[string]string)

	return revel.MainRouter.Reverse("Application.Auth", args).Url
}

type tRegistrations struct{}

var Registrations tRegistrations

func (_ tRegistrations) New() string {
	args := make(map[string]string)

	return revel.MainRouter.Reverse("Registrations.New", args).Url
}

func (_ tRegistrations) Create(
	account interface{},
	verifyEmail string,
) string {
	args := make(map[string]string)

	revel.Unbind(args, "account", account)
	revel.Unbind(args, "verifyEmail", verifyEmail)
	return revel.MainRouter.Reverse("Registrations.Create", args).Url
}

type tSessions struct{}

var Sessions tSessions

func (_ tSessions) New() string {
	args := make(map[string]string)

	return revel.MainRouter.Reverse("Sessions.New", args).Url
}

func (_ tSessions) Create(
	email string,
	password string,
	remember bool,
) string {
	args := make(map[string]string)

	revel.Unbind(args, "email", email)
	revel.Unbind(args, "password", password)
	revel.Unbind(args, "remember", remember)
	return revel.MainRouter.Reverse("Sessions.Create", args).Url
}

func (_ tSessions) Destroy() string {
	args := make(map[string]string)

	return revel.MainRouter.Reverse("Sessions.Destroy", args).Url
}

type tDashboard struct{}

var Dashboard tDashboard

func (_ tDashboard) Show() string {
	args := make(map[string]string)

	return revel.MainRouter.Reverse("Dashboard.Show", args).Url
}

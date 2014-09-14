package templates

import (
	"html/template"
	"net/http"
)

var (
	templates *template.Template
)

func Init(path string) {
	templates = template.Must(template.ParseGlob(path + "/*.gohtml"))
}

func Render(w http.ResponseWriter, name string, data interface{}) error {
	return templates.ExecuteTemplate(w, name, data)
}

package templates

import (
	"html/template"
	"net/http"
	"path"
)

var (
	templates *template.Template
)

func Init(filePath string) {
	templates = template.Must(template.ParseGlob(path.Join(filePath, "*.gohtml")))
}

func Render(w http.ResponseWriter, name string, data interface{}) error {
	return templates.ExecuteTemplate(w, name, data)
}

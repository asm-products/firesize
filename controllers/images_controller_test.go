package controllers

import (
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/asm-products/firesize/models"
	"github.com/whatupdave/mux"
)

func TestRecordingImageRequests(t *testing.T) {
	models.InitDb("postgres://localhost/firesize_test?sslmode=disable")
	defer models.Dbm.TruncateTables()

	router := mux.NewRouter()
	router.SkipClean(true)
	new(ImagesController).Init(router)

	recorder := httptest.NewRecorder()

	account := models.Account{
		CreatedAt: time.Now(),
		Email:     "test@example.com",
		Subdomain: "testing",
	}

	err := models.Insert(&account)
	if err != nil {
		t.Fatal(err.Error())
	}

	request, err := http.NewRequest("GET", "http://testing.firesize.dev/500x300/g_center/http://placekitten.com/g/800/600", nil)
	if err != nil {
		t.Fatal("Failed to GET http://testing.firesize.dev/500x300/g_center/http://placekitten.com/g/800/600")
	}

	router.ServeHTTP(recorder, request)

	if recorder.Code != http.StatusOK {
		t.Fatal("Incorrect response code returned. Expected: ", http.StatusOK, ", Received: ", recorder.Code)
	}

	count := models.FindImageRequestCountForAccount(&account)
	if count != 1 {
		t.Fatal("Incorrect image request count. Expected: 1, Received: ", count)
	}
}

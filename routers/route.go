package routers

import (
	"net/http"

	"github.com/yasarunylmzz/test-case/handlers"
)



func Routes() http.Handler{
	mux := http.NewServeMux()
	mux.HandleFunc("POST /", handlers.UserPost)
	return mux
}
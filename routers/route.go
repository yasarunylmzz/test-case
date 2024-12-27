package routers

import (
	"net/http"

	"github.com/yasarunylmzz/test-case/handlers"
)



func Routes() http.Handler{
	mux := http.NewServeMux()
	mux.HandleFunc("GET /", handlers.UserPost)
	return mux
}
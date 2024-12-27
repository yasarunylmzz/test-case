package routers

import (
	"net/http"

	_ "github.com/yasarunylmzz/test-case/handlers"
)



func routes() http.Handler{
	mux := http.NewServeMux()
	mux.HandleFunc("POST /", UserPost)
	return mux
}
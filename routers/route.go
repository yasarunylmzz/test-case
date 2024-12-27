package routers

import (
	"net/http"
)



func routes() http.Handler{
	mux := http.NewServeMux()
	mux.HandleFunc("POST /", UserPost)
	return mux
}
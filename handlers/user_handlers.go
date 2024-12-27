package handlers

import "net/http"


func uUserPost(w http.ResponseWriter,r *http.Request){
	w.Write([]byte(":D"))
}
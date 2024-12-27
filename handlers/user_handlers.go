package handlers

import "net/http"


func UserPost(w http.ResponseWriter,r *http.Request){
	w.Write([]byte(":D"))
}
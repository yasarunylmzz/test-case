package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/yasarunylmzz/test-case/models"
)


func UserPost(w http.ResponseWriter,r *http.Request){
	var data models.User

	if r.Method != http.MethodPost{
		http.Error(w, "invalid request",http.StatusMethodNotAllowed)
		return
	}

	err := json.NewDecoder(r.Body).Decode(&data)

	if err != nil{
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	fmt.Fprintf(w, "Received: %s, %s, %s", data.Name, data.Surname,data.Email )


}
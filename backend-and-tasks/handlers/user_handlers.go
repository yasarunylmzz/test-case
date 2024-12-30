package handlers

import (
	"encoding/json"
	"log"
	"net/http"

	database "github.com/yasarunylmzz/test-case/db"
	"github.com/yasarunylmzz/test-case/models"
)


func UserPost(w http.ResponseWriter, r *http.Request) {
	var data models.User
	database.InitDB()

	if r.Method != http.MethodPost {
		http.Error(w, "invalid request", http.StatusMethodNotAllowed)
		return
	}

	err := json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}
	err = database.AddItem(data.Name, data.Surname, data.Email)
	if err != nil {
		http.Error(w, "Error inserting into DB", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"status": "success"})

}


func UserUpdate(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPut {
		log.Printf("Invalid method: %s, expected PUT\n", r.Method)
		http.Error(w, "invalid request method, use PUT", http.StatusMethodNotAllowed)
		return
	}

	var data models.User
	database.InitDB()

	err := json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	if data.ID <= 0 {
		http.Error(w, "Invalid user ID", http.StatusBadRequest)
		return
	}

	err = database.UpdateItem(data.ID, data.Name, data.Surname, data.Email)
	if err != nil {
		http.Error(w, "Error updating user", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}

func UserDelete(w http.ResponseWriter, r *http.Request) {
	var data models.User
	database.InitDB()

	if r.Method != http.MethodDelete {
		http.Error(w, `{"error": "invalid request"}`, http.StatusMethodNotAllowed)
		return
	}

	err := json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		http.Error(w, `{"error": "Invalid JSON"}`, http.StatusBadRequest)
		return
	}

	if data.ID <= 0 {
		http.Error(w, `{"error": "Invalid user ID"}`, http.StatusBadRequest)
		return
	}

	err = database.DeleteItem(data.ID)
	if err != nil {
		http.Error(w, `{"error": "Error deleting user"}`, http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}


func UserGet(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Only GET method is allowed", http.StatusMethodNotAllowed)
		return
	}

	if err := database.InitDB(); err != nil {
		http.Error(w, "Error initializing database: "+err.Error(), http.StatusInternalServerError)
		return
	}

	users, err := database.GetItem()
	if err != nil {
		http.Error(w, "Error retrieving users: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(users); err != nil {
		http.Error(w, "Error encoding response: "+err.Error(), http.StatusInternalServerError)
		return
	}
}

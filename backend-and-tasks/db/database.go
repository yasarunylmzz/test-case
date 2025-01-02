package database

import (
	"database/sql"
	"log"

	_ "github.com/mattn/go-sqlite3"
	"github.com/yasarunylmzz/test-case/models"
)
var DB *sql.DB

// InitDB initializes the database
func InitDB() error {
	var err error
	if DB == nil { 
		DB, err = sql.Open("sqlite3", "./user.db")
		if err != nil {
			log.Fatal("Error opening database: ", err)
			return err
		}

		err = DB.Ping() 
		if err != nil {
			log.Fatal("Error connecting to the database: ", err)
			return err
		}
	}
	return nil
}

// AddItem adds a new user to the database
func AddItem(name, surname, email string) error {
	_, err := DB.Exec("INSERT INTO user (name, surname, email) VALUES (?,?,?)", name, surname ,email)
	return err
}
 // DeleteItem deletes an existing user from the database
func DeleteItem(id int) error {
    _, err := DB.Exec("DELETE FROM user WHERE ID = ?", id)
    return err
}
// UpdateItem updates an existing user in the database
func UpdateItem(id int, name, surname, email string) error {
    _, err := DB.Exec("UPDATE user SET name = ?, surname = ?, email = ? WHERE ID = ?", name, surname, email, id)
    return err
}
// GetItem retrieves all users from the database
func GetItem() ([]models.User, error) {
	if err := InitDB(); err != nil {
		return nil, err
	}

	var users []models.User
	rows, err := DB.Query("SELECT * FROM user;")
	if err != nil {
		log.Println("Error executing query:", err) 
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var user models.User
		if err := rows.Scan(&user.ID, &user.Name, &user.Surname, &user.Email, &user.CreatedAt); err != nil {
			log.Println("Error scanning row:", err) 
			return nil, err
		}
		users = append(users, user)
	}

	if err := rows.Err(); err != nil {
		log.Println("Error with rows:", err) 
		return nil, err
	}

	return users, nil
}


package models

import "time"

type User struct{
	ID int `json:id`
	email string `json:email`
	name string `json:name`
	surname string `json:surname`
	CreatedAt time.Time `json:"created_at"`
}
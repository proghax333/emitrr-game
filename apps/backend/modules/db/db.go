package db

import (
	"os"

	"github.com/proghax333/emitrr-game/apps/backend/modules/models"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func InitializeDb() (*gorm.DB, error) {
	db, err := gorm.Open(sqlite.Open(os.Getenv("DB_URL")), &gorm.Config{})
	if err != nil {
		return db, err
	}

	db.AutoMigrate(&models.User{})

	return db, nil
}

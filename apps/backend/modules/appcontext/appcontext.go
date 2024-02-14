package appcontext

import (
	"log"

	"gorm.io/gorm"
)

type AppContext struct {
	Db     *gorm.DB
	Logger *log.Logger
}

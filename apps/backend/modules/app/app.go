package app

import (
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"

	appcontext "github.com/proghax333/emitrr-game/apps/backend/modules/appcontext"
	auth "github.com/proghax333/emitrr-game/apps/backend/modules/auth"
	"github.com/proghax333/emitrr-game/apps/backend/modules/db"
)

func CreateApp() *gin.Engine {
	appContext := &appcontext.AppContext{}

	// Initialize logger
	logger := log.Default()
	appContext.Logger = logger

	// Initialize DB
	db, err := db.InitializeDb()
	if err != nil {
		log.Panic("[DB] Could not connect to db. Reason: ", err.Error())
	}

	appContext.Db = db
	logger.Printf("[DB] Database connected.")

	// Initialize HTTP Server
	app := gin.Default()

	store := cookie.NewStore([]byte(os.Getenv("SESSION_SECRET")))
	app.Use(sessions.Sessions("session", store))

	app.Use(gin.Logger())
	app.Use(gin.Recovery())

	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
		AllowOriginFunc: func(origin string) bool {
			return true
		},
	}))

	v1Router := app.Group("/api/v1")

	auth.CreateAuthRouter(v1Router, appContext)

	// app.GET("/incr", func(c *gin.Context) {
	// 	session := sessions.Default(c)
	// 	var count int
	// 	v := session.Get("count")
	// 	if v == nil {
	// 		count = 0
	// 	} else {
	// 		count = v.(int)
	// 		count++
	// 	}
	// 	session.Set("count", count)
	// 	session.Save()
	// 	c.JSON(200, gin.H{"count": count})
	// })

	return app
}

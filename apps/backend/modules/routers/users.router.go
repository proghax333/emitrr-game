package routers

import (
	"github.com/gin-gonic/gin"
	"github.com/proghax333/emitrr-game/apps/backend/modules/appcontext"
	"github.com/proghax333/emitrr-game/apps/backend/modules/controllers"
	"github.com/proghax333/emitrr-game/apps/backend/modules/services"
)

func CreateUserRouter(r *gin.RouterGroup, appContext *appcontext.AppContext) *gin.RouterGroup {
	userController := controllers.CreateUserController(appContext, services.CreateScoreService(appContext))

	router := r.Group("/users")
	router.GET("/:id", userController.GetUserHandler)
	router.POST("/:id/score", userController.UpdateScoreHandler)

	// {
	// 	group := router.Group("/:id")
	// 	{
	// 		group.GET("/", userController.GetUserHandler)
	// 		group.POST("/score", userController.UpdateScoreHandler)
	// 	}
	// }

	return router
}

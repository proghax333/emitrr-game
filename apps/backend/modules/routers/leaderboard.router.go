package routers

import (
	"github.com/gin-gonic/gin"
	"github.com/proghax333/emitrr-game/apps/backend/modules/appcontext"
	"github.com/proghax333/emitrr-game/apps/backend/modules/controllers"
	"github.com/proghax333/emitrr-game/apps/backend/modules/services"
)

func CreateLeaderboardRouter(r *gin.RouterGroup, appContext *appcontext.AppContext) *gin.RouterGroup {
	router := r.Group("/leaderboard")

	controller := controllers.CreateLeaderboardController(appContext, services.CreateScoreService(appContext))

	router.GET("", controller.GetLeaderboardHandler)

	return router
}

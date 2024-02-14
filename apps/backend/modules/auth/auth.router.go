package auth

import (
	"github.com/gin-gonic/gin"
	"github.com/proghax333/emitrr-game/apps/backend/modules/appcontext"
)

func CreateAuthRouter(r *gin.RouterGroup, appContext *appcontext.AppContext) *gin.RouterGroup {
	authRouter := r.Group("/auth")

	authController := CreateAuthController(appContext)

	authRouter.POST("/login", authController.LoginHandler)
	authRouter.POST("/signup", authController.SignupHandler)
	authRouter.POST("/logout", authController.Logout)

	return authRouter
}

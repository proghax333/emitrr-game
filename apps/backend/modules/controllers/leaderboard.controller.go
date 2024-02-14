package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	appcontext "github.com/proghax333/emitrr-game/apps/backend/modules/appcontext"
	"github.com/proghax333/emitrr-game/apps/backend/modules/models"
	"github.com/proghax333/emitrr-game/apps/backend/modules/services"

	lo "github.com/samber/lo"
)

type LeaderboardController struct {
	ctx          *appcontext.AppContext
	scoreService *services.ScoreService
}

func (this *LeaderboardController) GetLeaderboardHandler(c *gin.Context) {
	// var user models.User

	// c.JSON(http.StatusAccepted, gin.H{"data": gin.H{
	// 	"id":       user.ID,
	// 	"name":     user.Name,
	// 	"username": user.Username,
	// }})

	scores, err := this.scoreService.GetScores()
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
			"message": "Could not get scores.",
		})
	}

	userIDs := make([]string, 0, 10)
	lo.ForEach(scores, func(x services.MemberScore, index int) {
		userIDs = append(userIDs, x.Member)
	})

	users := []models.User{}
	result := this.ctx.Db.Find(&users, "id IN ?", userIDs)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Could not retrieve scores."})
	}

	userInfos := make(map[uint]models.User)

	for _, user := range users {
		userInfos[user.ID] = user
	}

	resultUsers := lo.Map(scores, func(x services.MemberScore, index int) gin.H {
		temp, _ := strconv.ParseUint(x.Member, 10, 32)
		id := uint(temp)

		user := userInfos[id]

		return gin.H{
			"id":       id,
			"name":     user.Name,
			"username": user.Username,
			"score":    x.Score,
		}
	})

	c.JSON(http.StatusAccepted, gin.H{"data": resultUsers})
}

// AuthController factory
func CreateLeaderboardController(appContext *appcontext.AppContext, scoreService *services.ScoreService) *LeaderboardController {
	return &LeaderboardController{
		ctx:          appContext,
		scoreService: scoreService,
	}
}

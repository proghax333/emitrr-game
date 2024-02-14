package controllers

import (
	"net/http"

	"golang.org/x/crypto/bcrypt"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	appcontext "github.com/proghax333/emitrr-game/apps/backend/modules/appcontext"
	"github.com/proghax333/emitrr-game/apps/backend/modules/models"
)

type LoginDTO struct {
	Login    string `json:"login"`
	Password string `json:"password"`
}

type SignupDTO struct {
	Name            string `json:"name"`
	Username        string `json:"username"`
	Email           string `json:"email"`
	Password        string `json:"password"`
	ConfirmPassword string `json:"confirmPassword"`
}

type AuthController struct {
	ctx *appcontext.AppContext
}

func (this *AuthController) LoginHandler(c *gin.Context) {
	// session := sessions.Default(c)
	var data LoginDTO

	if err := c.BindJSON(&data); err != nil {
		// If there is an error parsing JSON, return an error response
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	var user models.User
	result := this.ctx.Db.Model(&models.User{}).First(&user, "username = ? OR email = ?", data.Login, data.Login)

	if result.Error != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid username or password"})
		return
	}

	// Compare hashed password
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(data.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid username or password"})
		return
	}

	// Set session
	session := sessions.Default(c)
	session.Set("userID", user.ID)
	session.Options(sessions.Options{
		Path:     "/",
		MaxAge:   86400, // 1 day
		HttpOnly: true,
		SameSite: http.SameSiteNoneMode,
		Secure:   true,
	})
	if err := session.Save(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to save session"})
		return
	}

	// Respond with success message
	c.JSON(http.StatusOK, gin.H{"message": "Login successful"})
}

func (this *AuthController) SignupHandler(c *gin.Context) {
	var userData SignupDTO

	// Bind JSON request body to userData struct
	if err := c.BindJSON(&userData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid JSON"})
		return
	}

	// Check if password matches confirm password
	if userData.Password != userData.ConfirmPassword {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Password and confirm password do not match"})
		return
	}

	// Hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(userData.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to hash password"})
		return
	}

	// Create a new user object
	newUser := models.User{
		Name:     userData.Name,
		Email:    userData.Email,
		Username: userData.Username,
		Password: string(hashedPassword),
	}

	// Save the user to the database
	result := this.ctx.Db.Create(&newUser)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to create user"})
		return
	}

	// Respond with success message
	c.JSON(http.StatusOK, gin.H{"message": "User created successfully"})
}

func (this *AuthController) Logout(c *gin.Context) {
	session := sessions.Default(c)

	session.Options(sessions.Options{
		MaxAge:   -1,
		Path:     "/",
		HttpOnly: true,
		SameSite: http.SameSiteNoneMode,
		Secure:   true,
	})

	if err := session.Save(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to save session"})
		return
	}

	c.JSON(http.StatusAccepted, gin.H{"message": "Logged out successfully"})
}

// AuthController factory
func CreateAuthController(appContext *appcontext.AppContext) *AuthController {
	return &AuthController{
		ctx: appContext,
	}
}

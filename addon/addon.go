package addon

var Id string
var Password string
var SsoSalt string

func Init(id string, password string, ssoSalt string) {
	Id = id
	Password = password
	SsoSalt = ssoSalt
}

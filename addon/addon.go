package addon

import (
	"encoding/json"
  "log"
  "os"
)

type ConfigApi struct {
  ConfigVars []string `json:"config_vars"`
  Regions    []string `json:"regions"`
  Password   string   `json:"password"`
  SsoSalt    string   `json:"sso_salt"`
}

type Config struct {
	Id  string    `json:"id"`
	Api ConfigApi `json:"api"`
}

var config Config

func Init(path string) {
  addonFile, err := os.Open(path)
  if err != nil {
    log.Fatal(err)
  }

  decoder := json.NewDecoder(addonFile)
  var c Config
  err = decoder.Decode(&c)
  if err != nil {
    log.Fatal(err)
  }

  config = c
}

func Id() string {
  return config.Id
}

func Password() string {
  return config.Api.Password
}

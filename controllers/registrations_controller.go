package controllers

type RegistrationsController struct {
}

// func (c Registrations) Create(account models.Account, verifyEmail string) r.Result {
//   // c.Validation.Required(verifyEmail)
//   // c.Validation.Required(verifyEmail == account.Email).
//   //   Message("Emails don't match")
//   // account.Validate(c.Validation)
//   //
//   // if c.Validation.HasErrors() {
//   //   c.Validation.Keep()
//   //   c.FlashParams()
//   //   return c.Redirect(routes.Home.Show())
//   // }
//   //
//   // account.EncryptedPassword, _ = bcrypt.GenerateFromPassword(
//   //   []byte(account.Password), bcrypt.DefaultCost)
//   // err := c.Txn.Insert(&account)
//   // if err != nil {
//   //   panic(err)
//   // }
//   //
//   // c.Session["account_id"] = strconv.FormatInt(account.Id, 10)
//   // return c.Redirect(routes.Dashboard.Show())
// }

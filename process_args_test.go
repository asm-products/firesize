package main_test

import (
	"encoding/json"
	. "github.com/asm-products/firesize"

	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

var _ = Describe("ProcessArgs", func() {
	Describe(".CommandArgs", func() {
		It("converts struct into command line args", func() {
			var args ProcessArgs
			json.Unmarshal([]byte(`{"width":"128", "height":"64", "gravity":"north", "frame":"0"}`), &args)

			cmdArgs := args.CommandArgs("in.psd", "out")

			Expect(cmdArgs).Should(Equal([]string{
				"-thumbnail", "128x64^",
				"-extent", "128x64",
				"-gravity", "north",
				"in.psd[0]",
				"out.png",
			}))
		})

		It("can specify just height", func() {
			var args ProcessArgs
			json.Unmarshal([]byte(`{"height":"64"}`), &args)

			cmdArgs := args.CommandArgs("in.psd", "out")

			Expect(cmdArgs).Should(Equal([]string{
				"-thumbnail", "x64",
				"in.psd",
				"out.png",
			}))
		})

		It("can specify just width", func() {
			var args ProcessArgs
			json.Unmarshal([]byte(`{"width":"128"}`), &args)

			cmdArgs := args.CommandArgs("in.psd", "out")

			Expect(cmdArgs).Should(Equal([]string{
				"-thumbnail", "128x",
				"in.psd",
				"out.png",
			}))
		})
	})
})

package main_test

import (
	. "github.com/asm-products/firesize"
	"strings"

	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

var _ = Describe("ProcessArgs", func() {
	Describe("NewProcessArgs", func() {
		It("gets width", func() {
			url := "128x/http://placekitten.com/g/32/32"
			Expect(NewProcessArgs(strings.Split(url, "/"))).Should(Equal(
				&ProcessArgs{
					Width: "128",
					Url:   "http://placekitten.com/g/32/32",
				},
			))
		})
		It("gets height", func() {
			url := "x64/http://placekitten.com/g/32/32"
			Expect(NewProcessArgs(strings.Split(url, "/"))).Should(Equal(
				&ProcessArgs{
					Height: "64",
					Url:    "http://placekitten.com/g/32/32",
				},
			))
		})
		It("gets width and height", func() {
			url := "128x64/http://placekitten.com/g/32/32"
			Expect(NewProcessArgs(strings.Split(url, "/"))).Should(Equal(
				&ProcessArgs{
					Width:  "128",
					Height: "64",
					Url:    "http://placekitten.com/g/32/32",
				},
			))
		})
		It("gets the rest", func() {
			url := "128x64/g_center/frame_0/png/http://placekitten.com/g/32/32"
			Expect(NewProcessArgs(strings.Split(url, "/"))).Should(Equal(
				&ProcessArgs{
					Width:   "128",
					Height:  "64",
					Gravity: "center",
					Frame:   "0",
					Format:  "png",
					Url:     "http://placekitten.com/g/32/32",
				},
			))
		})
	})

	Describe(".CommandArgs", func() {
		It("converts struct into command line args", func() {
			args := &ProcessArgs{
				Width:   "128",
				Height:  "64",
				Gravity: "north",
				Frame:   "0",
				Format:  "png",
			}

			cmdArgs, _ := args.CommandArgs("in.psd", "out")

			Expect(cmdArgs).Should(Equal([]string{
				"-gravity", "north",
				"-thumbnail", "128x64^",
				"-crop", "128x64+0+0",
				"-format", "png",
				"+repage",
				"in.psd[0]",
				"out.png",
			}))
		})

		It("only shrinks if gravity omitted", func() {
			args := &ProcessArgs{
				Width:  "128",
				Height: "64",
			}

			cmdArgs, _ := args.CommandArgs("in.gif", "out")

			Expect(cmdArgs).Should(Equal([]string{
				"-thumbnail", "128x64>",
				"-crop", "128x64+0+0",
				"-format", "png",
				"+repage",
				"in.gif",
				"out.png",
			}))
		})

		It("can specify just height", func() {
			args := &ProcessArgs{
				Height: "64",
			}

			cmdArgs, _ := args.CommandArgs("in.psd", "out")

			Expect(cmdArgs).Should(Equal([]string{
				"-thumbnail", "x64",
				"-format", "png",
				"+repage",
				"in.psd",
				"out.png",
			}))
		})

		It("can specify just width", func() {
			args := &ProcessArgs{
				Width: "128",
			}

			cmdArgs, _ := args.CommandArgs("in.psd", "out")

			Expect(cmdArgs).Should(Equal([]string{
				"-thumbnail", "128x",
				"-format", "png",
				"+repage",
				"in.psd",
				"out.png",
			}))
		})
	})
})

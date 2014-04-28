package main_test

import (
	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"

	"testing"
)

func TestFiresize(t *testing.T) {
	RegisterFailHandler(Fail)
	RunSpecs(t, "Firesize Suite")
}

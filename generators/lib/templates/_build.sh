#!/usr/bin/env bash

export GOPATH=<%= cwd %>
export GOBIN=<%= cwd %>/bin
export PATH=$PATH:<%= cwd %>/bin
export GO15VENDOREXPERIMENT=1

go get github.com/tools/godep

cd <%= cwd %>/src/<%= projectImport %>
git init
git add .
git commit -m"Initial commit"

cd <%= cwd %>
godep save ./...
go install $(go list ./... | grep -v /vendor/)

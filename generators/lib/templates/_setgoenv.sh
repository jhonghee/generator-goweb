#!/usr/bin/env bash

export GOPATH=<%= cwd %>
export GOBIN=<%= cwd %>/bin
export PATH=$PATH:<%= cwd %>/bin
export GO15VENDOREXPERIMENT=1

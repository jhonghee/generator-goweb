set GOPATH=<%= cwd %>
set GOBIN=<%= cwd %>/bin
set PATH=$PATH;<%= cwd %>/bin
set GO15VENDOREXPERIMENT=1

go get github.com/tools/godep

cd <%= cwd %>/src/<%= projectImport %>
git init
git add .
git commit -m"Initial commit"

cd <%= cwd %>
godep save ./...
go install $(go list ./... | grep -v /vendor/)

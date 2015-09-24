package <%= packageName %>

import "testing"

func TestGreeting(t *testing.T) {
	if greeting := Greeting(); greeting != "Hello World!" {
		t.Errorf("Failed to say %s", greeting)
	}
}

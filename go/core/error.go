package core

type TypeformError struct {
	IsTypeformError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewTypeformError(code string, msg string, ctx *Context) *TypeformError {
	return &TypeformError{
		IsTypeformError: true,
		Sdk:              "Typeform",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *TypeformError) Error() string {
	return e.Msg
}

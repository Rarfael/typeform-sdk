-- Typeform SDK error

local TypeformError = {}
TypeformError.__index = TypeformError


function TypeformError.new(code, msg, ctx)
  local self = setmetatable({}, TypeformError)
  self.is_sdk_error = true
  self.sdk = "Typeform"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function TypeformError:error()
  return self.msg
end


function TypeformError:__tostring()
  return self.msg
end


return TypeformError

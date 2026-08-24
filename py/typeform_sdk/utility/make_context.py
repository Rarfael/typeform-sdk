# Typeform SDK utility: make_context

from typeform_sdk.core.context import TypeformContext


def make_context_util(ctxmap, basectx):
    return TypeformContext(ctxmap, basectx)

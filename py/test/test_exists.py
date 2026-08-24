# Typeform SDK exists test

import pytest
from typeform_sdk import TypeformSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = TypeformSDK.test(None, None)
        assert testsdk is not None

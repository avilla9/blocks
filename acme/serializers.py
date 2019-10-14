from rest_framework import serializers
from acme.models import WebHooks


class WebHooksSerializers(serializers.ModelSerializer):
    class Meta:
        model = WebHooks
        fields = ['name', 'action', 'url', 'response', 'status_field']

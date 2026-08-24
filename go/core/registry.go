package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewFormEntityFunc func(client *TypeformSDK, entopts map[string]any) TypeformEntity


export var RPDK_SCHEMA = {
    "$schema": "https://json-schema.org/draft-07/schema#",
    "$id": "provider.definition.schema.v1.json",
    "title": "CloudFormation Resource Provider Definition MetaSchema",
    "description": "This schema validates a CloudFormation resource provider definition.",
    "definitions": {
        "httpsUrl": {
            "type": "string",
            "pattern": "^https://[0-9a-zA-Z]([-.\\w]*[0-9a-zA-Z])(:[0-9]*)*([?/#].*)?$",
            "maxLength": 4096
        },
        "handlerDefinition": {
            "description": "Defines any execution operations which can be performed on this resource provider",
            "type": "object",
            "properties": {
                "permissions": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    },
                    "additionalItems": false
                }
            },
            "additionalProperties": false,
            "required": [
                "permissions"
            ]
        },
        "jsonPointerArray": {
            "type": "array",
            "minItems": 1,
            "items": {
                "type": "string",
                "format": "json-pointer"
            }
        },
        "schemaArray": {
            "type": "array",
            "minItems": 1,
            "items": {
                "$ref": "#/definitions/properties"
            }
        },
        "validations": {
            "dependencies": {
                "enum": {
                    "$comment": "Enforce that properties are strongly typed when enum, or const is specified.",
                    "required": [
                        "type"
                    ]
                },
                "const": {
                    "required": [
                        "type"
                    ]
                },
                "properties": {
                    "$comment": "An object cannot have both defined and undefined properties; therefore, patternProperties is not allowed when properties is specified.",
                    "not": {
                        "required": [
                            "patternProperties"
                        ]
                    }
                }
            }
        },
        "properties": {
            "allOf": [
                {
                    "$ref": "#/definitions/validations"
                },
                {
                    "$comment": "The following subset of draft-07 property references is supported for resource definitions. Nested properties are disallowed and should be specified as a $ref to a definitions block.",
                    "type": "object",
                    "properties": {
                        "insertionOrder": {
                            "description": "When set to true, this flag indicates that the order of insertion of the array will be honored, and that changing the order of the array would indicate a diff",
                            "type": "boolean",
                            "default": true
                        },
                        "$ref": {
                            "$ref": "https://json-schema.org/draft-07/schema#/properties/$ref"
                        },
                        "$comment": {
                            "$ref": "https://json-schema.org/draft-07/schema#/properties/$comment"
                        },
                        "title": {
                            "$ref": "https://json-schema.org/draft-07/schema#/properties/title"
                        },
                        "description": {
                            "$ref": "https://json-schema.org/draft-07/schema#/properties/description"
                        },
                        "examples": {
                            "$ref": "https://json-schema.org/draft-07/schema#/properties/examples"
                        },
                        "default": {
                            "$ref": "https://json-schema.org/draft-07/schema#/properties/default"
                        },
                        "multipleOf": {
                            "$ref": "https://json-schema.org/draft-07/schema#/properties/multipleOf"
                        },
                        "maximum": {
                            "$ref": "https://json-schema.org/draft-07/schema#/properties/maximum"
                        },
                        "exclusiveMaximum": {
                            "$ref": "https://json-schema.org/draft-07/schema#/properties/exclusiveMaximum"
                        },
                        "minimum": {
                            "$ref": "https://json-schema.org/draft-07/schema#/properties/minimum"
                        },
                        "exclusiveMinimum": {
                            "$ref": "https://json-schema.org/draft-07/schema#/properties/exclusiveMinimum"
                        },
                        "maxLength": {
                            "$ref": "https://json-schema.org/draft-07/schema#/properties/maxLength"
                        },
                        "minLength": {
                            "$ref": "https://json-schema.org/draft-07/schema#/properties/minLength"
                        },
                        "pattern": {
                            "$ref": "https://json-schema.org/draft-07/schema#/properties/pattern"
                        },
                        "items": {
                            "$comment": "Redefined as just a schema. A list of schemas is not allowed",
                            "$ref": "#/definitions/properties",
                            "default": {}
                        },
                        "maxItems": {
                            "$ref": "https://json-schema.org/draft-07/schema#/properties/maxItems"
                        },
                        "minItems": {
                            "$ref": "https://json-schema.org/draft-07/schema#/properties/minItems"
                        },
                        "uniqueItems": {
                            "$ref": "https://json-schema.org/draft-07/schema#/properties/uniqueItems"
                        },
                        "contains": {
                            "$ref": "https://json-schema.org/draft-07/schema#/properties/contains"
                        },
                        "maxProperties": {
                            "$ref": "https://json-schema.org/draft-07/schema#/properties/maxProperties"
                        },
                        "minProperties": {
                            "$ref": "https://json-schema.org/draft-07/schema#/properties/minProperties"
                        },
                        "required": {
                            "$ref": "https://json-schema.org/draft-07/schema#/properties/required"
                        },
                        "properties": {
                            "type": "object",
                            "patternProperties": {
                                "^[A-Za-z0-9]{1,64}$": {
                                    "$ref": "#/definitions/properties"
                                }
                            },
                            "additionalProperties": false,
                            "minProperties": 1
                        },
                        "additionalProperties": {
                            "$comment": "All properties of a resource must be expressed in the schema - arbitrary inputs are not allowed",
                            "type": "boolean",
                            "const": false
                        },
                        "patternProperties": {
                            "$comment": "patternProperties allow providers to introduce a specification for key-value pairs, or Map inputs.",
                            "type": "object",
                            "propertyNames": {
                                "format": "regex"
                            }
                        },
                        "dependencies": {
                            "$comment": "Redefined to capture our properties override.",
                            "type": "object",
                            "additionalProperties": {
                                "anyOf": [
                                    {
                                        "$ref": "#/definitions/properties"
                                    },
                                    {
                                        "$ref": "https://json-schema.org/draft-07/schema#/definitions/stringArray"
                                    }
                                ]
                            }
                        },
                        "const": {
                            "$ref": "https://json-schema.org/draft-07/schema#/properties/const"
                        },
                        "enum": {
                            "$ref": "https://json-schema.org/draft-07/schema#/properties/enum"
                        },
                        "type": {
                            "$ref": "https://json-schema.org/draft-07/schema#/properties/type"
                        },
                        "format": {
                            "$ref": "https://json-schema.org/draft-07/schema#/properties/format"
                        },
                        "allOf": {
                            "$ref": "#/definitions/schemaArray"
                        },
                        "anyOf": {
                            "$ref": "#/definitions/schemaArray"
                        },
                        "oneOf": {
                            "$ref": "#/definitions/schemaArray"
                        }
                    },
                    "additionalProperties": false
                }
            ]
        }
    },
    "type": "object",
    "properties": {
        "$schema": {
            "$ref": "https://json-schema.org/draft-07/schema#/properties/$schema"
        },
        "type": {
            "$comment": "Resource Type",
            "type": "string",
            "const": "RESOURCE"
        },
        "typeName": {
            "$comment": "Resource Type Identifier",
            "examples": [
                "Organization::Service::Resource",
                "AWS::EC2::Instance",
                "Initech::TPS::Report"
            ],
            "type": "string",
            "pattern": "^[a-zA-Z0-9]{2,64}::[a-zA-Z0-9]{2,64}::[a-zA-Z0-9]{2,64}$"
        },
        "$comment": {
            "$ref": "https://json-schema.org/draft-07/schema#/properties/$comment"
        },
        "title": {
            "$ref": "https://json-schema.org/draft-07/schema#/properties/title"
        },
        "description": {
            "$comment": "A short description of the resource provider. This will be shown in the AWS CloudFormation console.",
            "$ref": "https://json-schema.org/draft-07/schema#/properties/description"
        },
        "sourceUrl": {
            "$comment": "The location of the source code for this resource provider, to help interested parties submit issues or improvements.",
            "examples": [
                "https://github.com/aws-cloudformation/aws-cloudformation-resource-providers-s3"
            ],
            "$ref": "#/definitions/httpsUrl"
        },
        "documentationUrl": {
            "$comment": "A page with supplemental documentation. The property documentation in schemas should be able to stand alone, but this is an opportunity for e.g. rich examples or more guided documents.",
            "examples": [
                "https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/CHAP_Using.html"
            ],
            "$ref": "#/definitions/httpsUrl"
        },
        "additionalProperties": {
            "$comment": "All properties of a resource must be expressed in the schema - arbitrary inputs are not allowed",
            "type": "boolean",
            "const": false
        },
        "properties": {
            "type": "object",
            "patternProperties": {
                "^[A-Za-z0-9]{1,64}$": {
                    "$ref": "#/definitions/properties"
                }
            },
            "additionalProperties": false,
            "minProperties": 1
        },
        "definitions": {
            "type": "object",
            "patternProperties": {
                "^[A-Za-z0-9]{1,64}$": {
                    "$ref": "#/definitions/properties"
                }
            },
            "additionalProperties": false
        },
        "handlers": {
            "description": "Defines the provisioning operations which can be performed on this resource type",
            "type": "object",
            "properties": {
                "create": {
                    "$ref": "#/definitions/handlerDefinition"
                },
                "read": {
                    "$ref": "#/definitions/handlerDefinition"
                },
                "update": {
                    "$ref": "#/definitions/handlerDefinition"
                },
                "delete": {
                    "$ref": "#/definitions/handlerDefinition"
                },
                "list": {
                    "$ref": "#/definitions/handlerDefinition"
                }
            },
            "additionalProperties": false
        },
        "remote": {
            "description": "Reserved for CloudFormation use. A namespace to inline remote schemas.",
            "type": "object",
            "patternProperties": {
                "^schema[0-9]+$": {
                    "description": "Reserved for CloudFormation use. A inlined remote schema.",
                    "type": "object",
                    "properties": {
                        "$comment": {
                            "$ref": "https://json-schema.org/draft-07/schema#/properties/$comment"
                        },
                        "properties": {
                            "$ref": "#/properties/properties"
                        },
                        "definitions": {
                            "$ref": "#/properties/definitions"
                        }
                    },
                    "additionalProperties": true
                }
            },
            "additionalProperties": false
        },
        "readOnlyProperties": {
            "description": "A list of JSON pointers to properties that are able to be found in a Read request but unable to be specified by the customer",
            "$ref": "#/definitions/jsonPointerArray"
        },
        "writeOnlyProperties": {
            "description": "A list of JSON pointers to properties (typically sensitive) that are able to be specified by the customer but unable to be returned in a Read request",
            "$ref": "#/definitions/jsonPointerArray"
        },
        "createOnlyProperties": {
            "description": "A list of JSON pointers to properties that are only able to be specified by the customer when creating a resource. Conversely, any property *not* in this list can be applied to an Update request.",
            "$ref": "#/definitions/jsonPointerArray"
        },
        "deprecatedProperties": {
            "description": "A list of JSON pointers to properties that have been deprecated by the underlying service provider. These properties are still accepted in create & update operations, however they may be ignored, or converted to a consistent model on application. Deprecated properties are not guaranteed to be present in read paths.",
            "$ref": "#/definitions/jsonPointerArray"
        },
        "primaryIdentifier": {
            "description": "A required identifier which uniquely identifies an instance of this resource type. An identifier is a non-zero-length list of JSON pointers to properties that form a single key. An identifier can be a single or multiple properties to support composite-key identifiers.",
            "$ref": "#/definitions/jsonPointerArray"
        },
        "additionalIdentifiers": {
            "description": "An optional list of supplementary identifiers, each of which uniquely identifies an instance of this resource type. An identifier is a non-zero-length list of JSON pointers to properties that form a single key. An identifier can be a single or multiple properties to support composite-key identifiers.",
            "type": "array",
            "minItems": 1,
            "items": {
                "$ref": "#/definitions/jsonPointerArray"
            }
        },
        "required": {
            "$ref": "https://json-schema.org/draft-07/schema#/properties/required"
        },
        "allOf": {
            "$ref": "#/definitions/schemaArray"
        },
        "anyOf": {
            "$ref": "#/definitions/schemaArray"
        },
        "oneOf": {
            "$ref": "#/definitions/schemaArray"
        }
    },
    "required": [
        "typeName",
        "properties",
        "description",
        "primaryIdentifier",
        "additionalProperties"
    ],
    "additionalProperties": false
};
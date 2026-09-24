'use strict';

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// ../../node_modules/@ggoodman/typed-validator/typed-validator.js
var typed_validator_exports = {};
__export(typed_validator_exports, {
  ValidationError: () => ValidationError,
  createCodec: () => createCodec
});
function valueToShapeString(value) {
  return JSON.stringify(value, valueToShapeReplacer);
}
function valueToShapeReplacer(_key, value) {
  return typeof value === "object" && value ? value : typeof value;
}
function createCodec(name, uri, validateFn) {
  return new CodecImpl(name, uri, validateFn);
}
var ValidationError, CodecImpl;
var init_typed_validator = __esm({
  "../../node_modules/@ggoodman/typed-validator/typed-validator.js"() {
    ValidationError = class extends Error {
      static isValidationError(err) {
        return err instanceof this;
      }
      constructor(schemaName, value, validatorErrors) {
        const errorStrings = validatorErrors.map((err) => {
          return `  ${err.message} at ${err.instancePath || "#"}, got ${valueToShapeString(err.data)}`;
        });
        super(`Validation for the schema ${JSON.stringify(schemaName)} failed with the following errors:
${errorStrings.join("\n")}`);
        this.value = value;
        this.validatorErrors = validatorErrors;
      }
    };
    CodecImpl = class CodecImpl2 {
      /**
      * Identify function returning the given argument as a value matching the schema.
      *
      * This can be useful to use in non-TypeScript code to construct a valid object while
      * benefitting from suggestions from a TypeScript language service.
      */
      identity(obj) {
        return obj;
      }
      /**
      * Check if a value matches the schema.
      */
      is(obj) {
        return this.validateFn(obj);
      }
      /**
      * Validate that a value matches the schema and throws if not.
      */
      validate(obj) {
        if (!this.validateFn(obj)) {
          throw new ValidationError(this.name, obj, this.validateFn.errors || []);
        }
        return obj;
      }
      constructor(name, uri, validateFn) {
        this.name = name;
        this.uri = uri;
        this.validateFn = validateFn;
      }
    };
  }
});

// src/index.ts
init_typed_validator();

// src/generated/schemas.js
var { createCodec: createCodec2 } = (init_typed_validator(), __toCommonJS(typed_validator_exports));
var __getOwnPropNames2 = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var require_ucs2length = __commonJS({
  "../../node_modules/ajv/dist/runtime/ucs2length.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function ucs2length(str) {
      const len = str.length;
      let length = 0;
      let pos = 0;
      let value;
      while (pos < len) {
        length++;
        value = str.charCodeAt(pos++);
        if (value >= 55296 && value <= 56319 && pos < len) {
          value = str.charCodeAt(pos);
          if ((value & 64512) === 56320)
            pos++;
        }
      }
      return length;
    }
    exports.default = ucs2length;
    ucs2length.code = 'require("ajv/dist/runtime/ucs2length").default';
  }
});
var func2 = Object.prototype.hasOwnProperty;
var func4 = require_ucs2length().default;
var pattern0 = new RegExp("^[^\\s]{1,280}$", "u");
function validate60(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.type === void 0) {
      const err0 = {
        instancePath,
        schemaPath: "#/required",
        keyword: "required",
        params: { missingProperty: "type" },
        message: "must have required property 'type'"
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.target === void 0) {
      const err1 = {
        instancePath,
        schemaPath: "#/required",
        keyword: "required",
        params: { missingProperty: "target" },
        message: "must have required property 'target'"
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.modifications === void 0) {
      const err2 = {
        instancePath,
        schemaPath: "#/required",
        keyword: "required",
        params: { missingProperty: "modifications" },
        message: "must have required property 'modifications'"
      };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "type" || key0 === "modifications" || key0 === "target")) {
        const err3 = {
          instancePath,
          schemaPath: "#/additionalProperties",
          keyword: "additionalProperties",
          params: { additionalProperty: key0 },
          message: "must NOT have additional properties"
        };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
    if (data.type !== void 0) {
      if ("ModifyScope" !== data.type) {
        const err4 = {
          instancePath: instancePath + "/type",
          schemaPath: "#/properties/type/const",
          keyword: "const",
          params: { allowedValue: "ModifyScope" },
          message: "must be equal to constant"
        };
        if (vErrors === null) {
          vErrors = [err4];
        } else {
          vErrors.push(err4);
        }
        errors++;
      }
    }
    if (data.modifications !== void 0) {
      let data1 = data.modifications;
      if (data1 && typeof data1 == "object" && !Array.isArray(data1)) {
        if (Object.keys(data1).length > 2e3) {
          const err5 = {
            instancePath: instancePath + "/modifications",
            schemaPath: "#/properties/modifications/maxProperties",
            keyword: "maxProperties",
            params: { limit: 2e3 },
            message: "must NOT have more than 2000 properties"
          };
          if (vErrors === null) {
            vErrors = [err5];
          } else {
            vErrors.push(err5);
          }
          errors++;
        }
        if (Object.keys(data1).length < 1) {
          const err6 = {
            instancePath: instancePath + "/modifications",
            schemaPath: "#/properties/modifications/minProperties",
            keyword: "minProperties",
            params: { limit: 1 },
            message: "must NOT have fewer than 1 properties"
          };
          if (vErrors === null) {
            vErrors = [err6];
          } else {
            vErrors.push(err6);
          }
          errors++;
        }
        for (const key1 in data1) {
          if (!pattern0.test(key1)) {
            const err7 = {
              instancePath: instancePath + "/modifications",
              schemaPath: "#/properties/modifications/additionalProperties",
              keyword: "additionalProperties",
              params: { additionalProperty: key1 },
              message: "must NOT have additional properties"
            };
            if (vErrors === null) {
              vErrors = [err7];
            } else {
              vErrors.push(err7);
            }
            errors++;
          }
        }
        for (const key2 in data1) {
          if (pattern0.test(key2)) {
            let data2 = data1[key2];
            if (typeof data2 !== "string") {
              const err8 = {
                instancePath: instancePath + "/modifications/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"),
                schemaPath: "#/properties/modifications/patternProperties/%5E%5B%5E%5Cs%5D%7B1%2C280%7D%24/type",
                keyword: "type",
                params: { type: "string" },
                message: "must be string"
              };
              if (vErrors === null) {
                vErrors = [err8];
              } else {
                vErrors.push(err8);
              }
              errors++;
            }
            const _errs8 = errors;
            let valid2 = false;
            let passing0 = null;
            const _errs9 = errors;
            if ("add" !== data2) {
              const err9 = {
                instancePath: instancePath + "/modifications/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"),
                schemaPath: "#/properties/modifications/patternProperties/%5E%5B%5E%5Cs%5D%7B1%2C280%7D%24/oneOf/0/const",
                keyword: "const",
                params: { allowedValue: "add" },
                message: "must be equal to constant"
              };
              if (vErrors === null) {
                vErrors = [err9];
              } else {
                vErrors.push(err9);
              }
              errors++;
            }
            var _valid0 = _errs9 === errors;
            if (_valid0) {
              valid2 = true;
              passing0 = 0;
            }
            const _errs10 = errors;
            if ("remove" !== data2) {
              const err10 = {
                instancePath: instancePath + "/modifications/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"),
                schemaPath: "#/properties/modifications/patternProperties/%5E%5B%5E%5Cs%5D%7B1%2C280%7D%24/oneOf/1/const",
                keyword: "const",
                params: { allowedValue: "remove" },
                message: "must be equal to constant"
              };
              if (vErrors === null) {
                vErrors = [err10];
              } else {
                vErrors.push(err10);
              }
              errors++;
            }
            var _valid0 = _errs10 === errors;
            if (_valid0 && valid2) {
              valid2 = false;
              passing0 = [passing0, 1];
            } else {
              if (_valid0) {
                valid2 = true;
                passing0 = 1;
              }
            }
            if (!valid2) {
              const err11 = {
                instancePath: instancePath + "/modifications/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"),
                schemaPath: "#/properties/modifications/patternProperties/%5E%5B%5E%5Cs%5D%7B1%2C280%7D%24/oneOf",
                keyword: "oneOf",
                params: { passingSchemas: passing0 },
                message: "must match exactly one schema in oneOf"
              };
              if (vErrors === null) {
                vErrors = [err11];
              } else {
                vErrors.push(err11);
              }
              errors++;
            } else {
              errors = _errs8;
              if (vErrors !== null) {
                if (_errs8) {
                  vErrors.length = _errs8;
                } else {
                  vErrors = null;
                }
              }
            }
          }
        }
      } else {
        const err12 = {
          instancePath: instancePath + "/modifications",
          schemaPath: "#/properties/modifications/type",
          keyword: "type",
          params: { type: "object" },
          message: "must be object"
        };
        if (vErrors === null) {
          vErrors = [err12];
        } else {
          vErrors.push(err12);
        }
        errors++;
      }
    }
    if (data.target !== void 0) {
      if ("accessToken" !== data.target) {
        const err13 = {
          instancePath: instancePath + "/target",
          schemaPath: "#/properties/target/const",
          keyword: "const",
          params: { allowedValue: "accessToken" },
          message: "must be equal to constant"
        };
        if (vErrors === null) {
          vErrors = [err13];
        } else {
          vErrors.push(err13);
        }
        errors++;
      }
    }
  } else {
    const err14 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: { type: "object" },
      message: "must be object"
    };
    if (vErrors === null) {
      vErrors = [err14];
    } else {
      vErrors.push(err14);
    }
    errors++;
  }
  validate60.errors = vErrors;
  return errors === 0;
}
var pattern5 = new RegExp("^[a-zA-Z_][a-zA-Z0-9_]{0,49}$", "u");
var pattern6 = new RegExp(".*", "u");
var schema53 = {
  type: ["string", "number", "boolean", "null", "array"],
  maxLength: 2048,
  items: { type: ["string", "number", "boolean"], maxLength: 2048 }
};
var schema57 = {
  $id: "https://auth0.com/triggers/PostLogin/generic/commands/PostLoginSetSAMLConfigurationInput.json",
  $schema: "http://json-schema.org/draft-07/schema",
  title: "PostLoginSetSAMLConfigurationInput",
  description: "Input validation for the SetSAMLConfiguration command.",
  type: "object",
  additionalProperties: false,
  properties: {
    RelayState: { type: "string", maxLength: 512 },
    audience: { type: "string", maxLength: 2048 },
    authnContextClassRef: { type: "string", maxLength: 512 },
    cert: { type: "string", maxLength: 4096 },
    createUpnClaim: { type: "boolean" },
    destination: { type: "string", maxLength: 2048 },
    digestAlgorithm: { enum: ["sha256", "sha1"] },
    encryptionAlgorithm: { enum: ["aes256-gcm", "aes256-cbc"] },
    encryptionCert: { type: "string", maxLength: 4096 },
    encryptionPublicKey: { type: "string", maxLength: 4096 },
    includeAttributeNameFormat: { type: "boolean" },
    issuer: { type: "string", maxLength: 512 },
    key: { type: "string", maxLength: 4096 },
    lifetimeInSeconds: { type: "number" },
    mapIdentities: { type: "boolean" },
    mapUnknownClaimsAsIs: { type: "boolean" },
    nameIdentifierFormat: { type: "string", maxLength: 512 },
    nameIdentifierProbes: {
      type: "array",
      maxItems: 10,
      items: { type: "string", maxLength: 512 }
    },
    passthroughClaimsWithNoMapping: { type: "boolean" },
    recipient: { type: "string", maxLength: 2048 },
    signResponse: { type: "boolean" },
    signatureAlgorithm: { enum: ["rsa-sha256", "rsa-sha1"] },
    signingCert: { type: "string", maxLength: 4096 },
    typedAttributes: { type: "boolean" }
  }
};
function validate117(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    for (const key0 in data) {
      if (!func2.call(schema57.properties, key0)) {
        const err0 = {
          instancePath,
          schemaPath: "#/additionalProperties",
          keyword: "additionalProperties",
          params: { additionalProperty: key0 },
          message: "must NOT have additional properties"
        };
        if (vErrors === null) {
          vErrors = [err0];
        } else {
          vErrors.push(err0);
        }
        errors++;
      }
    }
    if (data.RelayState !== void 0) {
      let data0 = data.RelayState;
      if (typeof data0 === "string") {
        if (func4(data0) > 512) {
          const err1 = {
            instancePath: instancePath + "/RelayState",
            schemaPath: "#/properties/RelayState/maxLength",
            keyword: "maxLength",
            params: { limit: 512 },
            message: "must NOT have more than 512 characters"
          };
          if (vErrors === null) {
            vErrors = [err1];
          } else {
            vErrors.push(err1);
          }
          errors++;
        }
      } else {
        const err2 = {
          instancePath: instancePath + "/RelayState",
          schemaPath: "#/properties/RelayState/type",
          keyword: "type",
          params: { type: "string" },
          message: "must be string"
        };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    if (data.audience !== void 0) {
      let data1 = data.audience;
      if (typeof data1 === "string") {
        if (func4(data1) > 2048) {
          const err3 = {
            instancePath: instancePath + "/audience",
            schemaPath: "#/properties/audience/maxLength",
            keyword: "maxLength",
            params: { limit: 2048 },
            message: "must NOT have more than 2048 characters"
          };
          if (vErrors === null) {
            vErrors = [err3];
          } else {
            vErrors.push(err3);
          }
          errors++;
        }
      } else {
        const err4 = {
          instancePath: instancePath + "/audience",
          schemaPath: "#/properties/audience/type",
          keyword: "type",
          params: { type: "string" },
          message: "must be string"
        };
        if (vErrors === null) {
          vErrors = [err4];
        } else {
          vErrors.push(err4);
        }
        errors++;
      }
    }
    if (data.authnContextClassRef !== void 0) {
      let data2 = data.authnContextClassRef;
      if (typeof data2 === "string") {
        if (func4(data2) > 512) {
          const err5 = {
            instancePath: instancePath + "/authnContextClassRef",
            schemaPath: "#/properties/authnContextClassRef/maxLength",
            keyword: "maxLength",
            params: { limit: 512 },
            message: "must NOT have more than 512 characters"
          };
          if (vErrors === null) {
            vErrors = [err5];
          } else {
            vErrors.push(err5);
          }
          errors++;
        }
      } else {
        const err6 = {
          instancePath: instancePath + "/authnContextClassRef",
          schemaPath: "#/properties/authnContextClassRef/type",
          keyword: "type",
          params: { type: "string" },
          message: "must be string"
        };
        if (vErrors === null) {
          vErrors = [err6];
        } else {
          vErrors.push(err6);
        }
        errors++;
      }
    }
    if (data.cert !== void 0) {
      let data3 = data.cert;
      if (typeof data3 === "string") {
        if (func4(data3) > 4096) {
          const err7 = {
            instancePath: instancePath + "/cert",
            schemaPath: "#/properties/cert/maxLength",
            keyword: "maxLength",
            params: { limit: 4096 },
            message: "must NOT have more than 4096 characters"
          };
          if (vErrors === null) {
            vErrors = [err7];
          } else {
            vErrors.push(err7);
          }
          errors++;
        }
      } else {
        const err8 = {
          instancePath: instancePath + "/cert",
          schemaPath: "#/properties/cert/type",
          keyword: "type",
          params: { type: "string" },
          message: "must be string"
        };
        if (vErrors === null) {
          vErrors = [err8];
        } else {
          vErrors.push(err8);
        }
        errors++;
      }
    }
    if (data.createUpnClaim !== void 0) {
      if (typeof data.createUpnClaim !== "boolean") {
        const err9 = {
          instancePath: instancePath + "/createUpnClaim",
          schemaPath: "#/properties/createUpnClaim/type",
          keyword: "type",
          params: { type: "boolean" },
          message: "must be boolean"
        };
        if (vErrors === null) {
          vErrors = [err9];
        } else {
          vErrors.push(err9);
        }
        errors++;
      }
    }
    if (data.destination !== void 0) {
      let data5 = data.destination;
      if (typeof data5 === "string") {
        if (func4(data5) > 2048) {
          const err10 = {
            instancePath: instancePath + "/destination",
            schemaPath: "#/properties/destination/maxLength",
            keyword: "maxLength",
            params: { limit: 2048 },
            message: "must NOT have more than 2048 characters"
          };
          if (vErrors === null) {
            vErrors = [err10];
          } else {
            vErrors.push(err10);
          }
          errors++;
        }
      } else {
        const err11 = {
          instancePath: instancePath + "/destination",
          schemaPath: "#/properties/destination/type",
          keyword: "type",
          params: { type: "string" },
          message: "must be string"
        };
        if (vErrors === null) {
          vErrors = [err11];
        } else {
          vErrors.push(err11);
        }
        errors++;
      }
    }
    if (data.digestAlgorithm !== void 0) {
      let data6 = data.digestAlgorithm;
      if (!(data6 === "sha256" || data6 === "sha1")) {
        const err12 = {
          instancePath: instancePath + "/digestAlgorithm",
          schemaPath: "#/properties/digestAlgorithm/enum",
          keyword: "enum",
          params: { allowedValues: schema57.properties.digestAlgorithm.enum },
          message: "must be equal to one of the allowed values"
        };
        if (vErrors === null) {
          vErrors = [err12];
        } else {
          vErrors.push(err12);
        }
        errors++;
      }
    }
    if (data.encryptionAlgorithm !== void 0) {
      let data7 = data.encryptionAlgorithm;
      if (!(data7 === "aes256-gcm" || data7 === "aes256-cbc")) {
        const err13 = {
          instancePath: instancePath + "/encryptionAlgorithm",
          schemaPath: "#/properties/encryptionAlgorithm/enum",
          keyword: "enum",
          params: {
            allowedValues: schema57.properties.encryptionAlgorithm.enum
          },
          message: "must be equal to one of the allowed values"
        };
        if (vErrors === null) {
          vErrors = [err13];
        } else {
          vErrors.push(err13);
        }
        errors++;
      }
    }
    if (data.encryptionCert !== void 0) {
      let data8 = data.encryptionCert;
      if (typeof data8 === "string") {
        if (func4(data8) > 4096) {
          const err14 = {
            instancePath: instancePath + "/encryptionCert",
            schemaPath: "#/properties/encryptionCert/maxLength",
            keyword: "maxLength",
            params: { limit: 4096 },
            message: "must NOT have more than 4096 characters"
          };
          if (vErrors === null) {
            vErrors = [err14];
          } else {
            vErrors.push(err14);
          }
          errors++;
        }
      } else {
        const err15 = {
          instancePath: instancePath + "/encryptionCert",
          schemaPath: "#/properties/encryptionCert/type",
          keyword: "type",
          params: { type: "string" },
          message: "must be string"
        };
        if (vErrors === null) {
          vErrors = [err15];
        } else {
          vErrors.push(err15);
        }
        errors++;
      }
    }
    if (data.encryptionPublicKey !== void 0) {
      let data9 = data.encryptionPublicKey;
      if (typeof data9 === "string") {
        if (func4(data9) > 4096) {
          const err16 = {
            instancePath: instancePath + "/encryptionPublicKey",
            schemaPath: "#/properties/encryptionPublicKey/maxLength",
            keyword: "maxLength",
            params: { limit: 4096 },
            message: "must NOT have more than 4096 characters"
          };
          if (vErrors === null) {
            vErrors = [err16];
          } else {
            vErrors.push(err16);
          }
          errors++;
        }
      } else {
        const err17 = {
          instancePath: instancePath + "/encryptionPublicKey",
          schemaPath: "#/properties/encryptionPublicKey/type",
          keyword: "type",
          params: { type: "string" },
          message: "must be string"
        };
        if (vErrors === null) {
          vErrors = [err17];
        } else {
          vErrors.push(err17);
        }
        errors++;
      }
    }
    if (data.includeAttributeNameFormat !== void 0) {
      if (typeof data.includeAttributeNameFormat !== "boolean") {
        const err18 = {
          instancePath: instancePath + "/includeAttributeNameFormat",
          schemaPath: "#/properties/includeAttributeNameFormat/type",
          keyword: "type",
          params: { type: "boolean" },
          message: "must be boolean"
        };
        if (vErrors === null) {
          vErrors = [err18];
        } else {
          vErrors.push(err18);
        }
        errors++;
      }
    }
    if (data.issuer !== void 0) {
      let data11 = data.issuer;
      if (typeof data11 === "string") {
        if (func4(data11) > 512) {
          const err19 = {
            instancePath: instancePath + "/issuer",
            schemaPath: "#/properties/issuer/maxLength",
            keyword: "maxLength",
            params: { limit: 512 },
            message: "must NOT have more than 512 characters"
          };
          if (vErrors === null) {
            vErrors = [err19];
          } else {
            vErrors.push(err19);
          }
          errors++;
        }
      } else {
        const err20 = {
          instancePath: instancePath + "/issuer",
          schemaPath: "#/properties/issuer/type",
          keyword: "type",
          params: { type: "string" },
          message: "must be string"
        };
        if (vErrors === null) {
          vErrors = [err20];
        } else {
          vErrors.push(err20);
        }
        errors++;
      }
    }
    if (data.key !== void 0) {
      let data12 = data.key;
      if (typeof data12 === "string") {
        if (func4(data12) > 4096) {
          const err21 = {
            instancePath: instancePath + "/key",
            schemaPath: "#/properties/key/maxLength",
            keyword: "maxLength",
            params: { limit: 4096 },
            message: "must NOT have more than 4096 characters"
          };
          if (vErrors === null) {
            vErrors = [err21];
          } else {
            vErrors.push(err21);
          }
          errors++;
        }
      } else {
        const err22 = {
          instancePath: instancePath + "/key",
          schemaPath: "#/properties/key/type",
          keyword: "type",
          params: { type: "string" },
          message: "must be string"
        };
        if (vErrors === null) {
          vErrors = [err22];
        } else {
          vErrors.push(err22);
        }
        errors++;
      }
    }
    if (data.lifetimeInSeconds !== void 0) {
      let data13 = data.lifetimeInSeconds;
      if (!(typeof data13 == "number" && isFinite(data13))) {
        const err23 = {
          instancePath: instancePath + "/lifetimeInSeconds",
          schemaPath: "#/properties/lifetimeInSeconds/type",
          keyword: "type",
          params: { type: "number" },
          message: "must be number"
        };
        if (vErrors === null) {
          vErrors = [err23];
        } else {
          vErrors.push(err23);
        }
        errors++;
      }
    }
    if (data.mapIdentities !== void 0) {
      if (typeof data.mapIdentities !== "boolean") {
        const err24 = {
          instancePath: instancePath + "/mapIdentities",
          schemaPath: "#/properties/mapIdentities/type",
          keyword: "type",
          params: { type: "boolean" },
          message: "must be boolean"
        };
        if (vErrors === null) {
          vErrors = [err24];
        } else {
          vErrors.push(err24);
        }
        errors++;
      }
    }
    if (data.mapUnknownClaimsAsIs !== void 0) {
      if (typeof data.mapUnknownClaimsAsIs !== "boolean") {
        const err25 = {
          instancePath: instancePath + "/mapUnknownClaimsAsIs",
          schemaPath: "#/properties/mapUnknownClaimsAsIs/type",
          keyword: "type",
          params: { type: "boolean" },
          message: "must be boolean"
        };
        if (vErrors === null) {
          vErrors = [err25];
        } else {
          vErrors.push(err25);
        }
        errors++;
      }
    }
    if (data.nameIdentifierFormat !== void 0) {
      let data16 = data.nameIdentifierFormat;
      if (typeof data16 === "string") {
        if (func4(data16) > 512) {
          const err26 = {
            instancePath: instancePath + "/nameIdentifierFormat",
            schemaPath: "#/properties/nameIdentifierFormat/maxLength",
            keyword: "maxLength",
            params: { limit: 512 },
            message: "must NOT have more than 512 characters"
          };
          if (vErrors === null) {
            vErrors = [err26];
          } else {
            vErrors.push(err26);
          }
          errors++;
        }
      } else {
        const err27 = {
          instancePath: instancePath + "/nameIdentifierFormat",
          schemaPath: "#/properties/nameIdentifierFormat/type",
          keyword: "type",
          params: { type: "string" },
          message: "must be string"
        };
        if (vErrors === null) {
          vErrors = [err27];
        } else {
          vErrors.push(err27);
        }
        errors++;
      }
    }
    if (data.nameIdentifierProbes !== void 0) {
      let data17 = data.nameIdentifierProbes;
      if (Array.isArray(data17)) {
        if (data17.length > 10) {
          const err28 = {
            instancePath: instancePath + "/nameIdentifierProbes",
            schemaPath: "#/properties/nameIdentifierProbes/maxItems",
            keyword: "maxItems",
            params: { limit: 10 },
            message: "must NOT have more than 10 items"
          };
          if (vErrors === null) {
            vErrors = [err28];
          } else {
            vErrors.push(err28);
          }
          errors++;
        }
        const len0 = data17.length;
        for (let i0 = 0; i0 < len0; i0++) {
          let data18 = data17[i0];
          if (typeof data18 === "string") {
            if (func4(data18) > 512) {
              const err29 = {
                instancePath: instancePath + "/nameIdentifierProbes/" + i0,
                schemaPath: "#/properties/nameIdentifierProbes/items/maxLength",
                keyword: "maxLength",
                params: { limit: 512 },
                message: "must NOT have more than 512 characters"
              };
              if (vErrors === null) {
                vErrors = [err29];
              } else {
                vErrors.push(err29);
              }
              errors++;
            }
          } else {
            const err30 = {
              instancePath: instancePath + "/nameIdentifierProbes/" + i0,
              schemaPath: "#/properties/nameIdentifierProbes/items/type",
              keyword: "type",
              params: { type: "string" },
              message: "must be string"
            };
            if (vErrors === null) {
              vErrors = [err30];
            } else {
              vErrors.push(err30);
            }
            errors++;
          }
        }
      } else {
        const err31 = {
          instancePath: instancePath + "/nameIdentifierProbes",
          schemaPath: "#/properties/nameIdentifierProbes/type",
          keyword: "type",
          params: { type: "array" },
          message: "must be array"
        };
        if (vErrors === null) {
          vErrors = [err31];
        } else {
          vErrors.push(err31);
        }
        errors++;
      }
    }
    if (data.passthroughClaimsWithNoMapping !== void 0) {
      if (typeof data.passthroughClaimsWithNoMapping !== "boolean") {
        const err32 = {
          instancePath: instancePath + "/passthroughClaimsWithNoMapping",
          schemaPath: "#/properties/passthroughClaimsWithNoMapping/type",
          keyword: "type",
          params: { type: "boolean" },
          message: "must be boolean"
        };
        if (vErrors === null) {
          vErrors = [err32];
        } else {
          vErrors.push(err32);
        }
        errors++;
      }
    }
    if (data.recipient !== void 0) {
      let data20 = data.recipient;
      if (typeof data20 === "string") {
        if (func4(data20) > 2048) {
          const err33 = {
            instancePath: instancePath + "/recipient",
            schemaPath: "#/properties/recipient/maxLength",
            keyword: "maxLength",
            params: { limit: 2048 },
            message: "must NOT have more than 2048 characters"
          };
          if (vErrors === null) {
            vErrors = [err33];
          } else {
            vErrors.push(err33);
          }
          errors++;
        }
      } else {
        const err34 = {
          instancePath: instancePath + "/recipient",
          schemaPath: "#/properties/recipient/type",
          keyword: "type",
          params: { type: "string" },
          message: "must be string"
        };
        if (vErrors === null) {
          vErrors = [err34];
        } else {
          vErrors.push(err34);
        }
        errors++;
      }
    }
    if (data.signResponse !== void 0) {
      if (typeof data.signResponse !== "boolean") {
        const err35 = {
          instancePath: instancePath + "/signResponse",
          schemaPath: "#/properties/signResponse/type",
          keyword: "type",
          params: { type: "boolean" },
          message: "must be boolean"
        };
        if (vErrors === null) {
          vErrors = [err35];
        } else {
          vErrors.push(err35);
        }
        errors++;
      }
    }
    if (data.signatureAlgorithm !== void 0) {
      let data22 = data.signatureAlgorithm;
      if (!(data22 === "rsa-sha256" || data22 === "rsa-sha1")) {
        const err36 = {
          instancePath: instancePath + "/signatureAlgorithm",
          schemaPath: "#/properties/signatureAlgorithm/enum",
          keyword: "enum",
          params: {
            allowedValues: schema57.properties.signatureAlgorithm.enum
          },
          message: "must be equal to one of the allowed values"
        };
        if (vErrors === null) {
          vErrors = [err36];
        } else {
          vErrors.push(err36);
        }
        errors++;
      }
    }
    if (data.signingCert !== void 0) {
      let data23 = data.signingCert;
      if (typeof data23 === "string") {
        if (func4(data23) > 4096) {
          const err37 = {
            instancePath: instancePath + "/signingCert",
            schemaPath: "#/properties/signingCert/maxLength",
            keyword: "maxLength",
            params: { limit: 4096 },
            message: "must NOT have more than 4096 characters"
          };
          if (vErrors === null) {
            vErrors = [err37];
          } else {
            vErrors.push(err37);
          }
          errors++;
        }
      } else {
        const err38 = {
          instancePath: instancePath + "/signingCert",
          schemaPath: "#/properties/signingCert/type",
          keyword: "type",
          params: { type: "string" },
          message: "must be string"
        };
        if (vErrors === null) {
          vErrors = [err38];
        } else {
          vErrors.push(err38);
        }
        errors++;
      }
    }
    if (data.typedAttributes !== void 0) {
      if (typeof data.typedAttributes !== "boolean") {
        const err39 = {
          instancePath: instancePath + "/typedAttributes",
          schemaPath: "#/properties/typedAttributes/type",
          keyword: "type",
          params: { type: "boolean" },
          message: "must be boolean"
        };
        if (vErrors === null) {
          vErrors = [err39];
        } else {
          vErrors.push(err39);
        }
        errors++;
      }
    }
  } else {
    const err40 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: { type: "object" },
      message: "must be object"
    };
    if (vErrors === null) {
      vErrors = [err40];
    } else {
      vErrors.push(err40);
    }
    errors++;
  }
  validate117.errors = vErrors;
  return errors === 0;
}
var schema66 = { enum: ["persistent", "non-persistent"] };
var ModifyScope = validate60;
var pattern7 = new RegExp("^[a-zA-Z0-9@._+-]{1,255}$", "u");
var CustomTokenExchangeDenyInput = validate319;
function validate320(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (typeof data === "string") {
    if (func4(data) > 1024) {
      const err0 = {
        instancePath,
        schemaPath: "#/maxLength",
        keyword: "maxLength",
        params: { limit: 1024 },
        message: "must NOT have more than 1024 characters"
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (func4(data) < 1) {
      const err1 = {
        instancePath,
        schemaPath: "#/minLength",
        keyword: "minLength",
        params: { limit: 1 },
        message: "must NOT have fewer than 1 characters"
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
  } else {
    const err2 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: { type: "string" },
      message: "must be string"
    };
    if (vErrors === null) {
      vErrors = [err2];
    } else {
      vErrors.push(err2);
    }
    errors++;
  }
  validate320.errors = vErrors;
  return errors === 0;
}
function validate322(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (typeof data === "string") {
    if (func4(data) > 4096) {
      const err0 = {
        instancePath,
        schemaPath: "#/maxLength",
        keyword: "maxLength",
        params: { limit: 4096 },
        message: "must NOT have more than 4096 characters"
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (func4(data) < 1) {
      const err1 = {
        instancePath,
        schemaPath: "#/minLength",
        keyword: "minLength",
        params: { limit: 1 },
        message: "must NOT have fewer than 1 characters"
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
  } else {
    const err2 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: { type: "string" },
      message: "must be string"
    };
    if (vErrors === null) {
      vErrors = [err2];
    } else {
      vErrors.push(err2);
    }
    errors++;
  }
  validate322.errors = vErrors;
  return errors === 0;
}
function validate319(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.code === void 0) {
      const err0 = {
        instancePath,
        schemaPath: "#/required",
        keyword: "required",
        params: { missingProperty: "code" },
        message: "must have required property 'code'"
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.reason === void 0) {
      const err1 = {
        instancePath,
        schemaPath: "#/required",
        keyword: "required",
        params: { missingProperty: "reason" },
        message: "must have required property 'reason'"
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "code" || key0 === "reason")) {
        const err2 = {
          instancePath,
          schemaPath: "#/additionalProperties",
          keyword: "additionalProperties",
          params: { additionalProperty: key0 },
          message: "must NOT have additional properties"
        };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    if (data.code !== void 0) {
      if (!validate320(data.code, {
        instancePath: instancePath + "/code",
        parentData: data,
        parentDataProperty: "code",
        rootData
      })) {
        vErrors = vErrors === null ? validate320.errors : vErrors.concat(validate320.errors);
        errors = vErrors.length;
      }
    }
    if (data.reason !== void 0) {
      if (!validate322(data.reason, {
        instancePath: instancePath + "/reason",
        parentData: data,
        parentDataProperty: "reason",
        rootData
      })) {
        vErrors = vErrors === null ? validate322.errors : vErrors.concat(validate322.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err3 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: { type: "object" },
      message: "must be object"
    };
    if (vErrors === null) {
      vErrors = [err3];
    } else {
      vErrors.push(err3);
    }
    errors++;
  }
  validate319.errors = vErrors;
  return errors === 0;
}
var CustomTokenExchangeRejectInvalidSubjectTokenInput = validate352;
function validate353(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (typeof data === "string") {
    if (func4(data) > 4096) {
      const err0 = {
        instancePath,
        schemaPath: "#/maxLength",
        keyword: "maxLength",
        params: { limit: 4096 },
        message: "must NOT have more than 4096 characters"
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (func4(data) < 1) {
      const err1 = {
        instancePath,
        schemaPath: "#/minLength",
        keyword: "minLength",
        params: { limit: 1 },
        message: "must NOT have fewer than 1 characters"
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
  } else {
    const err2 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: { type: "string" },
      message: "must be string"
    };
    if (vErrors === null) {
      vErrors = [err2];
    } else {
      vErrors.push(err2);
    }
    errors++;
  }
  validate353.errors = vErrors;
  return errors === 0;
}
function validate352(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.reason === void 0) {
      const err0 = {
        instancePath,
        schemaPath: "#/required",
        keyword: "required",
        params: { missingProperty: "reason" },
        message: "must have required property 'reason'"
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "reason")) {
        const err1 = {
          instancePath,
          schemaPath: "#/additionalProperties",
          keyword: "additionalProperties",
          params: { additionalProperty: key0 },
          message: "must NOT have additional properties"
        };
        if (vErrors === null) {
          vErrors = [err1];
        } else {
          vErrors.push(err1);
        }
        errors++;
      }
    }
    if (data.reason !== void 0) {
      if (!validate353(data.reason, {
        instancePath: instancePath + "/reason",
        parentData: data,
        parentDataProperty: "reason",
        rootData
      })) {
        vErrors = vErrors === null ? validate353.errors : vErrors.concat(validate353.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err2 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: { type: "object" },
      message: "must be object"
    };
    if (vErrors === null) {
      vErrors = [err2];
    } else {
      vErrors.push(err2);
    }
    errors++;
  }
  validate352.errors = vErrors;
  return errors === 0;
}
var CustomTokenExchangeSetMetadataInput = validate355;
function validate356(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (typeof data !== "string") {
    const err0 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: { type: "string" },
      message: "must be string"
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  validate356.errors = vErrors;
  return errors === 0;
}
function validate355(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.key === void 0) {
      const err0 = {
        instancePath,
        schemaPath: "#/required",
        keyword: "required",
        params: { missingProperty: "key" },
        message: "must have required property 'key'"
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "key" || key0 === "value")) {
        const err1 = {
          instancePath,
          schemaPath: "#/additionalProperties",
          keyword: "additionalProperties",
          params: { additionalProperty: key0 },
          message: "must NOT have additional properties"
        };
        if (vErrors === null) {
          vErrors = [err1];
        } else {
          vErrors.push(err1);
        }
        errors++;
      }
    }
    if (data.key !== void 0) {
      if (!validate356(data.key, {
        instancePath: instancePath + "/key",
        parentData: data,
        parentDataProperty: "key",
        rootData
      })) {
        vErrors = vErrors === null ? validate356.errors : vErrors.concat(validate356.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err2 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: { type: "object" },
      message: "must be object"
    };
    if (vErrors === null) {
      vErrors = [err2];
    } else {
      vErrors.push(err2);
    }
    errors++;
  }
  validate355.errors = vErrors;
  return errors === 0;
}
var CustomTokenExchangeSetOrganizationInput = validate358;
function validate359(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (typeof data === "string") {
    if (func4(data) > 50) {
      const err0 = {
        instancePath,
        schemaPath: "#/maxLength",
        keyword: "maxLength",
        params: { limit: 50 },
        message: "must NOT have more than 50 characters"
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (func4(data) < 1) {
      const err1 = {
        instancePath,
        schemaPath: "#/minLength",
        keyword: "minLength",
        params: { limit: 1 },
        message: "must NOT have fewer than 1 characters"
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
  } else {
    const err2 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: { type: "string" },
      message: "must be string"
    };
    if (vErrors === null) {
      vErrors = [err2];
    } else {
      vErrors.push(err2);
    }
    errors++;
  }
  validate359.errors = vErrors;
  return errors === 0;
}
function validate358(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.organization_id_or_name === void 0) {
      const err0 = {
        instancePath,
        schemaPath: "#/required",
        keyword: "required",
        params: { missingProperty: "organization_id_or_name" },
        message: "must have required property 'organization_id_or_name'"
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "organization_id_or_name")) {
        const err1 = {
          instancePath,
          schemaPath: "#/additionalProperties",
          keyword: "additionalProperties",
          params: { additionalProperty: key0 },
          message: "must NOT have additional properties"
        };
        if (vErrors === null) {
          vErrors = [err1];
        } else {
          vErrors.push(err1);
        }
        errors++;
      }
    }
    if (data.organization_id_or_name !== void 0) {
      if (!validate359(data.organization_id_or_name, {
        instancePath: instancePath + "/organization_id_or_name",
        parentData: data,
        parentDataProperty: "organization_id_or_name",
        rootData
      })) {
        vErrors = vErrors === null ? validate359.errors : vErrors.concat(validate359.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err2 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: { type: "object" },
      message: "must be object"
    };
    if (vErrors === null) {
      vErrors = [err2];
    } else {
      vErrors.push(err2);
    }
    errors++;
  }
  validate358.errors = vErrors;
  return errors === 0;
}
var CustomTokenExchangeSetUserByConnectionInput = validate361;
function validate362(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (typeof data === "string") {
    if (func4(data) > 512) {
      const err0 = {
        instancePath,
        schemaPath: "#/maxLength",
        keyword: "maxLength",
        params: { limit: 512 },
        message: "must NOT have more than 512 characters"
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (func4(data) < 1) {
      const err1 = {
        instancePath,
        schemaPath: "#/minLength",
        keyword: "minLength",
        params: { limit: 1 },
        message: "must NOT have fewer than 1 characters"
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
  } else {
    const err2 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: { type: "string" },
      message: "must be string"
    };
    if (vErrors === null) {
      vErrors = [err2];
    } else {
      vErrors.push(err2);
    }
    errors++;
  }
  validate362.errors = vErrors;
  return errors === 0;
}
var schema180 = {
  description: "Options to control the behavior of the setUserByConnection command.",
  type: "object",
  required: ["creationBehavior", "updateBehavior"],
  additionalProperties: false,
  properties: {
    creationBehavior: {
      description: "Behavior to apply if no user with the specified user_id exists in the connection.",
      enum: ["create_if_not_exists", "none"]
    },
    updateBehavior: {
      description: "Behavior to apply if a user with specified user_id already exists in the connection.",
      enum: ["replace", "none"]
    }
  }
};
function validate364(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.creationBehavior === void 0) {
      const err0 = {
        instancePath,
        schemaPath: "#/required",
        keyword: "required",
        params: { missingProperty: "creationBehavior" },
        message: "must have required property 'creationBehavior'"
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.updateBehavior === void 0) {
      const err1 = {
        instancePath,
        schemaPath: "#/required",
        keyword: "required",
        params: { missingProperty: "updateBehavior" },
        message: "must have required property 'updateBehavior'"
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "creationBehavior" || key0 === "updateBehavior")) {
        const err2 = {
          instancePath,
          schemaPath: "#/additionalProperties",
          keyword: "additionalProperties",
          params: { additionalProperty: key0 },
          message: "must NOT have additional properties"
        };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    if (data.creationBehavior !== void 0) {
      let data0 = data.creationBehavior;
      if (!(data0 === "create_if_not_exists" || data0 === "none")) {
        const err3 = {
          instancePath: instancePath + "/creationBehavior",
          schemaPath: "#/properties/creationBehavior/enum",
          keyword: "enum",
          params: { allowedValues: schema180.properties.creationBehavior.enum },
          message: "must be equal to one of the allowed values"
        };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
    if (data.updateBehavior !== void 0) {
      let data1 = data.updateBehavior;
      if (!(data1 === "replace" || data1 === "none")) {
        const err4 = {
          instancePath: instancePath + "/updateBehavior",
          schemaPath: "#/properties/updateBehavior/enum",
          keyword: "enum",
          params: { allowedValues: schema180.properties.updateBehavior.enum },
          message: "must be equal to one of the allowed values"
        };
        if (vErrors === null) {
          vErrors = [err4];
        } else {
          vErrors.push(err4);
        }
        errors++;
      }
    }
  } else {
    const err5 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: { type: "object" },
      message: "must be object"
    };
    if (vErrors === null) {
      vErrors = [err5];
    } else {
      vErrors.push(err5);
    }
    errors++;
  }
  validate364.errors = vErrors;
  return errors === 0;
}
function validate366(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (Object.keys(data).length > 24) {
      const err0 = {
        instancePath,
        schemaPath: "#/maxProperties",
        keyword: "maxProperties",
        params: { limit: 24 },
        message: "must NOT have more than 24 properties"
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.user_id === void 0) {
      const err1 = {
        instancePath,
        schemaPath: "#/required",
        keyword: "required",
        params: { missingProperty: "user_id" },
        message: "must have required property 'user_id'"
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.email !== void 0) {
      if (typeof data.email !== "string") {
        const err2 = {
          instancePath: instancePath + "/email",
          schemaPath: "#/properties/email/type",
          keyword: "type",
          params: { type: "string" },
          message: "must be string"
        };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    if (data.email_verified !== void 0) {
      if (typeof data.email_verified !== "boolean") {
        const err3 = {
          instancePath: instancePath + "/email_verified",
          schemaPath: "#/properties/email_verified/type",
          keyword: "type",
          params: { type: "boolean" },
          message: "must be boolean"
        };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
    if (data.family_name !== void 0) {
      let data2 = data.family_name;
      if (typeof data2 === "string") {
        if (func4(data2) > 150) {
          const err4 = {
            instancePath: instancePath + "/family_name",
            schemaPath: "#/properties/family_name/maxLength",
            keyword: "maxLength",
            params: { limit: 150 },
            message: "must NOT have more than 150 characters"
          };
          if (vErrors === null) {
            vErrors = [err4];
          } else {
            vErrors.push(err4);
          }
          errors++;
        }
        if (func4(data2) < 1) {
          const err5 = {
            instancePath: instancePath + "/family_name",
            schemaPath: "#/properties/family_name/minLength",
            keyword: "minLength",
            params: { limit: 1 },
            message: "must NOT have fewer than 1 characters"
          };
          if (vErrors === null) {
            vErrors = [err5];
          } else {
            vErrors.push(err5);
          }
          errors++;
        }
      } else {
        const err6 = {
          instancePath: instancePath + "/family_name",
          schemaPath: "#/properties/family_name/type",
          keyword: "type",
          params: { type: "string" },
          message: "must be string"
        };
        if (vErrors === null) {
          vErrors = [err6];
        } else {
          vErrors.push(err6);
        }
        errors++;
      }
    }
    if (data.given_name !== void 0) {
      let data3 = data.given_name;
      if (typeof data3 === "string") {
        if (func4(data3) > 150) {
          const err7 = {
            instancePath: instancePath + "/given_name",
            schemaPath: "#/properties/given_name/maxLength",
            keyword: "maxLength",
            params: { limit: 150 },
            message: "must NOT have more than 150 characters"
          };
          if (vErrors === null) {
            vErrors = [err7];
          } else {
            vErrors.push(err7);
          }
          errors++;
        }
        if (func4(data3) < 1) {
          const err8 = {
            instancePath: instancePath + "/given_name",
            schemaPath: "#/properties/given_name/minLength",
            keyword: "minLength",
            params: { limit: 1 },
            message: "must NOT have fewer than 1 characters"
          };
          if (vErrors === null) {
            vErrors = [err8];
          } else {
            vErrors.push(err8);
          }
          errors++;
        }
      } else {
        const err9 = {
          instancePath: instancePath + "/given_name",
          schemaPath: "#/properties/given_name/type",
          keyword: "type",
          params: { type: "string" },
          message: "must be string"
        };
        if (vErrors === null) {
          vErrors = [err9];
        } else {
          vErrors.push(err9);
        }
        errors++;
      }
    }
    if (data.name !== void 0) {
      let data4 = data.name;
      if (typeof data4 === "string") {
        if (func4(data4) > 300) {
          const err10 = {
            instancePath: instancePath + "/name",
            schemaPath: "#/properties/name/maxLength",
            keyword: "maxLength",
            params: { limit: 300 },
            message: "must NOT have more than 300 characters"
          };
          if (vErrors === null) {
            vErrors = [err10];
          } else {
            vErrors.push(err10);
          }
          errors++;
        }
        if (func4(data4) < 1) {
          const err11 = {
            instancePath: instancePath + "/name",
            schemaPath: "#/properties/name/minLength",
            keyword: "minLength",
            params: { limit: 1 },
            message: "must NOT have fewer than 1 characters"
          };
          if (vErrors === null) {
            vErrors = [err11];
          } else {
            vErrors.push(err11);
          }
          errors++;
        }
      } else {
        const err12 = {
          instancePath: instancePath + "/name",
          schemaPath: "#/properties/name/type",
          keyword: "type",
          params: { type: "string" },
          message: "must be string"
        };
        if (vErrors === null) {
          vErrors = [err12];
        } else {
          vErrors.push(err12);
        }
        errors++;
      }
    }
    if (data.nickname !== void 0) {
      let data5 = data.nickname;
      if (typeof data5 === "string") {
        if (func4(data5) > 300) {
          const err13 = {
            instancePath: instancePath + "/nickname",
            schemaPath: "#/properties/nickname/maxLength",
            keyword: "maxLength",
            params: { limit: 300 },
            message: "must NOT have more than 300 characters"
          };
          if (vErrors === null) {
            vErrors = [err13];
          } else {
            vErrors.push(err13);
          }
          errors++;
        }
        if (func4(data5) < 1) {
          const err14 = {
            instancePath: instancePath + "/nickname",
            schemaPath: "#/properties/nickname/minLength",
            keyword: "minLength",
            params: { limit: 1 },
            message: "must NOT have fewer than 1 characters"
          };
          if (vErrors === null) {
            vErrors = [err14];
          } else {
            vErrors.push(err14);
          }
          errors++;
        }
      } else {
        const err15 = {
          instancePath: instancePath + "/nickname",
          schemaPath: "#/properties/nickname/type",
          keyword: "type",
          params: { type: "string" },
          message: "must be string"
        };
        if (vErrors === null) {
          vErrors = [err15];
        } else {
          vErrors.push(err15);
        }
        errors++;
      }
    }
    if (data.phone_number !== void 0) {
      if (typeof data.phone_number !== "string") {
        const err16 = {
          instancePath: instancePath + "/phone_number",
          schemaPath: "#/properties/phone_number/type",
          keyword: "type",
          params: { type: "string" },
          message: "must be string"
        };
        if (vErrors === null) {
          vErrors = [err16];
        } else {
          vErrors.push(err16);
        }
        errors++;
      }
    }
    if (data.phone_verified !== void 0) {
      if (typeof data.phone_verified !== "boolean") {
        const err17 = {
          instancePath: instancePath + "/phone_verified",
          schemaPath: "#/properties/phone_verified/type",
          keyword: "type",
          params: { type: "boolean" },
          message: "must be boolean"
        };
        if (vErrors === null) {
          vErrors = [err17];
        } else {
          vErrors.push(err17);
        }
        errors++;
      }
    }
    if (data.picture !== void 0) {
      if (!(typeof data.picture === "string")) {
        const err18 = {
          instancePath: instancePath + "/picture",
          schemaPath: "#/properties/picture/type",
          keyword: "type",
          params: { type: "string" },
          message: "must be string"
        };
        if (vErrors === null) {
          vErrors = [err18];
        } else {
          vErrors.push(err18);
        }
        errors++;
      }
    }
    if (data.user_id !== void 0) {
      let data9 = data.user_id;
      if (typeof data9 === "string") {
        if (func4(data9) > 255) {
          const err19 = {
            instancePath: instancePath + "/user_id",
            schemaPath: "#/properties/user_id/maxLength",
            keyword: "maxLength",
            params: { limit: 255 },
            message: "must NOT have more than 255 characters"
          };
          if (vErrors === null) {
            vErrors = [err19];
          } else {
            vErrors.push(err19);
          }
          errors++;
        }
        if (func4(data9) < 1) {
          const err20 = {
            instancePath: instancePath + "/user_id",
            schemaPath: "#/properties/user_id/minLength",
            keyword: "minLength",
            params: { limit: 1 },
            message: "must NOT have fewer than 1 characters"
          };
          if (vErrors === null) {
            vErrors = [err20];
          } else {
            vErrors.push(err20);
          }
          errors++;
        }
      } else {
        const err21 = {
          instancePath: instancePath + "/user_id",
          schemaPath: "#/properties/user_id/type",
          keyword: "type",
          params: { type: "string" },
          message: "must be string"
        };
        if (vErrors === null) {
          vErrors = [err21];
        } else {
          vErrors.push(err21);
        }
        errors++;
      }
    }
    if (data.username !== void 0) {
      let data10 = data.username;
      if (typeof data10 === "string") {
        if (func4(data10) > 128) {
          const err22 = {
            instancePath: instancePath + "/username",
            schemaPath: "#/properties/username/maxLength",
            keyword: "maxLength",
            params: { limit: 128 },
            message: "must NOT have more than 128 characters"
          };
          if (vErrors === null) {
            vErrors = [err22];
          } else {
            vErrors.push(err22);
          }
          errors++;
        }
        if (func4(data10) < 1) {
          const err23 = {
            instancePath: instancePath + "/username",
            schemaPath: "#/properties/username/minLength",
            keyword: "minLength",
            params: { limit: 1 },
            message: "must NOT have fewer than 1 characters"
          };
          if (vErrors === null) {
            vErrors = [err23];
          } else {
            vErrors.push(err23);
          }
          errors++;
        }
      } else {
        const err24 = {
          instancePath: instancePath + "/username",
          schemaPath: "#/properties/username/type",
          keyword: "type",
          params: { type: "string" },
          message: "must be string"
        };
        if (vErrors === null) {
          vErrors = [err24];
        } else {
          vErrors.push(err24);
        }
        errors++;
      }
    }
    if (data.verify_email !== void 0) {
      if (typeof data.verify_email !== "boolean") {
        const err25 = {
          instancePath: instancePath + "/verify_email",
          schemaPath: "#/properties/verify_email/type",
          keyword: "type",
          params: { type: "boolean" },
          message: "must be boolean"
        };
        if (vErrors === null) {
          vErrors = [err25];
        } else {
          vErrors.push(err25);
        }
        errors++;
      }
    }
  } else {
    const err26 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: { type: "object" },
      message: "must be object"
    };
    if (vErrors === null) {
      vErrors = [err26];
    } else {
      vErrors.push(err26);
    }
    errors++;
  }
  validate366.errors = vErrors;
  return errors === 0;
}
function validate361(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.connection_name === void 0) {
      const err0 = {
        instancePath,
        schemaPath: "#/required",
        keyword: "required",
        params: { missingProperty: "connection_name" },
        message: "must have required property 'connection_name'"
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.user_attributes === void 0) {
      const err1 = {
        instancePath,
        schemaPath: "#/required",
        keyword: "required",
        params: { missingProperty: "user_attributes" },
        message: "must have required property 'user_attributes'"
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.options === void 0) {
      const err2 = {
        instancePath,
        schemaPath: "#/required",
        keyword: "required",
        params: { missingProperty: "options" },
        message: "must have required property 'options'"
      };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "connection_name" || key0 === "options" || key0 === "user_attributes")) {
        const err3 = {
          instancePath,
          schemaPath: "#/additionalProperties",
          keyword: "additionalProperties",
          params: { additionalProperty: key0 },
          message: "must NOT have additional properties"
        };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
    if (data.connection_name !== void 0) {
      if (!validate362(data.connection_name, {
        instancePath: instancePath + "/connection_name",
        parentData: data,
        parentDataProperty: "connection_name",
        rootData
      })) {
        vErrors = vErrors === null ? validate362.errors : vErrors.concat(validate362.errors);
        errors = vErrors.length;
      }
    }
    if (data.options !== void 0) {
      if (!validate364(data.options, {
        instancePath: instancePath + "/options",
        parentData: data,
        parentDataProperty: "options",
        rootData
      })) {
        vErrors = vErrors === null ? validate364.errors : vErrors.concat(validate364.errors);
        errors = vErrors.length;
      }
    }
    if (data.user_attributes !== void 0) {
      if (!validate366(data.user_attributes, {
        instancePath: instancePath + "/user_attributes",
        parentData: data,
        parentDataProperty: "user_attributes",
        rootData
      })) {
        vErrors = vErrors === null ? validate366.errors : vErrors.concat(validate366.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err4 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: { type: "object" },
      message: "must be object"
    };
    if (vErrors === null) {
      vErrors = [err4];
    } else {
      vErrors.push(err4);
    }
    errors++;
  }
  validate361.errors = vErrors;
  return errors === 0;
}
var CustomTokenExchangeSetUserByIdInput = validate368;
function validate369(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (typeof data === "string") {
    if (func4(data) > 512) {
      const err0 = {
        instancePath,
        schemaPath: "#/maxLength",
        keyword: "maxLength",
        params: { limit: 512 },
        message: "must NOT have more than 512 characters"
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (func4(data) < 1) {
      const err1 = {
        instancePath,
        schemaPath: "#/minLength",
        keyword: "minLength",
        params: { limit: 1 },
        message: "must NOT have fewer than 1 characters"
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
  } else {
    const err2 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: { type: "string" },
      message: "must be string"
    };
    if (vErrors === null) {
      vErrors = [err2];
    } else {
      vErrors.push(err2);
    }
    errors++;
  }
  validate369.errors = vErrors;
  return errors === 0;
}
function validate368(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.user_id === void 0) {
      const err0 = {
        instancePath,
        schemaPath: "#/required",
        keyword: "required",
        params: { missingProperty: "user_id" },
        message: "must have required property 'user_id'"
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "user_id")) {
        const err1 = {
          instancePath,
          schemaPath: "#/additionalProperties",
          keyword: "additionalProperties",
          params: { additionalProperty: key0 },
          message: "must NOT have additional properties"
        };
        if (vErrors === null) {
          vErrors = [err1];
        } else {
          vErrors.push(err1);
        }
        errors++;
      }
    }
    if (data.user_id !== void 0) {
      if (!validate369(data.user_id, {
        instancePath: instancePath + "/user_id",
        parentData: data,
        parentDataProperty: "user_id",
        rootData
      })) {
        vErrors = vErrors === null ? validate369.errors : vErrors.concat(validate369.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err2 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: { type: "object" },
      message: "must be object"
    };
    if (vErrors === null) {
      vErrors = [err2];
    } else {
      vErrors.push(err2);
    }
    errors++;
  }
  validate368.errors = vErrors;
  return errors === 0;
}
var PasswordResetPostChallengeRenderPromptInput = validate560;
function validate561(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (typeof data === "string") {
    if (func4(data) > 48) {
      const err0 = {
        instancePath,
        schemaPath: "#/maxLength",
        keyword: "maxLength",
        params: { limit: 48 },
        message: "must NOT have more than 48 characters"
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
  } else {
    const err1 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: { type: "string" },
      message: "must be string"
    };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate561.errors = vErrors;
  return errors === 0;
}
function validate563(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    for (const key0 in data) {
      if (!(key0 === "fields" || key0 === "vars")) {
        const err0 = {
          instancePath,
          schemaPath: "#/additionalProperties",
          keyword: "additionalProperties",
          params: { additionalProperty: key0 },
          message: "must NOT have additional properties"
        };
        if (vErrors === null) {
          vErrors = [err0];
        } else {
          vErrors.push(err0);
        }
        errors++;
      }
    }
    if (data.fields !== void 0) {
      let data0 = data.fields;
      if (data0 && typeof data0 == "object" && !Array.isArray(data0)) {
        if (Object.keys(data0).length > 24) {
          const err1 = {
            instancePath: instancePath + "/fields",
            schemaPath: "#/properties/fields/maxProperties",
            keyword: "maxProperties",
            params: { limit: 24 },
            message: "must NOT have more than 24 properties"
          };
          if (vErrors === null) {
            vErrors = [err1];
          } else {
            vErrors.push(err1);
          }
          errors++;
        }
        for (const key1 in data0) {
          if (!pattern5.test(key1)) {
            const err2 = {
              instancePath: instancePath + "/fields",
              schemaPath: "#/properties/fields/additionalProperties",
              keyword: "additionalProperties",
              params: { additionalProperty: key1 },
              message: "must NOT have additional properties"
            };
            if (vErrors === null) {
              vErrors = [err2];
            } else {
              vErrors.push(err2);
            }
            errors++;
          }
        }
      } else {
        const err3 = {
          instancePath: instancePath + "/fields",
          schemaPath: "#/properties/fields/type",
          keyword: "type",
          params: { type: "object" },
          message: "must be object"
        };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
    if (data.vars !== void 0) {
      let data1 = data.vars;
      if (data1 && typeof data1 == "object" && !Array.isArray(data1)) {
        if (Object.keys(data1).length > 24) {
          const err4 = {
            instancePath: instancePath + "/vars",
            schemaPath: "#/properties/vars/maxProperties",
            keyword: "maxProperties",
            params: { limit: 24 },
            message: "must NOT have more than 24 properties"
          };
          if (vErrors === null) {
            vErrors = [err4];
          } else {
            vErrors.push(err4);
          }
          errors++;
        }
        for (const key2 in data1) {
          if (!pattern6.test(key2)) {
            const err5 = {
              instancePath: instancePath + "/vars",
              schemaPath: "#/properties/vars/additionalProperties",
              keyword: "additionalProperties",
              params: { additionalProperty: key2 },
              message: "must NOT have additional properties"
            };
            if (vErrors === null) {
              vErrors = [err5];
            } else {
              vErrors.push(err5);
            }
            errors++;
          }
        }
      } else {
        const err6 = {
          instancePath: instancePath + "/vars",
          schemaPath: "#/properties/vars/type",
          keyword: "type",
          params: { type: "object" },
          message: "must be object"
        };
        if (vErrors === null) {
          vErrors = [err6];
        } else {
          vErrors.push(err6);
        }
        errors++;
      }
    }
  } else {
    const err7 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: { type: "object" },
      message: "must be object"
    };
    if (vErrors === null) {
      vErrors = [err7];
    } else {
      vErrors.push(err7);
    }
    errors++;
  }
  validate563.errors = vErrors;
  return errors === 0;
}
function validate560(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.promptId === void 0) {
      const err0 = {
        instancePath,
        schemaPath: "#/required",
        keyword: "required",
        params: { missingProperty: "promptId" },
        message: "must have required property 'promptId'"
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "promptId" || key0 === "promptOptions")) {
        const err1 = {
          instancePath,
          schemaPath: "#/additionalProperties",
          keyword: "additionalProperties",
          params: { additionalProperty: key0 },
          message: "must NOT have additional properties"
        };
        if (vErrors === null) {
          vErrors = [err1];
        } else {
          vErrors.push(err1);
        }
        errors++;
      }
    }
    if (data.promptId !== void 0) {
      if (!validate561(data.promptId, {
        instancePath: instancePath + "/promptId",
        parentData: data,
        parentDataProperty: "promptId",
        rootData
      })) {
        vErrors = vErrors === null ? validate561.errors : vErrors.concat(validate561.errors);
        errors = vErrors.length;
      }
    }
    if (data.promptOptions !== void 0) {
      if (!validate563(data.promptOptions, {
        instancePath: instancePath + "/promptOptions",
        parentData: data,
        parentDataProperty: "promptOptions",
        rootData
      })) {
        vErrors = vErrors === null ? validate563.errors : vErrors.concat(validate563.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err2 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: { type: "object" },
      message: "must be object"
    };
    if (vErrors === null) {
      vErrors = [err2];
    } else {
      vErrors.push(err2);
    }
    errors++;
  }
  validate560.errors = vErrors;
  return errors === 0;
}
var PostLoginRenderPromptInput = validate738;
function validate739(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (typeof data === "string") {
    if (func4(data) > 48) {
      const err0 = {
        instancePath,
        schemaPath: "#/maxLength",
        keyword: "maxLength",
        params: { limit: 48 },
        message: "must NOT have more than 48 characters"
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
  } else {
    const err1 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: { type: "string" },
      message: "must be string"
    };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate739.errors = vErrors;
  return errors === 0;
}
function validate741(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    for (const key0 in data) {
      if (!(key0 === "fields" || key0 === "vars")) {
        const err0 = {
          instancePath,
          schemaPath: "#/additionalProperties",
          keyword: "additionalProperties",
          params: { additionalProperty: key0 },
          message: "must NOT have additional properties"
        };
        if (vErrors === null) {
          vErrors = [err0];
        } else {
          vErrors.push(err0);
        }
        errors++;
      }
    }
    if (data.fields !== void 0) {
      let data0 = data.fields;
      if (data0 && typeof data0 == "object" && !Array.isArray(data0)) {
        if (Object.keys(data0).length > 24) {
          const err1 = {
            instancePath: instancePath + "/fields",
            schemaPath: "#/properties/fields/maxProperties",
            keyword: "maxProperties",
            params: { limit: 24 },
            message: "must NOT have more than 24 properties"
          };
          if (vErrors === null) {
            vErrors = [err1];
          } else {
            vErrors.push(err1);
          }
          errors++;
        }
        for (const key1 in data0) {
          if (!pattern5.test(key1)) {
            const err2 = {
              instancePath: instancePath + "/fields",
              schemaPath: "#/properties/fields/additionalProperties",
              keyword: "additionalProperties",
              params: { additionalProperty: key1 },
              message: "must NOT have additional properties"
            };
            if (vErrors === null) {
              vErrors = [err2];
            } else {
              vErrors.push(err2);
            }
            errors++;
          }
        }
      } else {
        const err3 = {
          instancePath: instancePath + "/fields",
          schemaPath: "#/properties/fields/type",
          keyword: "type",
          params: { type: "object" },
          message: "must be object"
        };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
    if (data.vars !== void 0) {
      let data1 = data.vars;
      if (data1 && typeof data1 == "object" && !Array.isArray(data1)) {
        if (Object.keys(data1).length > 24) {
          const err4 = {
            instancePath: instancePath + "/vars",
            schemaPath: "#/properties/vars/maxProperties",
            keyword: "maxProperties",
            params: { limit: 24 },
            message: "must NOT have more than 24 properties"
          };
          if (vErrors === null) {
            vErrors = [err4];
          } else {
            vErrors.push(err4);
          }
          errors++;
        }
        for (const key2 in data1) {
          if (!pattern6.test(key2)) {
            const err5 = {
              instancePath: instancePath + "/vars",
              schemaPath: "#/properties/vars/additionalProperties",
              keyword: "additionalProperties",
              params: { additionalProperty: key2 },
              message: "must NOT have additional properties"
            };
            if (vErrors === null) {
              vErrors = [err5];
            } else {
              vErrors.push(err5);
            }
            errors++;
          }
        }
      } else {
        const err6 = {
          instancePath: instancePath + "/vars",
          schemaPath: "#/properties/vars/type",
          keyword: "type",
          params: { type: "object" },
          message: "must be object"
        };
        if (vErrors === null) {
          vErrors = [err6];
        } else {
          vErrors.push(err6);
        }
        errors++;
      }
    }
  } else {
    const err7 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: { type: "object" },
      message: "must be object"
    };
    if (vErrors === null) {
      vErrors = [err7];
    } else {
      vErrors.push(err7);
    }
    errors++;
  }
  validate741.errors = vErrors;
  return errors === 0;
}
function validate738(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.promptId === void 0) {
      const err0 = {
        instancePath,
        schemaPath: "#/required",
        keyword: "required",
        params: { missingProperty: "promptId" },
        message: "must have required property 'promptId'"
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "promptId" || key0 === "promptOptions")) {
        const err1 = {
          instancePath,
          schemaPath: "#/additionalProperties",
          keyword: "additionalProperties",
          params: { additionalProperty: key0 },
          message: "must NOT have additional properties"
        };
        if (vErrors === null) {
          vErrors = [err1];
        } else {
          vErrors.push(err1);
        }
        errors++;
      }
    }
    if (data.promptId !== void 0) {
      if (!validate739(data.promptId, {
        instancePath: instancePath + "/promptId",
        parentData: data,
        parentDataProperty: "promptId",
        rootData
      })) {
        vErrors = vErrors === null ? validate739.errors : vErrors.concat(validate739.errors);
        errors = vErrors.length;
      }
    }
    if (data.promptOptions !== void 0) {
      if (!validate741(data.promptOptions, {
        instancePath: instancePath + "/promptOptions",
        parentData: data,
        parentDataProperty: "promptOptions",
        rootData
      })) {
        vErrors = vErrors === null ? validate741.errors : vErrors.concat(validate741.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err2 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: { type: "object" },
      message: "must be object"
    };
    if (vErrors === null) {
      vErrors = [err2];
    } else {
      vErrors.push(err2);
    }
    errors++;
  }
  validate738.errors = vErrors;
  return errors === 0;
}
var PostLoginRevokeRefreshTokenInput = validate139;
function validate140(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (typeof data === "string") {
    if (func4(data) > 1024) {
      const err0 = {
        instancePath,
        schemaPath: "#/maxLength",
        keyword: "maxLength",
        params: { limit: 1024 },
        message: "must NOT have more than 1024 characters"
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
  } else {
    const err1 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: { type: "string" },
      message: "must be string"
    };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate140.errors = vErrors;
  return errors === 0;
}
function validate139(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    for (const key0 in data) {
      if (!(key0 === "message")) {
        const err0 = {
          instancePath,
          schemaPath: "#/additionalProperties",
          keyword: "additionalProperties",
          params: { additionalProperty: key0 },
          message: "must NOT have additional properties"
        };
        if (vErrors === null) {
          vErrors = [err0];
        } else {
          vErrors.push(err0);
        }
        errors++;
      }
    }
    if (data.message !== void 0) {
      if (!validate140(data.message, {
        instancePath: instancePath + "/message",
        parentData: data,
        parentDataProperty: "message",
        rootData
      })) {
        vErrors = vErrors === null ? validate140.errors : vErrors.concat(validate140.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err1 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: { type: "object" },
      message: "must be object"
    };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate139.errors = vErrors;
  return errors === 0;
}
var PostLoginRevokeSessionInput = validate146;
function validate147(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (typeof data !== "string") {
    const err0 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: { type: "string" },
      message: "must be string"
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  validate147.errors = vErrors;
  return errors === 0;
}
function validate149(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    for (const key0 in data) {
      if (!(key0 === "preserveRefreshTokens")) {
        const err0 = {
          instancePath,
          schemaPath: "#/additionalProperties",
          keyword: "additionalProperties",
          params: { additionalProperty: key0 },
          message: "must NOT have additional properties"
        };
        if (vErrors === null) {
          vErrors = [err0];
        } else {
          vErrors.push(err0);
        }
        errors++;
      }
    }
    if (data.preserveRefreshTokens !== void 0) {
      if (typeof data.preserveRefreshTokens !== "boolean") {
        const err1 = {
          instancePath: instancePath + "/preserveRefreshTokens",
          schemaPath: "#/properties/preserveRefreshTokens/type",
          keyword: "type",
          params: { type: "boolean" },
          message: "must be boolean"
        };
        if (vErrors === null) {
          vErrors = [err1];
        } else {
          vErrors.push(err1);
        }
        errors++;
      }
    }
  } else {
    const err2 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: { type: "object" },
      message: "must be object"
    };
    if (vErrors === null) {
      vErrors = [err2];
    } else {
      vErrors.push(err2);
    }
    errors++;
  }
  validate149.errors = vErrors;
  return errors === 0;
}
function validate146(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    for (const key0 in data) {
      if (!(key0 === "message" || key0 === "options")) {
        const err0 = {
          instancePath,
          schemaPath: "#/additionalProperties",
          keyword: "additionalProperties",
          params: { additionalProperty: key0 },
          message: "must NOT have additional properties"
        };
        if (vErrors === null) {
          vErrors = [err0];
        } else {
          vErrors.push(err0);
        }
        errors++;
      }
    }
    if (data.message !== void 0) {
      if (!validate147(data.message, {
        instancePath: instancePath + "/message",
        parentData: data,
        parentDataProperty: "message",
        rootData
      })) {
        vErrors = vErrors === null ? validate147.errors : vErrors.concat(validate147.errors);
        errors = vErrors.length;
      }
    }
    if (data.options !== void 0) {
      if (!validate149(data.options, {
        instancePath: instancePath + "/options",
        parentData: data,
        parentDataProperty: "options",
        rootData
      })) {
        vErrors = vErrors === null ? validate149.errors : vErrors.concat(validate149.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err1 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: { type: "object" },
      message: "must be object"
    };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate146.errors = vErrors;
  return errors === 0;
}
var PostLoginSetCookieModeInput = validate132;
function validate133(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (!(data === "persistent" || data === "non-persistent")) {
    const err0 = {
      instancePath,
      schemaPath: "#/enum",
      keyword: "enum",
      params: { allowedValues: schema66.enum },
      message: "must be equal to one of the allowed values"
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  validate133.errors = vErrors;
  return errors === 0;
}
function validate132(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.mode === void 0) {
      const err0 = {
        instancePath,
        schemaPath: "#/required",
        keyword: "required",
        params: { missingProperty: "mode" },
        message: "must have required property 'mode'"
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "mode")) {
        const err1 = {
          instancePath,
          schemaPath: "#/additionalProperties",
          keyword: "additionalProperties",
          params: { additionalProperty: key0 },
          message: "must NOT have additional properties"
        };
        if (vErrors === null) {
          vErrors = [err1];
        } else {
          vErrors.push(err1);
        }
        errors++;
      }
    }
    if (data.mode !== void 0) {
      if (!validate133(data.mode, {
        instancePath: instancePath + "/mode",
        parentData: data,
        parentDataProperty: "mode",
        rootData
      })) {
        vErrors = vErrors === null ? validate133.errors : vErrors.concat(validate133.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err2 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: { type: "object" },
      message: "must be object"
    };
    if (vErrors === null) {
      vErrors = [err2];
    } else {
      vErrors.push(err2);
    }
    errors++;
  }
  validate132.errors = vErrors;
  return errors === 0;
}
var PostLoginSetRefreshTokenExpirationInput = validate95;
function validate96(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (!(typeof data == "number" && isFinite(data))) {
    const err0 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: { type: "number" },
      message: "must be number"
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  validate96.errors = vErrors;
  return errors === 0;
}
function validate98(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (!(typeof data == "number" && isFinite(data))) {
    const err0 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: { type: "number" },
      message: "must be number"
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  validate98.errors = vErrors;
  return errors === 0;
}
function validate95(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    for (const key0 in data) {
      if (!(key0 === "absolute" || key0 === "inactivity")) {
        const err0 = {
          instancePath,
          schemaPath: "#/additionalProperties",
          keyword: "additionalProperties",
          params: { additionalProperty: key0 },
          message: "must NOT have additional properties"
        };
        if (vErrors === null) {
          vErrors = [err0];
        } else {
          vErrors.push(err0);
        }
        errors++;
      }
    }
    if (data.absolute !== void 0) {
      if (!validate96(data.absolute, {
        instancePath: instancePath + "/absolute",
        parentData: data,
        parentDataProperty: "absolute",
        rootData
      })) {
        vErrors = vErrors === null ? validate96.errors : vErrors.concat(validate96.errors);
        errors = vErrors.length;
      }
    }
    if (data.inactivity !== void 0) {
      if (!validate98(data.inactivity, {
        instancePath: instancePath + "/inactivity",
        parentData: data,
        parentDataProperty: "inactivity",
        rootData
      })) {
        vErrors = vErrors === null ? validate98.errors : vErrors.concat(validate98.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err1 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: { type: "object" },
      message: "must be object"
    };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate95.errors = vErrors;
  return errors === 0;
}
var PostLoginSetSAMLAttributeInput = validate106;
function validate107(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (typeof data === "string") {
    if (func4(data) > 1024) {
      const err0 = {
        instancePath,
        schemaPath: "#/maxLength",
        keyword: "maxLength",
        params: { limit: 1024 },
        message: "must NOT have more than 1024 characters"
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
  } else {
    const err1 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: { type: "string" },
      message: "must be string"
    };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate107.errors = vErrors;
  return errors === 0;
}
function validate109(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (typeof data !== "string" && !(typeof data == "number" && isFinite(data)) && typeof data !== "boolean" && data !== null && !Array.isArray(data)) {
    const err0 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: { type: schema53.type },
      message: "must be string,number,boolean,null,array"
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  if (typeof data === "string") {
    if (func4(data) > 2048) {
      const err1 = {
        instancePath,
        schemaPath: "#/maxLength",
        keyword: "maxLength",
        params: { limit: 2048 },
        message: "must NOT have more than 2048 characters"
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
  }
  if (Array.isArray(data)) {
    const len0 = data.length;
    for (let i0 = 0; i0 < len0; i0++) {
      let data0 = data[i0];
      if (typeof data0 !== "string" && !(typeof data0 == "number" && isFinite(data0)) && typeof data0 !== "boolean") {
        const err2 = {
          instancePath: instancePath + "/" + i0,
          schemaPath: "#/items/type",
          keyword: "type",
          params: { type: schema53.items.type },
          message: "must be string,number,boolean"
        };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
      if (typeof data0 === "string") {
        if (func4(data0) > 2048) {
          const err3 = {
            instancePath: instancePath + "/" + i0,
            schemaPath: "#/items/maxLength",
            keyword: "maxLength",
            params: { limit: 2048 },
            message: "must NOT have more than 2048 characters"
          };
          if (vErrors === null) {
            vErrors = [err3];
          } else {
            vErrors.push(err3);
          }
          errors++;
        }
      }
    }
  }
  validate109.errors = vErrors;
  return errors === 0;
}
function validate106(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.attribute === void 0) {
      const err0 = {
        instancePath,
        schemaPath: "#/required",
        keyword: "required",
        params: { missingProperty: "attribute" },
        message: "must have required property 'attribute'"
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.value === void 0) {
      const err1 = {
        instancePath,
        schemaPath: "#/required",
        keyword: "required",
        params: { missingProperty: "value" },
        message: "must have required property 'value'"
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "attribute" || key0 === "value")) {
        const err2 = {
          instancePath,
          schemaPath: "#/additionalProperties",
          keyword: "additionalProperties",
          params: { additionalProperty: key0 },
          message: "must NOT have additional properties"
        };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    if (data.attribute !== void 0) {
      if (!validate107(data.attribute, {
        instancePath: instancePath + "/attribute",
        parentData: data,
        parentDataProperty: "attribute",
        rootData
      })) {
        vErrors = vErrors === null ? validate107.errors : vErrors.concat(validate107.errors);
        errors = vErrors.length;
      }
    }
    if (data.value !== void 0) {
      if (!validate109(data.value, {
        instancePath: instancePath + "/value",
        parentData: data,
        parentDataProperty: "value",
        rootData
      })) {
        vErrors = vErrors === null ? validate109.errors : vErrors.concat(validate109.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err3 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: { type: "object" },
      message: "must be object"
    };
    if (vErrors === null) {
      vErrors = [err3];
    } else {
      vErrors.push(err3);
    }
    errors++;
  }
  validate106.errors = vErrors;
  return errors === 0;
}
var PostLoginSetSAMLConfigurationInput = validate117;
var PostLoginSetSessionExpirationInput = validate121;
function validate122(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (!(typeof data == "number" && isFinite(data))) {
    const err0 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: { type: "number" },
      message: "must be number"
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  validate122.errors = vErrors;
  return errors === 0;
}
function validate124(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (!(typeof data == "number" && isFinite(data))) {
    const err0 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: { type: "number" },
      message: "must be number"
    };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  validate124.errors = vErrors;
  return errors === 0;
}
function validate121(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    for (const key0 in data) {
      if (!(key0 === "absolute" || key0 === "inactivity")) {
        const err0 = {
          instancePath,
          schemaPath: "#/additionalProperties",
          keyword: "additionalProperties",
          params: { additionalProperty: key0 },
          message: "must NOT have additional properties"
        };
        if (vErrors === null) {
          vErrors = [err0];
        } else {
          vErrors.push(err0);
        }
        errors++;
      }
    }
    if (data.absolute !== void 0) {
      if (!validate122(data.absolute, {
        instancePath: instancePath + "/absolute",
        parentData: data,
        parentDataProperty: "absolute",
        rootData
      })) {
        vErrors = vErrors === null ? validate122.errors : vErrors.concat(validate122.errors);
        errors = vErrors.length;
      }
    }
    if (data.inactivity !== void 0) {
      if (!validate124(data.inactivity, {
        instancePath: instancePath + "/inactivity",
        parentData: data,
        parentDataProperty: "inactivity",
        rootData
      })) {
        vErrors = vErrors === null ? validate124.errors : vErrors.concat(validate124.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err1 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: { type: "object" },
      message: "must be object"
    };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate121.errors = vErrors;
  return errors === 0;
}
var PostLoginValidationErrorInput = validate743;
function validate744(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (typeof data === "string") {
    if (func4(data) > 100) {
      const err0 = {
        instancePath,
        schemaPath: "#/maxLength",
        keyword: "maxLength",
        params: { limit: 100 },
        message: "must NOT have more than 100 characters"
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
  } else {
    const err1 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: { type: "string" },
      message: "must be string"
    };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate744.errors = vErrors;
  return errors === 0;
}
function validate746(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (typeof data === "string") {
    if (func4(data) > 100) {
      const err0 = {
        instancePath,
        schemaPath: "#/maxLength",
        keyword: "maxLength",
        params: { limit: 100 },
        message: "must NOT have more than 100 characters"
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
  } else {
    const err1 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: { type: "string" },
      message: "must be string"
    };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate746.errors = vErrors;
  return errors === 0;
}
function validate743(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.errorCode === void 0) {
      const err0 = {
        instancePath,
        schemaPath: "#/required",
        keyword: "required",
        params: { missingProperty: "errorCode" },
        message: "must have required property 'errorCode'"
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.errorMessage === void 0) {
      const err1 = {
        instancePath,
        schemaPath: "#/required",
        keyword: "required",
        params: { missingProperty: "errorMessage" },
        message: "must have required property 'errorMessage'"
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "errorCode" || key0 === "errorMessage")) {
        const err2 = {
          instancePath,
          schemaPath: "#/additionalProperties",
          keyword: "additionalProperties",
          params: { additionalProperty: key0 },
          message: "must NOT have additional properties"
        };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    if (data.errorCode !== void 0) {
      if (!validate744(data.errorCode, {
        instancePath: instancePath + "/errorCode",
        parentData: data,
        parentDataProperty: "errorCode",
        rootData
      })) {
        vErrors = vErrors === null ? validate744.errors : vErrors.concat(validate744.errors);
        errors = vErrors.length;
      }
    }
    if (data.errorMessage !== void 0) {
      if (!validate746(data.errorMessage, {
        instancePath: instancePath + "/errorMessage",
        parentData: data,
        parentDataProperty: "errorMessage",
        rootData
      })) {
        vErrors = vErrors === null ? validate746.errors : vErrors.concat(validate746.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err3 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: { type: "object" },
      message: "must be object"
    };
    if (vErrors === null) {
      vErrors = [err3];
    } else {
      vErrors.push(err3);
    }
    errors++;
  }
  validate743.errors = vErrors;
  return errors === 0;
}
var PreUserRegistrationSetUserIdInput = validate912;
function validate913(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (typeof data === "string") {
    if (func4(data) > 255) {
      const err0 = {
        instancePath,
        schemaPath: "#/maxLength",
        keyword: "maxLength",
        params: { limit: 255 },
        message: "must NOT have more than 255 characters"
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (func4(data) < 1) {
      const err1 = {
        instancePath,
        schemaPath: "#/minLength",
        keyword: "minLength",
        params: { limit: 1 },
        message: "must NOT have fewer than 1 characters"
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (!pattern7.test(data)) {
      const err2 = {
        instancePath,
        schemaPath: "#/pattern",
        keyword: "pattern",
        params: { pattern: "^[a-zA-Z0-9@._+-]{1,255}$" },
        message: 'must match pattern "^[a-zA-Z0-9@._+-]{1,255}$"'
      };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
  } else {
    const err3 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: { type: "string" },
      message: "must be string"
    };
    if (vErrors === null) {
      vErrors = [err3];
    } else {
      vErrors.push(err3);
    }
    errors++;
  }
  validate913.errors = vErrors;
  return errors === 0;
}
function validate912(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.user_id === void 0) {
      const err0 = {
        instancePath,
        schemaPath: "#/required",
        keyword: "required",
        params: { missingProperty: "user_id" },
        message: "must have required property 'user_id'"
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "user_id")) {
        const err1 = {
          instancePath,
          schemaPath: "#/additionalProperties",
          keyword: "additionalProperties",
          params: { additionalProperty: key0 },
          message: "must NOT have additional properties"
        };
        if (vErrors === null) {
          vErrors = [err1];
        } else {
          vErrors.push(err1);
        }
        errors++;
      }
    }
    if (data.user_id !== void 0) {
      if (!validate913(data.user_id, {
        instancePath: instancePath + "/user_id",
        parentData: data,
        parentDataProperty: "user_id",
        rootData
      })) {
        vErrors = vErrors === null ? validate913.errors : vErrors.concat(validate913.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err2 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: { type: "object" },
      message: "must be object"
    };
    if (vErrors === null) {
      vErrors = [err2];
    } else {
      vErrors.push(err2);
    }
    errors++;
  }
  validate912.errors = vErrors;
  return errors === 0;
}
var PreUserRegistrationValidationErrorInput = validate915;
function validate916(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (typeof data === "string") {
    if (func4(data) > 100) {
      const err0 = {
        instancePath,
        schemaPath: "#/maxLength",
        keyword: "maxLength",
        params: { limit: 100 },
        message: "must NOT have more than 100 characters"
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
  } else {
    const err1 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: { type: "string" },
      message: "must be string"
    };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate916.errors = vErrors;
  return errors === 0;
}
function validate918(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (typeof data === "string") {
    if (func4(data) > 100) {
      const err0 = {
        instancePath,
        schemaPath: "#/maxLength",
        keyword: "maxLength",
        params: { limit: 100 },
        message: "must NOT have more than 100 characters"
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
  } else {
    const err1 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: { type: "string" },
      message: "must be string"
    };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate918.errors = vErrors;
  return errors === 0;
}
function validate915(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.errorCode === void 0) {
      const err0 = {
        instancePath,
        schemaPath: "#/required",
        keyword: "required",
        params: { missingProperty: "errorCode" },
        message: "must have required property 'errorCode'"
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.errorMessage === void 0) {
      const err1 = {
        instancePath,
        schemaPath: "#/required",
        keyword: "required",
        params: { missingProperty: "errorMessage" },
        message: "must have required property 'errorMessage'"
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "errorCode" || key0 === "errorMessage")) {
        const err2 = {
          instancePath,
          schemaPath: "#/additionalProperties",
          keyword: "additionalProperties",
          params: { additionalProperty: key0 },
          message: "must NOT have additional properties"
        };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    if (data.errorCode !== void 0) {
      if (!validate916(data.errorCode, {
        instancePath: instancePath + "/errorCode",
        parentData: data,
        parentDataProperty: "errorCode",
        rootData
      })) {
        vErrors = vErrors === null ? validate916.errors : vErrors.concat(validate916.errors);
        errors = vErrors.length;
      }
    }
    if (data.errorMessage !== void 0) {
      if (!validate918(data.errorMessage, {
        instancePath: instancePath + "/errorMessage",
        parentData: data,
        parentDataProperty: "errorMessage",
        rootData
      })) {
        vErrors = vErrors === null ? validate918.errors : vErrors.concat(validate918.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err3 = {
      instancePath,
      schemaPath: "#/type",
      keyword: "type",
      params: { type: "object" },
      message: "must be object"
    };
    if (vErrors === null) {
      vErrors = [err3];
    } else {
      vErrors.push(err3);
    }
    errors++;
  }
  validate915.errors = vErrors;
  return errors === 0;
}
var CustomTokenExchangeDenyInputCodec = /* @__PURE__ */ createCodec2(
  "CustomTokenExchangeDenyInput",
  "CustomTokenExchangeDenyInput",
  CustomTokenExchangeDenyInput
);
var CustomTokenExchangeRejectInvalidSubjectTokenInputCodec = /* @__PURE__ */ createCodec2(
  "CustomTokenExchangeRejectInvalidSubjectTokenInput",
  "CustomTokenExchangeRejectInvalidSubjectTokenInput",
  CustomTokenExchangeRejectInvalidSubjectTokenInput
);
var CustomTokenExchangeSetMetadataInputCodec = /* @__PURE__ */ createCodec2(
  "CustomTokenExchangeSetMetadataInput",
  "CustomTokenExchangeSetMetadataInput",
  CustomTokenExchangeSetMetadataInput
);
var CustomTokenExchangeSetOrganizationInputCodec = /* @__PURE__ */ createCodec2(
  "CustomTokenExchangeSetOrganizationInput",
  "CustomTokenExchangeSetOrganizationInput",
  CustomTokenExchangeSetOrganizationInput
);
var CustomTokenExchangeSetUserByConnectionInputCodec = /* @__PURE__ */ createCodec2(
  "CustomTokenExchangeSetUserByConnectionInput",
  "CustomTokenExchangeSetUserByConnectionInput",
  CustomTokenExchangeSetUserByConnectionInput
);
var CustomTokenExchangeSetUserByIdInputCodec = /* @__PURE__ */ createCodec2(
  "CustomTokenExchangeSetUserByIdInput",
  "CustomTokenExchangeSetUserByIdInput",
  CustomTokenExchangeSetUserByIdInput
);
var ModifyScopeCodec = /* @__PURE__ */ createCodec2(
  "ModifyScope",
  "ModifyScope",
  ModifyScope
);
var PasswordResetPostChallengeRenderPromptInputCodec = /* @__PURE__ */ createCodec2(
  "PasswordResetPostChallengeRenderPromptInput",
  "PasswordResetPostChallengeRenderPromptInput",
  PasswordResetPostChallengeRenderPromptInput
);
var PostLoginRenderPromptInputCodec = /* @__PURE__ */ createCodec2(
  "PostLoginRenderPromptInput",
  "PostLoginRenderPromptInput",
  PostLoginRenderPromptInput
);
var PostLoginRevokeRefreshTokenInputCodec = /* @__PURE__ */ createCodec2(
  "PostLoginRevokeRefreshTokenInput",
  "PostLoginRevokeRefreshTokenInput",
  PostLoginRevokeRefreshTokenInput
);
var PostLoginRevokeSessionInputCodec = /* @__PURE__ */ createCodec2(
  "PostLoginRevokeSessionInput",
  "PostLoginRevokeSessionInput",
  PostLoginRevokeSessionInput
);
var PostLoginSetCookieModeInputCodec = /* @__PURE__ */ createCodec2(
  "PostLoginSetCookieModeInput",
  "PostLoginSetCookieModeInput",
  PostLoginSetCookieModeInput
);
var PostLoginSetRefreshTokenExpirationInputCodec = /* @__PURE__ */ createCodec2(
  "PostLoginSetRefreshTokenExpirationInput",
  "PostLoginSetRefreshTokenExpirationInput",
  PostLoginSetRefreshTokenExpirationInput
);
var PostLoginSetSAMLAttributeInputCodec = /* @__PURE__ */ createCodec2(
  "PostLoginSetSAMLAttributeInput",
  "PostLoginSetSAMLAttributeInput",
  PostLoginSetSAMLAttributeInput
);
var PostLoginSetSAMLConfigurationInputCodec = /* @__PURE__ */ createCodec2(
  "PostLoginSetSAMLConfigurationInput",
  "PostLoginSetSAMLConfigurationInput",
  PostLoginSetSAMLConfigurationInput
);
var PostLoginSetSessionExpirationInputCodec = /* @__PURE__ */ createCodec2(
  "PostLoginSetSessionExpirationInput",
  "PostLoginSetSessionExpirationInput",
  PostLoginSetSessionExpirationInput
);
var PostLoginValidationErrorInputCodec = /* @__PURE__ */ createCodec2(
  "PostLoginValidationErrorInput",
  "PostLoginValidationErrorInput",
  PostLoginValidationErrorInput
);
var PreUserRegistrationSetUserIdInputCodec = /* @__PURE__ */ createCodec2(
  "PreUserRegistrationSetUserIdInput",
  "PreUserRegistrationSetUserIdInput",
  PreUserRegistrationSetUserIdInput
);
var PreUserRegistrationValidationErrorInputCodec = /* @__PURE__ */ createCodec2(
  "PreUserRegistrationValidationErrorInput",
  "PreUserRegistrationValidationErrorInput",
  PreUserRegistrationValidationErrorInput
);

// src/helpers/index.ts
init_typed_validator();

// src/helpers/accessToken.ts
var accessToken_exports = {};
__export(accessToken_exports, {
  MAX_SCOPE_COUNT_LIMIT: () => MAX_SCOPE_COUNT_LIMIT,
  MAX_SCOPE_COUNT_LOWER_LIMIT: () => MAX_SCOPE_COUNT_LOWER_LIMIT,
  MAX_SCOPE_LENGTH: () => MAX_SCOPE_LENGTH,
  addScope: () => addScope,
  assertValidModifyScopeRecord: () => assertValidModifyScopeRecord,
  assertValidScope: () => assertValidScope,
  modifyScope: () => modifyScope,
  removeScope: () => removeScope
});
var MAX_SCOPE_COUNT_LIMIT = 1e3;
var MAX_SCOPE_COUNT_LOWER_LIMIT = MAX_SCOPE_COUNT_LIMIT;
var MAX_SCOPE_LENGTH = 280;
function createModification(op, scope) {
  const modifications = /* @__PURE__ */ Object.create(null);
  modifications[scope] = op;
  return modifications;
}
var whitespaceRegex = new RegExp(/\s+/g);
function hasWhitespace(str) {
  return whitespaceRegex.test(str);
}
function assertValidScope(scope) {
  const length = scope.length;
  if (length === 0) {
    throw new Error("The value for the scope is required.");
  }
  if (length > MAX_SCOPE_LENGTH) {
    throw new Error(
      `The value for the scope exceeds the allowed maximum of ${MAX_SCOPE_LENGTH} characters.`
    );
  }
  if (hasWhitespace(scope)) {
    throw new Error("The value for the scope must not have whitespace.");
  }
}
function assertValidModifyScopeRecord(command) {
  try {
    ModifyScopeCodec.validate(command);
  } catch (_) {
    throw new Error("The value for the scope is of the wrong type or exceeds the size limit.");
  }
}
function modifyScope(newModifications, existingModifications) {
  const modifications = Object.assign(/* @__PURE__ */ Object.create(null), existingModifications, newModifications);
  const addCount = Object.values(modifications).filter((op) => op === "add").length;
  if (addCount > MAX_SCOPE_COUNT_LIMIT) {
    throw new Error(
      `The number of scopes exceeds the allowed maximum of ${MAX_SCOPE_COUNT_LIMIT}.`
    );
  }
  const command = {
    type: "ModifyScope",
    target: "accessToken",
    modifications
  };
  assertValidModifyScopeRecord(command);
  return command.modifications;
}
function addScope(scope) {
  if (typeof scope !== "string") {
    throw new TypeError("The value for the scope must be a string.");
  }
  const trimmedScope = scope.trim();
  assertValidScope(trimmedScope);
  const command = {
    type: "ModifyScope",
    target: "accessToken",
    modifications: createModification("add", trimmedScope)
  };
  assertValidModifyScopeRecord(command);
  return command;
}
function removeScope(scope) {
  if (typeof scope !== "string") {
    throw new TypeError("The value for the scope must be a string.");
  }
  const trimmedScope = scope.trim();
  assertValidScope(trimmedScope);
  const command = {
    type: "ModifyScope",
    target: "accessToken",
    modifications: createModification("remove", trimmedScope)
  };
  assertValidModifyScopeRecord(command);
  return command;
}

// src/helpers/customClaim.ts
var customClaim_exports = {};
__export(customClaim_exports, {
  RESERVED_CUSTOM_CLAIMS: () => RESERVED_CUSTOM_CLAIMS,
  assertSettableCustomClaim: () => assertSettableCustomClaim
});
var RESERVED_CUSTOM_CLAIMS = ["scope"];
function assertSettableCustomClaim(name) {
  if (RESERVED_CUSTOM_CLAIMS.includes(name)) {
    throw new Error(`The ${JSON.stringify(name)} claim cannot be set.`);
  }
}

// src/helpers/renderPrompt/constants.ts
var constants_exports = {};
__export(constants_exports, {
  MAX_RENDER_PROMPT_OPTIONS_BYTES: () => MAX_RENDER_PROMPT_OPTIONS_BYTES
});
var MAX_RENDER_PROMPT_OPTIONS_BYTES = 24 * 1024;

// src/helpers/samlResponse/constants.ts
var constants_exports2 = {};
__export(constants_exports2, {
  MAX_SAML_ATTRIBUTE_BYTES: () => MAX_SAML_ATTRIBUTE_BYTES,
  MAX_SAML_ATTRIBUTE_CHANGES: () => MAX_SAML_ATTRIBUTE_CHANGES,
  MAX_SAML_BYTES: () => MAX_SAML_BYTES,
  MAX_SAML_VALUE_BYTES: () => MAX_SAML_VALUE_BYTES
});
var MAX_SAML_ATTRIBUTE_CHANGES = 100;
var MAX_SAML_BYTES = 102400;
var MAX_SAML_ATTRIBUTE_BYTES = 1024;
var MAX_SAML_VALUE_BYTES = 2048;

// src/helpers/setPrimaryUser/constants.ts
var constants_exports3 = {};
__export(constants_exports3, {
  MAX_USER_ID_LENGTH: () => MAX_USER_ID_LENGTH
});
var MAX_USER_ID_LENGTH = 128;

// src/helpers/index.ts
function formatValidationError(error) {
  const messages = {};
  error.validatorErrors.forEach((e) => {
    if (e.message) {
      if (messages[e.instancePath]) {
        messages[e.instancePath] += `, ${e.message}`;
      } else {
        messages[e.instancePath] = `${e.instancePath.split("/").pop()} ${e.message}`;
      }
    }
  });
  return Object.values(messages).join("; ");
}
function validate(codec, data, errorPrefix) {
  try {
    const res = codec.validate(data);
    return res;
  } catch (e) {
    if (e instanceof ValidationError) {
      const prefix = errorPrefix ? `${errorPrefix}: ` : "";
      throw new Error(`${prefix}${formatValidationError(e)}`);
    }
    throw e;
  }
}
var helpers = {
  accessToken: accessToken_exports,
  customClaim: customClaim_exports,
  samlResponse: {
    ...constants_exports2,
    /** @deprecated use `validate` at the top level to handle Codecs error formatting */
    formatValidationError
  },
  setPrimaryUser: constants_exports3,
  renderPrompt: constants_exports
};

exports.CustomTokenExchangeDenyInputCodec = CustomTokenExchangeDenyInputCodec;
exports.CustomTokenExchangeRejectInvalidSubjectTokenInputCodec = CustomTokenExchangeRejectInvalidSubjectTokenInputCodec;
exports.CustomTokenExchangeSetMetadataInputCodec = CustomTokenExchangeSetMetadataInputCodec;
exports.CustomTokenExchangeSetOrganizationInputCodec = CustomTokenExchangeSetOrganizationInputCodec;
exports.CustomTokenExchangeSetUserByConnectionInputCodec = CustomTokenExchangeSetUserByConnectionInputCodec;
exports.CustomTokenExchangeSetUserByIdInputCodec = CustomTokenExchangeSetUserByIdInputCodec;
exports.MAX_RENDER_PROMPT_OPTIONS_BYTES = MAX_RENDER_PROMPT_OPTIONS_BYTES;
exports.MAX_SAML_BYTES = MAX_SAML_BYTES;
exports.MAX_USER_ID_LENGTH = MAX_USER_ID_LENGTH;
exports.PasswordResetPostChallengeRenderPromptInputCodec = PasswordResetPostChallengeRenderPromptInputCodec;
exports.PostLoginRenderPromptInputCodec = PostLoginRenderPromptInputCodec;
exports.PostLoginRevokeRefreshTokenInputCodec = PostLoginRevokeRefreshTokenInputCodec;
exports.PostLoginRevokeSessionInputCodec = PostLoginRevokeSessionInputCodec;
exports.PostLoginSetCookieModeInputCodec = PostLoginSetCookieModeInputCodec;
exports.PostLoginSetRefreshTokenExpirationInputCodec = PostLoginSetRefreshTokenExpirationInputCodec;
exports.PostLoginSetSAMLAttributeInputCodec = PostLoginSetSAMLAttributeInputCodec;
exports.PostLoginSetSAMLConfigurationInputCodec = PostLoginSetSAMLConfigurationInputCodec;
exports.PostLoginSetSessionExpirationInputCodec = PostLoginSetSessionExpirationInputCodec;
exports.PostLoginValidationErrorInputCodec = PostLoginValidationErrorInputCodec;
exports.PreUserRegistrationSetUserIdInputCodec = PreUserRegistrationSetUserIdInputCodec;
exports.PreUserRegistrationValidationErrorInputCodec = PreUserRegistrationValidationErrorInputCodec;
exports.helpers = helpers;
exports.validate = validate;

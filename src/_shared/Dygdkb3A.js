'use strict';

/**
 * Determines whether the given value is a non-null object and not an array.
 *
 * This function is useful for validating that a value is a plain object
 * (e.g., `{}` or `{ key: value }`) and not `null`, an array, or any other type.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a non-null object and not an array, otherwise `false`.
 */
function isObject(value) {
    return value != null && typeof value === "object" && Array.isArray(value) === false;
}

/**
 * Creates a no-op {@link TransactionMetadataAPI} for use in mock API implementations.
 */
function createNoopTransactionMetadataAPI() {
    return {
        setMetadata() { },
        getMetadata() {
            return {};
        },
    };
}

exports.createNoopTransactionMetadataAPI = createNoopTransactionMetadataAPI;
exports.isObject = isObject;

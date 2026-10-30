'use strict';

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

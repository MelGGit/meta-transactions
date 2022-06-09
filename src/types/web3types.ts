export type ForwardRequestType = {
    from: string,
    to: string,
    value: number,
    gas: number,
    nonce: string,
    data: string
}

export type TypedDataType = {
    types: {
        EIP712Domain: {
            name: string;
            type: string;
        }[];
        ForwardRequest: {
            name: string;
            type: string;
        }[];
    };
    domain: {
        name: string;
        version: string;
        chainId: number;
        verifyingContract: string;
    };
    primaryType: string;
}

export type FullTypedDataType = {
    message: ForwardRequestType,
    types: {
        EIP712Domain: {
            name: string;
            type: string;
        }[];
        ForwardRequest: {
            name: string;
            type: string;
        }[];
    };
    domain: {
        name: string;
        version: string;
        chainId: number;
        verifyingContract: string;
    };
    primaryType: string;
}
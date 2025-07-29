import type { AuthenticationResponseJSON, GenerateAuthenticationOptionsOpts, GenerateRegistrationOptionsOpts, PublicKeyCredentialCreationOptionsJSON, PublicKeyCredentialRequestOptionsJSON, RegistrationResponseJSON, VerifiedRegistrationResponse } from "@simplewebauthn/server";
import type { Account, Address, Chain, Client, Hash, Hex, TransactionReceipt, Transport } from "viem";
export type GeneratePasskeyRegistrationOptionsArgs = Partial<GenerateRegistrationOptionsOpts> & {
    userName: string;
    userDisplayName: string;
};
export type GeneratePasskeyRegistrationOptionsReturnType = PublicKeyCredentialCreationOptionsJSON;
export declare const generatePasskeyRegistrationOptions: (args: GeneratePasskeyRegistrationOptionsArgs) => Promise<GeneratePasskeyRegistrationOptionsReturnType>;
export type GeneratePasskeyAuthenticationOptionsArgs = Partial<GenerateAuthenticationOptionsOpts>;
export type GeneratePasskeyAuthenticationOptionsReturnType = PublicKeyCredentialRequestOptionsJSON;
export declare const generatePasskeyAuthenticationOptions: (args: GeneratePasskeyAuthenticationOptionsArgs) => Promise<GeneratePasskeyAuthenticationOptionsReturnType>;
export type RegisterNewPasskeyArgs = ({
    passkeyRegistrationOptions: PublicKeyCredentialCreationOptionsJSON;
} | GeneratePasskeyRegistrationOptionsArgs) & {
    origin?: string;
};
export type RegisterNewPasskeyReturnType = {
    passkeyRegistrationOptions: PublicKeyCredentialCreationOptionsJSON;
    passkeyRegistrationResponse: RegistrationResponseJSON;
    verificationResponse: VerifiedRegistrationResponse;
    credentialPublicKey: Uint8Array;
    credentialId: string;
};
export declare const registerNewPasskey: (args: RegisterNewPasskeyArgs) => Promise<RegisterNewPasskeyReturnType>;
export type RequestPasskeyAuthenticationArgs = {
    challenge: Hash;
    credentialPublicKey: Uint8Array;
    rpID?: string;
    origin?: string;
};
export type RequestPasskeyAuthenticationReturnType = {
    passkeyAuthenticationResponse: AuthenticationResponseJSON;
    passkeyAuthenticationOptions: PublicKeyCredentialRequestOptionsJSON;
};
export declare const requestPasskeyAuthentication: (args: RequestPasskeyAuthenticationArgs) => Promise<RequestPasskeyAuthenticationReturnType>;
export type AddAccountOwnerPasskeyArgs = {
    credentialId: string;
    rawPublicKey: readonly [Hex, Hex];
    origin: string;
    contracts: {
        passkey: Address;
    };
    paymaster?: {
        address: Address;
        paymasterInput?: Hex;
    };
    onTransactionSent?: (hash: Hash) => void;
};
export type AddAccountOwnerPasskeyReturnType = {
    transactionReceipt: TransactionReceipt;
};
export declare const addAccountOwnerPasskey: <transport extends Transport, chain extends Chain, account extends Account>(client: Client<transport, chain, account>, args: AddAccountOwnerPasskeyArgs) => Promise<AddAccountOwnerPasskeyReturnType>;
//# sourceMappingURL=passkey.d.ts.map
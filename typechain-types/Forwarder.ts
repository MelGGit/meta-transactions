/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "./common";

export declare namespace Forwarder {
  export type ForwardRequestStruct = {
    from: string;
    to: string;
    value: BigNumberish;
    gas: BigNumberish;
    nonce: BigNumberish;
    data: BytesLike;
  };

  export type ForwardRequestStructOutput = [
    string,
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    string
  ] & {
    from: string;
    to: string;
    value: BigNumber;
    gas: BigNumber;
    nonce: BigNumber;
    data: string;
  };
}

export interface ForwarderInterface extends utils.Interface {
  functions: {
    "executeDelegate((address,address,uint256,uint256,uint256,bytes))": FunctionFragment;
    "getNonce(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "executeDelegate" | "getNonce"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "executeDelegate",
    values: [Forwarder.ForwardRequestStruct]
  ): string;
  encodeFunctionData(functionFragment: "getNonce", values: [string]): string;

  decodeFunctionResult(
    functionFragment: "executeDelegate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getNonce", data: BytesLike): Result;

  events: {};
}

export interface Forwarder extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ForwarderInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    executeDelegate(
      request: Forwarder.ForwardRequestStruct,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getNonce(from: string, overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  executeDelegate(
    request: Forwarder.ForwardRequestStruct,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getNonce(from: string, overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    executeDelegate(
      request: Forwarder.ForwardRequestStruct,
      overrides?: CallOverrides
    ): Promise<[boolean, string]>;

    getNonce(from: string, overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    executeDelegate(
      request: Forwarder.ForwardRequestStruct,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getNonce(from: string, overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    executeDelegate(
      request: Forwarder.ForwardRequestStruct,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getNonce(
      from: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
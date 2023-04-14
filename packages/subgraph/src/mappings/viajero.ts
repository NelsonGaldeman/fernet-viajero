import { BigInt } from "@graphprotocol/graph-ts"
import { ERC721, Transfer } from '../../generated/Viajero/ERC721';
import { Current, Previous } from '../../generated/schema';

export const VIAJERO_TOKEN_ID = BigInt.fromString('21260');
export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';

export function handleTransfer(event: Transfer): void {
  // Solo nos interesa trackear las transferencias del viajero
  if (event.params.tokenId.toHexString() != VIAJERO_TOKEN_ID.toHexString()) {
    return;
  }

  if (event.params.from.toHexString() === ADDRESS_ZERO) {
    return;
  }

  let current = Current.load('1');
  if (current === null) {
    current = new Current('1');
    current.block = BigInt.fromString('41495857'); //nft minting block timestamp
    current.timestamp = BigInt.fromString('1660491043');
  }

  let previous = new Previous(event.block.number.toHexString());
  previous.address = event.params.from;
  previous.block = current.block;
  previous.timestamp = current.timestamp;
  previous.tiempo = event.block.timestamp.minus(current.timestamp);
  previous.save();

  current.address = event.params.to;
  current.block = event.block.number;
  current.timestamp = event.block.timestamp;
  current.save();
}

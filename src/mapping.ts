import { BigInt } from "@graphprotocol/graph-ts"
import {
  Contract,
  Burn,
  OwnershipTransferred,
  Approval,
  Transfer
} from "../generated/Contract/Contract"
import { Burn, OwnershipTransferred, Approval, Transfer } from "../generated/schema"

export function handleBurn(event: Burn): void {
  let entity = Burn.load(event.transaction.from.toHex())   // Entities can be loaded from the store using a string ID; this ID needs to be unique across all entities of the same type. Entities only exist after they have been saved to the store;`null` checks allow to create entities on demand
  if (entity == null) {
    entity = new Burn(event.transaction.from.toHex())
    entity.count = BigInt.fromI32(0)
  }
  entity.count = entity.count + BigInt.fromI32(1)
  entity._burner = event.params._burner
  entity._value = event.params._value
  entity.save()

  let contract = Contract.bind(event.address)   // It is also possible to access smart contracts from mappings
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.name(...)
  // - contract.approve(...)
  // - contract.totalSupply(...)
  // - contract.transferFrom(...)
  // - contract.decimals(...)
  // - contract.burn(...)
  // - contract.tokenSaleContract(...)
  // - contract.decreaseApproval(...)
  // - contract.earlyInvestorWallet(...)
  // - contract.balanceOf(...)
  // - contract.burnFrom(...)
  // - contract.owner(...)
  // - contract.symbol(...)
  // - contract.transfer(...)
  // - contract.increaseApproval(...)
  // - contract.allowance(...)
  // - contract.transferableStartTime(...)
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleApproval(event: Approval): void {}

export function handleTransfer(event: Transfer): void {}

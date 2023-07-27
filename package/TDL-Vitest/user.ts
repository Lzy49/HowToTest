export function createItem() {
  return {
    money: 1098
  }
}
export function fetchGetItem(){
  return Promise.resolve({
    money: 1098
  })
}
export const PACKAGE_NAME = 'package name'
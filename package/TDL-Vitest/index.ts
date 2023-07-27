import axios from 'axios'
export function add100Money(item: {
  money: number
}) {
  item.money += 100
  return item
}
export async function fetchData() {
  const user: { name: string } = await axios('/user/1')
  return user
}
// 9000 => £9,000
export function formatNumber(number: number){
    return `£${number.toLocaleString("en-US")}`
}
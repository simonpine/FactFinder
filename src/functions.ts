const APIKEYS = ['d24d9ff12aaa4278b27b7e6f124bfcd0', "e5e25533dc4a44a1892c328e48116039"]

// export async function CallNewsEvery(category: string, contry: string, q: string, sort: string, page: number): Promise<any> {
//   let response: any = await fetch(`https://newsapi.org/v2/everything?language=en${sort !== '' ? `&sortBy=${sort}` : ''}${category !== '' ? `&category=${category}` : ''}${contry !== '' ? `&country=${contry}` : ''}${q !== '' ? `&q=${q}` : ''}&pageSize=6&page=${page}&apiKey=55335ba3d74c46ad8accdef4c2ecff2f`)
//   response = response.json()
//   return response
// }

// export async function CallNewsHead(category: string, contry: string, q: string, page: number): Promise<any> {
//   let response: any = await fetch(`https://api.worldnewsapi.com/search-news?language=en&number=8${category !== '' ? `&category=${category}` : ''}&source-countries=us${q !== '' ? `&q=${q}` : ''}&offset=${page}&api-key=d24d9ff12aaa4278b27b7e6f124bfcd0`)
//   response = response.json()
//   return response
// }

export async function CallNewsHead(category: string, contry: string, q: string, page: number): Promise<any> {
  let response: any = await fetch(`https://newsdata.io/api/1/news?apikey=pub_4288112d5095792ac7431b6fce61553e0dd2c&q=Elon&size=8`)
  response = response.json()
  return response
}

const APIKEYS = ['6e4f06acb98c47fcbbf69878df0b3e7f', "55335ba3d74c46ad8accdef4c2ecff2f"]

// export async function CallNewsEvery(category: string, contry: string, q: string, sort: string, page: number): Promise<any> {
//   let response: any = await fetch(`https://newsapi.org/v2/everything?language=en${sort !== '' ? `&sortBy=${sort}` : ''}${category !== '' ? `&category=${category}` : ''}${contry !== '' ? `&country=${contry}` : ''}${q !== '' ? `&q=${q}` : ''}&pageSize=6&page=${page}&apiKey=55335ba3d74c46ad8accdef4c2ecff2f`)
//   response = response.json()
//   return response
// }

export async function CallNewsHead(category: string, contry: string, q: string, page: number): Promise<any> {
  let response: any = await fetch(`https://api.worldnewsapi.com/search-news?language=en&number=8${category !== '' ? `&category=${category}` : ''}&source-countries=us${q !== '' ? `&q=${q}` : ''}&offset=${page}&api-key=e5e25533dc4a44a1892c328e48116039`)
  response = response.json()
  return response
}

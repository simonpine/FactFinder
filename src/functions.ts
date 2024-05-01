const APIKEYSGetNews = ['pub_432702d684fc4c68d2be2b1018252854d0c31', 'pub_43273d2f1395605844a36d85b82a9d63c94b8']
const APIKEYSGetContent = ['d24d9ff12aaa4278b27b7e6f124bfcd0', "e5e25533dc4a44a1892c328e48116039", "e6daa1051c2e4769ad1e7d3b9a119573", "3c9ec38d0f634d45aa610853b107b4aa", "106d839a736042a68ae8472ba1458b7e", "a644610ecfe14a82ba1fc0d6b19ba98c", "ab8b2c3bd0b94fa6986b6f060b30a2ba"]


export async function CallNewsHead(category: string, contry: string, q: string, prioritydomain: string, page: number): Promise<any> {
  let response: any = await fetch(`https://newsdata.io/api/1/news?apikey=pub_432702d684fc4c68d2be2b1018252854d0c31&size=6&language=en${category !== '' ? `&category=${category}` : ''}${q !== '' ? `&q=${q}` : ''}${contry !== '' ? `&country=${contry}` : ''}${page !== 1 ? `&page=${page}` : ''}${prioritydomain !== '' ? `&prioritydomain=${prioritydomain}` : ''}`)
  response = await response.json()
  await Promise.all(
    response.results.map(async (not:any) => {
      const second = await fetch(`https://api.worldnewsapi.com/extract-news?analyze=true&url=${not.link}&api-key=ebe19b8eb19d4281b14bfe28dd749191`)
      const AfterJson = await second.json()
      not.content = await AfterJson.text
      not.polarization = await AfterJson.sentiment
      not.falsity = await 0.84
      return await not
    })
  )
  console.log(response);
  return response
}

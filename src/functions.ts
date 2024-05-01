const APIKEYS = ['6e4f06acb98c47fcbbf69878df0b3e7f', "55335ba3d74c46ad8accdef4c2ecff2f"]

function extractNewsContent(html: string): string {
  const doc: Document = new DOMParser().parseFromString(html, 'text/html');
  const paragraphs: NodeListOf<HTMLParagraphElement> = doc.querySelectorAll('p');
  let newsContent: string = '';
  paragraphs.forEach(p => {
    newsContent += p.textContent + '\n';
  });
  return newsContent;
}

export async function fetchHTML(url: string): Promise<string> {
  const response: Response = await fetch(url);
  const html: string = await response.text();
  const res: string = await extractNewsContent(html)
  return res;
}

export async function CallNewsEvery(category: string, contry: string, q: string, sort: string, page: number): Promise<any> {
  let response: any = await fetch(`https://newsapi.org/v2/everything?language=en${sort !== '' ? `&sortBy=${sort}` : ''}${category !== '' ? `&category=${category}` : ''}${contry !== '' ? `&country=${contry}` : ''}${q !== '' ? `&q=${q}` : ''}&pageSize=6&page=${page}&apiKey=55335ba3d74c46ad8accdef4c2ecff2f`)
  response = response.json()
  return response
}

export async function CallNewsHead(category: string, contry: string, q: string, page: number): Promise<any> {
  let response: any = await fetch(`https://gnews.io/api/v4/top-headlines?lang=en&max=8${category !== '' ? `&category=${category}` : ''}${contry !== '' ? `&country=${contry}` : ''}${q !== '' ? `&q=${q}` : ''}&page=${page}&apikey=a00993cb0cd907c55d2754c227d49d94`)
  response = response.json()
  return response
}

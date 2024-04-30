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

export async function CallNews(category: string, contry: string, q: string, sort: string, page: number): Promise<any> {
  let response: any = await fetch(`https://newsapi.org/v2/top-headlines?language=en${sort !== '' ? `&sortBy=${sort}` : ''}${category !== '' ? `&category=${category}` : ''}${contry !== '' ? `&country=${contry}` : ''}${q !== '' ? `&q=${q}` : ''}&pageSize=6&page=${page}&apiKey=3cc245d0fa86416cad709ae58f842278`)
  response = response.json()
  return response
}
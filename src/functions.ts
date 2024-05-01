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

async function fetchHTMLWithProxy(url: string): Promise<string> {
  const proxyUrl = url;
  const response = await fetch(proxyUrl);
  const html = await response.text();
  return html;
}

export async function fetchAndExtractNewsContent(url: string): Promise<string> {
  try {
    const html = await fetchHTMLWithProxy(url);
    const newsContent = extractNewsContent(html);
    return newsContent;
  } catch (error) {
    console.error('Error fetching HTML content:', error);
    return ''; // Return empty string in case of error
  }
}

export async function CallNewsEvery(category: string, contry: string, q: string, sort: string, page: number): Promise<any> {
  let response: any = await fetch(`https://newsapi.org/v2/everything?language=en${sort !== '' ? `&sortBy=${sort}` : ''}${category !== '' ? `&category=${category}` : ''}${contry !== '' ? `&country=${contry}` : ''}${q !== '' ? `&q=${q}` : ''}&pageSize=6&page=${page}&apiKey=55335ba3d74c46ad8accdef4c2ecff2f`)
  response = response.json()
  return response
}

export async function CallNewsHead(category: string, contry: string, q: string, page: number): Promise<any> {
  let response: any = await fetch(`https://newsapi.org/v2/top-headlines?language=en&pageSize=8${category !== '' ? `&category=${category}` : ''}${contry !== '' ? `&country=${contry}` : ''}${q !== '' ? `&q=${q}` : ''}&page=${page}&apiKey=6e4f06acb98c47fcbbf69878df0b3e7f`)
  response = response.json()
  return response
}

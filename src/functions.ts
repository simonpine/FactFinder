function extractNewsContent(html: string): string {
    const doc: Document = new DOMParser().parseFromString(html, 'text/html');
    const paragraphs: NodeListOf<HTMLParagraphElement> = doc.querySelectorAll('p');
    let newsContent: string = '';
    paragraphs.forEach(p => {
      newsContent += p.textContent + '\n';
    });
    return newsContent;
  }
  
  export async function fetchHTML(url: string):  Promise<string> {
    const response: Response = await fetch(url);
    const html: string = await response.text();
    const res: string = await extractNewsContent(html)
    return res;
  }

import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from './fireBaseCom'
import { removeStopwords } from 'stopword'

const itemsColection = doc(db, 'ApiKeys', 'APIKEYSGetContent')
const itemsColection2 = doc(db, 'ApiKeys', 'APIKEYSGetNews')

async function ChangeKey1(TheDoc: any, array: Array<string | undefined>) {
  const a = await [...array]
  const b: string | undefined = a.shift()
  a.push(b)
  await updateDoc(TheDoc, { All: a })
}

export async function CallNewsHead(category: string, contry: string, q: string, prioritydomain: string, page: number): Promise<any> {
  let ListKeys1 = await getDoc(itemsColection2).then((snap) => {
    if (snap.exists()) {
      return snap.data().All
    }
  })
  let response: any = await fetch(`https://newsdata.io/api/1/news?apikey=${ListKeys1[0]}&size=5&language=en${category !== '' ? `&category=${category}` : ''}${q !== '' ? `&q=${q}` : ''}${contry !== '' ? `&country=${contry}` : ''}${page !== 1 ? `&page=${page}` : ''}${prioritydomain !== '' ? `&prioritydomain=${prioritydomain}` : ''}`)
  response = await response.json()
  if (response.status === 'error') {
    await ChangeKey1(itemsColection2, ListKeys1)
    return await CallNewsHead(category, contry, q, prioritydomain, page)
  }
  let ListKeys2 = await getDoc(itemsColection).then((snap) => {
    if (snap.exists()) {
      return snap.data().All
    }
  })


  let ERROR = undefined


  await Promise.all(
    response.results.map(async (not: any) => {


      if (ListKeys2[0] === "TEST") {

        if (!!not.description) {
          const responseIA = await fetch('https://fact-finder-api.onrender.com/predict', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              title: (removeStopwords(not.title.toLowerCase().split(' '))).join(' '),
              text: (removeStopwords(not.description.toLowerCase().split(' '))).join(' ')
            })
          })
          const afertJson = await responseIA.json()
          not.falsity = await afertJson.FakePosibility
          not.polarization = await 1 - afertJson.Polarity.neu
        }
        else {
          not.polarization = await Math.round(Math.random() * 100) / 100
          not.falsity = await Math.round(Math.random() * 100) / 100
        }

        not.content = not.description
        return await not
      }
      const second = await fetch(`https://api.worldnewsapi.com/extract-news?analyze=true&url=${not.link}&api-key=${ListKeys2[0]}`)
      const AfterJson = await second.json()
      if (AfterJson.status === "failure" && AfterJson.code === 402) {
        await ChangeKey1(itemsColection, ListKeys2)
        not.content = await not.description
        not.polarization = await Math.round(Math.random() * 100) / 100
        not.falsity = await Math.round(Math.random() * 100) / 100
      }
      else {
        if (AfterJson.text.includes('ERROR')) {
          not.content = await not.description
        }
        else {
          not.content = await AfterJson.text
        }
        const responseIA = await fetch('https://fact-finder-api.onrender.com/predict', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: (removeStopwords(not.title.toLowerCase().split(' '))).join(' '),
            text: (removeStopwords(not.content.toLowerCase().split(' '))).join(' ')
          })
        });

        const afertJson = await responseIA.json()
        not.polarization = await AfterJson.sentiment ? (Math.round(AfterJson.sentiment * 100) / 100) : 1 - afertJson.Polarity.neu
        not.falsity = await afertJson.FakePosibility
      }
      return await not

    })
  ).catch(() => {
    ERROR = 'Cannot load the news content'
  })
  return { result: response, error: ERROR }
}

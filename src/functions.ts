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

  let ERROR: undefined | string = undefined

  let ListKeys1 = await getDoc(itemsColection2).then((snap) => {
    if (snap.exists()) {
      return snap.data().All
    }
  }).catch(() => {
    ERROR = 'Error to get the keys'
  })
  const response: any = await fetch(`https://newsdata.io/api/1/news?apikey=${ListKeys1[0]}&size=9&language=en${category !== '' ? `&category=${category}` : ''}${q !== '' ? `&q=${q}` : ''}${contry !== '' ? `&country=${contry}` : ''}${page !== 1 ? `&page=${page}` : ''}${prioritydomain !== '' ? `&prioritydomain=${prioritydomain}` : ''}`).then((response) => response.json()).catch(() => {
    ERROR = 'Error to get the news'
    return { status: 'error', totalResults: 0, nextPage: '', results: [] }
  })

  if (response.status === 'error' || !!ERROR) {
    await ChangeKey1(itemsColection2, ListKeys1)
    return await { result: response, error: ERROR }
  }

  let ListKeys2 = await getDoc(itemsColection).then((snap) => {
    if (snap.exists()) {
      return snap.data().All
    }
  }).catch(() => [])

  await Promise.all(
    response.results.map(async (not: any) => {


      const AfterJson = await fetch(`https://api.worldnewsapi.com/extract-news?analyze=true&url=${not.link}&api-key=${ListKeys2[0]}`).then(res => res.json()).catch(() => { 
        ERROR = 'Cannot acces to the content API'; 
        return undefined 
      })
      if (AfterJson.status === 'failure' || AfterJson === undefined) {
        if (not.description !== '' && not.description !== 'ONLY AVAILABLE IN PAID PLANS' && typeof not.title === 'string' && typeof not.description === 'string' ) {
          const responseIA = await fetch('https://fact-finder-api.onrender.com/predict', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              title: (removeStopwords(not.title.toLowerCase().split(' '))).join(' '),
              text: (removeStopwords(not.description.toLowerCase().split(' '))).join(' ')
            })
          }).then(res => res.json()).catch(() => {
            ERROR = 'Cannot acces to the IA model'
            return undefined
          })
          if (responseIA !== undefined) {
            not.falsity = await responseIA.FakePosibility
            not.polarization = await 1 - responseIA.Polarity.neu
          }
          else {
            not.falsity = NaN
            not.polarization = NaN
          }
        }
        else {
          ERROR = 'Cannot get the news full content'
          not.polarization = NaN
          not.falsity = NaN
        }
        not.content = not.description
        return await not
      }
      return not
      // if (AfterJson.status === "failure" && AfterJson.code === 402) {
      //   await ChangeKey1(itemsColection, ListKeys2)
      //   not.content = await not.description
      //   not.polarization = await Math.round(Math.random() * 100) / 100
      //   not.falsity = await Math.round(Math.random() * 100) / 100
      // }
      // else {
      //   if (AfterJson.text.includes('ERROR')) {
      //     not.content = await not.description
      //   }
      //   else {
      //     not.content = await AfterJson.text
      //   }
      //   const responseIA = await fetch('https://fact-finder-api.onrender.com/predict', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify({
      //       title: (removeStopwords(not.title?.toLowerCase().split(' '))).join(' '),
      //       text: (removeStopwords(not.description?.toLowerCase().split(' '))).join(' ')
      //     })
      //   }).then(res => res.json()).catch(() => {
      //     ERROR = 'Cannot acces to the IA model'
      //     return undefined
      //   })
      //   if (responseIA) {
      //     not.polarization = await  1 - responseIA.Polarity.neu
      //     not.falsity = await responseIA.FakePosibility
      //   }
      //   else{
      //     not.polarization = NaN
      //     not.falsity = NaN
      //   }
      // }
      // return await not
    })
  )
  return { result: response, error: ERROR }
}

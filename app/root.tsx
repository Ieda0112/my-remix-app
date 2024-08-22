import type {
  LinksFunction,
  LoaderFunctionArgs,
} from "@remix-run/node";
import{json, redirect} from "@remix-run/node"
import {
  Form,
  Link,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import appStylesHref from "./app.css?url";
import { createEmptyContact, getContacts } from "./data";
import{ useEffect,useState } from "react";


export const action = async () => {
  const contact = await createEmptyContact();
  return redirect(`/contacts/${contact.id}/edit`);
};
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];

export async function fetchRecently(){ //直近10件の投稿を得る
  try {
    const response = await fetch('http://127.0.0.1:5000/api/recently');
    if (!response.ok) {
      throw new Error('ネットワークエラー: ' + response.status);
    }
    const posts = await response.json();
    return posts;

  } catch (error) {
    console.error('Error', error); // エラーが発生した場合の処理
  }
}

export const DateSubmit = async (date:string) => {
  const url = 'http://127.0.0.1:5000/api/daily'; // 送信先のAPI URL
  const post = {
    "date":date
  }
  try {
    const response = await fetch(
      url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(post), // JavaScriptオブジェクトをJSON文字列に変換して送信
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseData = await response.json(); // APIからのレスポンスをJSON形式で取得
    console.log('Response from server:', responseData);

  } catch (error) {
    console.error('Error:', error);
  }
}

export default function App() {
  const [recentlyPosts, setRecentlyPosts] = useState<any[]>([]); // デフォルトを空配列に
  useEffect(() => {
    const fetchData = async () => {
      const posts = await fetchRecently(); // fetchRecently を呼び出し
      if (posts) {
        setRecentlyPosts(posts); // データを状態にセット
      }
    };

    fetchData(); // データをフェッチする
  }, []); // 空の依存配列で初回レンダリング時にのみ実行
  
  const [date, setDate] = useState("2002-01-12");

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div id="detail">
          <Outlet />
        </div>
        <div>
          <h1>Recent Posts</h1>
          <ul>
            {/* fetchでpromiseになっている状態ではmap関数が使えなくてエラー */}
            {recentlyPosts.map((post) => (
              <li key={post.id}>
                <p>Name: {post.name} / Genre: {post.genre} / Rating: {post.rating}</p>
              </li>
            ))}
          </ul>
        </div>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
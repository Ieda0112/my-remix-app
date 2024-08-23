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

export default function App() {
  const [recentlyPosts, setRecentlyPosts] = useState<any[]>([]); // デフォルトを空配列に
  useEffect(() => {
    const fetchData = async () => {
      const posts = await fetchRecently(); // fetchRecently を呼び出し
      if (posts) {
        setRecentlyPosts(posts.recently_data);
      }
    };

    fetchData(); // データをフェッチする
  }, []); // 空の依存配列で初回レンダリング時にのみ実行

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
          <h1 style={{color:"orange"}}>外食記録アプリ　外食レポ</h1>
          <Outlet />
        </div>
        <div id = "recent" style={{width : "25%"}}>
          <h1>Recent Posts</h1>
          <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)"}}>
            <h2>Name</h2> <h2>Genre</h2>  <h2>Rating</h2>
          </div>
          {recentlyPosts.map((post) => (
            <div key={post.id} style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)"}}>
              <h4>{post.name}</h4>
              <h4>{post.genre}</h4>
              <h4>
                {Array.from({ length: post.rating }, (_, index) => (
                  <span key={index}> ⭐️</span>
                ))}
              </h4>
            </div>
          ))}
        </div>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
import { json } from "@remix-run/node";
import type {
    LoaderFunctionArgs,
} from "@remix-run/node";
import { NextApiRequest, NextApiResponse } from 'next';
import { PokemonClient } from 'pokenode-ts';

export const pokedata= async({//API先からデータをロードしてくる
    request,
  }: LoaderFunctionArgs) => {
    const pokeList = []
    for(let i=1;i<=151;i++){
        const p = await fetchPoke(String(i))
        if (p) {
            pokeList.push(p);
        }
    }
    
    return pokeList;
}

export async function fetchPoke(i: string) {//ポケモンのIDから名前と正面画像を取得する関数
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/'+i);
      if (!response.ok) {
        throw new Error('ネットワークエラー: ' + response.status);
      }
      const data = await response.json();
      console.log("No."+data.id+" : "+data.name);
      
      const sprites = data.sprites;//画像に関するデータ列
      const url_front=sprites.front_default;
      //console.log(url_front);//画像のURL
  
      const poke ={id:data.id, name:data.name, front:url_front};
      return poke;
  
    } catch (error) {
      console.error('問題が発生しました。', error); // エラーが発生した場合の処理
    }
}


export async function pokelist(req: NextApiRequest, res: NextApiResponse) {
  const api = new PokemonClient();
  const listPokemon = await api.listPokemons();
  res.status(200).json({
    data: listPokemon,
  });
}

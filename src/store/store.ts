import { type Writable, writable, get } from "svelte/store";

export const API_ENDPOINT:Writable<string> = writable("https://youtube.076.ne.jp")

// proxy to bypass cors-disabled invidious instances
export const useProxy:Writable<boolean> = writable(false)
// final host variable to change between proxy / non-proxy server
export const FINAL_HOST:Writable<string> = writable(get(API_ENDPOINT))
// dark theme boolean for toggle
export const IS_DARK_THEME:Writable<boolean> = writable(true)

const urlSntzr = (url:string) => { // input any link with path and search params
    return new URL(url).origin // output -> protocol://host:port
}

useProxy.subscribe((val)=>{
    if (val) FINAL_HOST.set("/proxy/"+urlSntzr(get(API_ENDPOINT)))
    else FINAL_HOST.set(urlSntzr(get(API_ENDPOINT)))
})

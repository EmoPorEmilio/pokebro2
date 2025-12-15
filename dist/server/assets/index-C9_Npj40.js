import { ssr, ssrHydrationKey, escape, createComponent } from "solid-js/web";
import { H as Header, C as Content, a as GAME_MODES } from "./constants-PeIAwcan.js";
import { u as useNavigate } from "./router-DXx_4i-b.js";
import "solid-js";
import "@tanstack/solid-query";
import "@tanstack/router-core";
import "@solid-primitives/refs";
import "../server.js";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "node:async_hooks";
import "h3-v2";
import "tiny-invariant";
import "seroval";
import "tiny-warning";
import "isbot";
var _tmpl$ = ["<div", ' class="flex flex-col w-[80vw] max-w-[350px] justify-center items-center gap-4"><button class="flex justify-center items-center rounded-lg min-h-[60px] w-full bg-cards-bg border-accent-200 border border-solid text-accent text-center font-bold text-xl hover:cursor-pointer hover:bg-accent hover:border-white hover:text-cards-bg transition-colors"><span>', '</span></button><button class="flex justify-center items-center rounded-lg min-h-[60px] w-full bg-cards-bg border-accent-200 border border-solid text-accent text-center font-bold text-xl hover:cursor-pointer hover:bg-accent hover:border-white hover:text-cards-bg transition-colors"><span>', "</span></button></div>"], _tmpl$2 = ["<div", ' class="flex flex-col h-[100dvh] w-[100dvw] bg-bg-400 antialiased"><!--$-->', "<!--/--><!--$-->", "<!--/--></div>"];
function Landing() {
  useNavigate();
  return ssr(_tmpl$2, ssrHydrationKey(), escape(createComponent(Header, {
    inGame: false
  })), escape(createComponent(Content, {
    get children() {
      return ssr(_tmpl$, ssrHydrationKey(), escape(GAME_MODES.POKEMON_GUESSER), escape(GAME_MODES.DAMAGE_CALCULATOR));
    }
  })));
}
export {
  Landing as component
};

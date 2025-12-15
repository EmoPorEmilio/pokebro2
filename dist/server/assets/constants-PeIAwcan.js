import { ssr, ssrHydrationKey, escape, createComponent, ssrAttribute } from "solid-js/web";
import { Show } from "solid-js";
var _tmpl$$1 = ["<main", ' class="flex flex-1 flex-col w-full bg-accent-500 animate-gradient-x rounded-xl py-0.5"><div class="flex flex-1 flex-col w-full bg-bg-100 rounded-xl justify-center items-center">', "</div></main>"];
function Content(props) {
  return ssr(_tmpl$$1, ssrHydrationKey(), escape(props.children));
}
var _tmpl$ = ["<div", "></div>"], _tmpl$2 = ["<nav", ' class="h-14 w-full"><div class="px-4 flex w-full mx-auto h-full items-center justify-between"><!--$-->', "<!--/--><!--$-->", "<!--/--></div></nav>"], _tmpl$3 = ["<img", ' src="/logo.svg" class="w-[41px] h-[41px]" alt="logo">'], _tmpl$4 = ["<button", ' class="flex items-center justify-center w-10 h-10 hover:cursor-pointer"><svg class="w-6 h-6 fill-accent hover:fill-primary-300 transition-colors" viewBox="0 0 24 24"><path d="M24 0v24H0V0h24z" fill="none" opacity=".87"></path><path d="M12.29 8.71L9.7 11.3c-.39.39-.39 1.02 0 1.41l2.59 2.59c.63.63 1.71.18 1.71-.71V9.41c0-.89-1.08-1.33-1.71-.7z"></path></svg></button>'], _tmpl$5 = ["<div", ' class="flex justify-center"><span class="block text-2xl text-accent-300"><span', ">", "</span><!--$-->", "<!--/--></span></div>"], _tmpl$6 = ["<div", ' class="flex items-center gap-3"><div class="flex items-center gap-1"><img alt="health" class="', '"', '><img alt="health" class="', '"', '><img alt="health" class="', '"', '></div><span class="text-accent-300 text-lg font-medium tabular-nums">', "</span></div>"];
function Header(props) {
  return ssr(_tmpl$2, ssrHydrationKey(), escape(createComponent(Show, {
    get when() {
      return !props.inGame;
    },
    get children() {
      return [createComponent(Logo, {}), ssr(_tmpl$, ssrHydrationKey())];
    }
  })), escape(createComponent(Show, {
    get when() {
      return props.inGame;
    },
    get children() {
      return [createComponent(BackButton, {
        get onClick() {
          return props.handleHeaderBack;
        }
      }), createComponent(ScoreDisplay, {
        get scorePoints() {
          return props.scorePoints;
        },
        get maxScore() {
          return props.maxScore;
        }
      }), createComponent(GameStats, {
        get HP() {
          return props.HP;
        },
        get timer() {
          return props.timer;
        }
      })];
    }
  })));
}
function Logo() {
  return ssr(_tmpl$3, ssrHydrationKey());
}
function BackButton(props) {
  return ssr(_tmpl$4, ssrHydrationKey());
}
function ScoreDisplay(props) {
  const scoreColor = () => {
    const current = parseInt(props.scorePoints ?? "0");
    const max = parseInt(props.maxScore ?? "1");
    if (max === 0) return "text-accent-300";
    const ratio = current / max;
    if (ratio < 0.3) return "text-danger-400";
    if (ratio < 0.7) return "text-warning-400";
    return "text-success-400";
  };
  return ssr(_tmpl$5, ssrHydrationKey(), ssrAttribute("class", escape(scoreColor(), true), false), escape(props.scorePoints) ?? "000", escape(createComponent(Show, {
    get when() {
      return props.maxScore;
    },
    get children() {
      return ["/", props.maxScore];
    }
  })));
}
function GameStats(props) {
  const heartIcon = "/resources/heart-icon.png";
  return ssr(_tmpl$6, ssrHydrationKey(), `w-5 h-5 ${(props.HP ?? 0) > 0 ? "" : "opacity-20"}`, ssrAttribute("src", escape(heartIcon, true), false), `w-5 h-5 ${(props.HP ?? 0) > 1 ? "" : "opacity-20"}`, ssrAttribute("src", escape(heartIcon, true), false), `w-5 h-5 ${(props.HP ?? 0) > 2 ? "" : "opacity-20"}`, ssrAttribute("src", escape(heartIcon, true), false), escape(props.timer));
}
const MAX_POKES = 898;
const SYSTEM_MESSAGES = {
  RETRY: "¿Reintentar?",
  SHARE: "Compartir"
};
const TYPE_EFFECTIVENESS_OPTION = {
  QUARTER_DAMAGE: "x1/4",
  HALF_DAMAGE: "x1/2",
  NO_DAMAGE: "x0",
  REGULAR_DAMAGE: "x1",
  DOUBLE_DAMAGE: "x2",
  QUADRUPLE_DAMAGE: "x4"
};
const GAME_STATES = {
  SELECT_DIFFICULTY: "selectDifficulty",
  LEVEL_SETUP: "setup",
  LEVEL_INFO: "info",
  VALIDATION: "validation",
  YOU_LOSE: "youLose"
};
const DIFFICULTY_LEVELS = {
  EASY: "FÁCIL",
  HARD: "DIFÍCIL"
};
const GAME_MODES = {
  DAMAGE_CALCULATOR: "¿CUÁNTO PEGA ESO?",
  POKEMON_GUESSER: "¿QUIÉN ES ESE POKÉMON?"
};
const TIMER_INITIAL_VALUE = 1e13;
const theme = {
  "accent-highlight": "#e2a2be",
  correct: "#83f1a7"
};
export {
  Content as C,
  DIFFICULTY_LEVELS as D,
  GAME_STATES as G,
  Header as H,
  MAX_POKES as M,
  SYSTEM_MESSAGES as S,
  TIMER_INITIAL_VALUE as T,
  GAME_MODES as a,
  TYPE_EFFECTIVENESS_OPTION as b,
  theme as t
};

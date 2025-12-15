import { ssr, ssrHydrationKey, escape, createComponent, ssrAttribute, ssrStyle } from "solid-js/web";
import { Show, createSignal, For, createEffect, onMount, onCleanup } from "solid-js";
import { createQuery } from "@tanstack/solid-query";
import { G as GAME_STATES, H as Header, C as Content, a as GAME_MODES, D as DIFFICULTY_LEVELS, T as TIMER_INITIAL_VALUE, M as MAX_POKES } from "./constants-PeIAwcan.js";
import { b as blobToBase64, c as correctCapitalLetter, r as randomizePokemonList, E as Error$1, Y as YouLose, g as generateRandomAvailablePokemonNumber, p as padScorePoints } from "./utils-BhZz8VJt.js";
import { u as useNavigate } from "./router-DXx_4i-b.js";
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
var _tmpl$$2 = ["<img", ' width="210" height="210" alt="pokemon sprite" class="object-contain">'], _tmpl$2$1 = ["<div", ' class="flex flex-col w-full py-10 px-10 justify-center items-center"><div class="flex flex-col w-full h-full items-center justify-center rounded-xl border border-primary-600 border-b-2 border-b-accent-500 bg-bg-300">', "</div></div>"], _tmpl$3$1 = ["<div", ' class="w-[210px] h-[210px] rounded-xl animate-pulse bg-bg-light"></div>'];
function Pokemon(props) {
  return ssr(_tmpl$2$1, ssrHydrationKey(), escape(createComponent(Show, {
    get when() {
      return !props.loading;
    },
    get fallback() {
      return ssr(_tmpl$3$1, ssrHydrationKey());
    },
    get children() {
      return createComponent(Show, {
        get when() {
          return props.pokemonSrc;
        },
        get children() {
          return ssr(_tmpl$$2, ssrHydrationKey() + ssrAttribute("src", escape(props.pokemonSrc, true), false));
        }
      });
    }
  })));
}
var _tmpl$$1 = ["<div", ' class="flex flex-col w-full h-full px-10 pb-10 justify-center items-center gap-3 relative"><!--$-->', "<!--/--><!--$-->", "<!--/--></div>"], _tmpl$2 = ["<div", ' class="', '"><span class="', '">', "</span></div>"], _tmpl$3 = ["<div", ' class="flex animate-pulse rounded-md w-full flex-1 bg-primary-700/50 border-b border-primary-600"></div>'], _tmpl$4 = ["<div", ' class="absolute left-12 top-4">', "</div>"], _tmpl$5 = ["<div", ' class="absolute left-8 top-12">', "</div>"], _tmpl$6 = ["<div", ' class="absolute left-4 top-20">', "</div>"], _tmpl$7 = ["<div", ' class="absolute right-12 top-4">', "</div>"], _tmpl$8 = ["<div", ' class="absolute right-8 top-12">', "</div>"], _tmpl$9 = ["<div", ' class="absolute right-4 top-20">', "</div>"], _tmpl$0 = ["<svg", ' class="w-[18px] h-[18px] animate-star-victory opacity-0" style="', '" viewBox="0 0 24 24" fill="#FFDD87"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>'];
function Options(props) {
  const [lastClickedOption, setLastClickedOption] = createSignal(null);
  const handleClick = (pokemon) => {
    if (!props.validation) {
      setLastClickedOption(pokemon.name);
      props.handleClickOption(pokemon);
    }
  };
  return ssr(_tmpl$$1, ssrHydrationKey(), escape(createComponent(Show, {
    get when() {
      return props.showVictory;
    },
    get children() {
      return createComponent(VictoryStars, {});
    }
  })), escape(createComponent(Show, {
    get when() {
      return props.pokemonNameOptions && !props.loading;
    },
    get fallback() {
      return [createComponent(OptionLoader, {}), createComponent(OptionLoader, {}), createComponent(OptionLoader, {}), createComponent(OptionLoader, {}), createComponent(OptionLoader, {})];
    },
    get children() {
      return createComponent(For, {
        get each() {
          return props.pokemonNameOptions;
        },
        children: (pokemon) => {
          const isCorrect = () => props.validation && pokemon.name === props.correctNameOption;
          const isIncorrect = () => props.validation && pokemon.name === lastClickedOption() && pokemon.name !== props.correctNameOption;
          return createComponent(Option, {
            get correct() {
              return isCorrect();
            },
            get incorrect() {
              return isIncorrect();
            },
            get validation() {
              return props.validation;
            },
            onClick: () => handleClick(pokemon),
            get children() {
              return pokemon.name;
            }
          });
        }
      });
    }
  })));
}
function Option(props) {
  const conditionalStyle = () => {
    if (props.correct) return "border-correct bg-correct/20";
    if (props.incorrect) return "border-incorrect bg-incorrect/20";
    if (!props.validation) return "hover:cursor-pointer hover:bg-primary-600 hover:border-primary-400";
    return "";
  };
  const textStyle = () => {
    if (props.correct) return "text-correct";
    if (props.incorrect) return "text-incorrect";
    return "text-primary-300";
  };
  return ssr(_tmpl$2, ssrHydrationKey(), `${escape(conditionalStyle(), true)} flex w-full flex-1 items-center justify-center rounded-md border-b border-primary-500 bg-primary-700 transition-colors`, `font-sen text-2xl ${escape(textStyle(), true)}`, escape(props.children));
}
function OptionLoader() {
  return ssr(_tmpl$3, ssrHydrationKey());
}
function VictoryStars() {
  return [ssr(_tmpl$4, ssrHydrationKey(), escape(createComponent(Star, {
    style: {
      "animation-delay": "0s"
    }
  }))), ssr(_tmpl$5, ssrHydrationKey(), escape(createComponent(Star, {
    style: {
      "animation-delay": "0.2s"
    }
  }))), ssr(_tmpl$6, ssrHydrationKey(), escape(createComponent(Star, {
    style: {
      "animation-delay": "0.4s"
    }
  }))), ssr(_tmpl$7, ssrHydrationKey(), escape(createComponent(Star, {
    style: {
      "animation-delay": "0.1s"
    }
  }))), ssr(_tmpl$8, ssrHydrationKey(), escape(createComponent(Star, {
    style: {
      "animation-delay": "0.3s"
    }
  }))), ssr(_tmpl$9, ssrHydrationKey(), escape(createComponent(Star, {
    style: {
      "animation-delay": "0.5s"
    }
  })))];
}
function Star(props) {
  return ssr(_tmpl$0, ssrHydrationKey(), ssrStyle(props.style));
}
const pokemonKeys = {
  all: ["pokemon"],
  info: (id) => [...pokemonKeys.all, "info", id],
  image: (id) => [...pokemonKeys.all, "image", id],
  batch: (ids) => [...pokemonKeys.all, "batch", ids.join(",")]
};
const POKEMON_API_BASE = "https://pokeapi.co/api/v2";
const POKEMON_SPRITE_BASE = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";
async function fetchPokemonInfoFn(pokemonNumber) {
  const res = await fetch(`${POKEMON_API_BASE}/pokemon-species/${pokemonNumber}`);
  if (!res.ok) throw new Error(`Failed to fetch pokemon ${pokemonNumber}`);
  const data = await res.json();
  return {
    number: pokemonNumber,
    name: correctCapitalLetter(data.name)
  };
}
async function fetchPokemonImageFn(pokemonNumber) {
  const res = await fetch(`${POKEMON_SPRITE_BASE}/${pokemonNumber}.png`);
  if (!res.ok) throw new Error(`Failed to fetch image for pokemon ${pokemonNumber}`);
  const blob = await res.blob();
  return blobToBase64(blob);
}
async function fetchMultiplePokemonInfoFn(pokemonNumbers) {
  const results = await Promise.all(
    pokemonNumbers.map(async (num) => {
      try {
        return await fetchPokemonInfoFn(num);
      } catch {
        return null;
      }
    })
  );
  return results.filter((p) => p !== null);
}
var _tmpl$ = ["<div", ' class="flex flex-col h-[100dvh] w-[100dvw] bg-bg-400 antialiased"><!--$-->', "<!--/--><!--$-->", "<!--/--></div>"];
function PokemonGuesser() {
  const navigate = useNavigate();
  const getStateFromStorage = () => {
    if (typeof window === "undefined") {
      return {
        availablePokes: [],
        scorePoints: "000",
        HP: 3,
        currentPokemon: null,
        currentPokemonSrc: null,
        pokemonNameOptions: [],
        level: 0,
        gameState: GAME_STATES.LEVEL_SETUP,
        timer: TIMER_INITIAL_VALUE
      };
    }
    return {
      availablePokes: JSON.parse(localStorage.getItem("availablePokes") ?? "[]"),
      scorePoints: localStorage.getItem("scorePoints") ?? "000",
      HP: parseInt(localStorage.getItem("HP") ?? "3"),
      currentPokemon: JSON.parse(localStorage.getItem("currentPokemon") ?? "null"),
      currentPokemonSrc: localStorage.getItem("currentPokemonSrc") ?? null,
      pokemonNameOptions: JSON.parse(localStorage.getItem("pokemonNameOptions") ?? "[]"),
      level: parseInt(localStorage.getItem("level") ?? "0"),
      gameState: localStorage.getItem("gameState") ?? GAME_STATES.LEVEL_SETUP,
      timer: parseInt(localStorage.getItem("timer") ?? String(TIMER_INITIAL_VALUE))
    };
  };
  const stateFromStorage = getStateFromStorage();
  const [timer, setTimer] = createSignal(stateFromStorage.timer);
  const [HP, setHP] = createSignal(stateFromStorage.HP);
  const [scorePoints, setScorePoints] = createSignal(stateFromStorage.scorePoints);
  const [level, setLevel] = createSignal(stateFromStorage.level);
  const [gameState, setGameState] = createSignal(stateFromStorage.gameState);
  const [errorMessage, setErrorMessage] = createSignal("");
  const [availablePokes, setAvailablePokes] = createSignal(stateFromStorage.availablePokes);
  const [currentPokemon, setCurrentPokemon] = createSignal(stateFromStorage.currentPokemon);
  const [currentPokemonSrc, setCurrentPokemonSrc] = createSignal(stateFromStorage.currentPokemonSrc);
  const [pokemonNameOptions, setPokemonNameOptions] = createSignal(stateFromStorage.pokemonNameOptions);
  const [currentLevelPokemonNumbers, setCurrentLevelPokemonNumbers] = createSignal([]);
  const [indexToRemove, setIndexToRemove] = createSignal(null);
  let timerCountdown = null;
  const pokemonInfoQuery = createQuery(() => ({
    queryKey: pokemonKeys.batch(currentLevelPokemonNumbers()),
    queryFn: () => fetchMultiplePokemonInfoFn(currentLevelPokemonNumbers()),
    staleTime: Infinity,
    gcTime: 1e3 * 60 * 60,
    enabled: currentLevelPokemonNumbers().length > 0 && gameState() === GAME_STATES.LEVEL_SETUP,
    retry: 3
  }));
  const pokemonImageQuery = createQuery(() => ({
    queryKey: pokemonKeys.image(currentLevelPokemonNumbers()[0] ?? 0),
    queryFn: () => fetchPokemonImageFn(currentLevelPokemonNumbers()[0]),
    staleTime: Infinity,
    gcTime: 1e3 * 60 * 60,
    enabled: currentLevelPokemonNumbers().length > 0 && gameState() === GAME_STATES.LEVEL_SETUP,
    retry: 3
  }));
  const handleHeaderBack = () => {
    navigate({
      to: "/"
    });
  };
  const handleAppTap = () => {
    if (gameState() === GAME_STATES.VALIDATION) {
      removePokemonsFromGameState();
      setGameState(GAME_STATES.LEVEL_SETUP);
      localStorage.setItem("gameState", GAME_STATES.LEVEL_SETUP);
    }
  };
  const handleClickOption = (pokemon) => {
    var _a;
    setLevel((prevLevel) => {
      const newLevel = prevLevel + 1;
      localStorage.setItem("level", String(newLevel));
      return newLevel;
    });
    if (((_a = currentPokemon()) == null ? void 0 : _a.name) === pokemon.name) {
      handleCorrectOption();
    } else {
      removeLevelInfoFromStorage();
      handleIncorrectOption();
    }
  };
  const handleCorrectOption = () => {
    removePokemonsFromGameState();
    setScorePoints((prevScorePoints) => {
      const newScorePoints = padScorePoints(parseInt(prevScorePoints) + 1);
      localStorage.setItem("scorePoints", newScorePoints);
      return newScorePoints;
    });
    setGameState(GAME_STATES.LEVEL_SETUP);
  };
  const loseGame = () => {
    if (timerCountdown) clearInterval(timerCountdown);
    setGameState(GAME_STATES.YOU_LOSE);
  };
  const handleIncorrectOption = () => {
    setHP((prevHP) => {
      const newHP = prevHP - 1;
      localStorage.setItem("HP", String(newHP));
      if (newHP === 0) {
        loseGame();
      } else {
        setGameState(GAME_STATES.VALIDATION);
      }
      return newHP;
    });
  };
  const restartGame = () => {
    setLevel(0);
    setHP(3);
    setTimer(TIMER_INITIAL_VALUE);
    startTimerCountdown();
    setScorePoints("000");
    setAvailablePokes([]);
    setCurrentLevelPokemonNumbers([]);
    setGameState(GAME_STATES.LEVEL_SETUP);
  };
  const initiateLevelFetch = (firstSetup) => {
    const availableNumbers = firstSetup ? getInitialAvailablePokes() : availablePokes();
    const {
      randomPokemonNumbers,
      indexToRemove: idx
    } = generateRandomAvailablePokemonNumber(availableNumbers, 5);
    setCurrentLevelPokemonNumbers(randomPokemonNumbers);
    setIndexToRemove(idx);
    if (firstSetup) {
      setAvailablePokes(availableNumbers);
    }
  };
  const saveGameStateToStorage = (newAvailableNumbers, pokemonToGuess, imgSrc, newPokemons) => {
    localStorage.setItem("availablePokes", JSON.stringify(newAvailableNumbers));
    localStorage.setItem("scorePoints", scorePoints());
    localStorage.setItem("HP", String(HP()));
    localStorage.setItem("currentPokemon", JSON.stringify(pokemonToGuess));
    localStorage.setItem("currentPokemonSrc", imgSrc);
    localStorage.setItem("pokemonNameOptions", JSON.stringify(newPokemons));
    localStorage.setItem("level", String(level()));
    localStorage.setItem("gameState", GAME_STATES.LEVEL_INFO);
  };
  const removePokemonsFromGameState = () => {
    setCurrentPokemon(null);
    setCurrentPokemonSrc(null);
    setPokemonNameOptions([]);
    setCurrentLevelPokemonNumbers([]);
  };
  const removeLevelInfoFromStorage = () => {
    localStorage.removeItem("gameState");
    localStorage.removeItem("currentPokemon");
    localStorage.removeItem("currentPokemonSrc");
    localStorage.removeItem("pokemonNameOptions");
  };
  const removeGameStateFromStorage = () => {
    localStorage.removeItem("availablePokes");
    localStorage.removeItem("scorePoints");
    localStorage.removeItem("HP");
    removeLevelInfoFromStorage();
    localStorage.removeItem("level");
    localStorage.removeItem("timer");
  };
  const updateAvailables = (availableNumbers, idx) => {
    const newAvailable = [...availableNumbers];
    newAvailable.splice(idx, 1);
    setAvailablePokes(newAvailable);
    return newAvailable;
  };
  const getInitialAvailablePokes = () => {
    const availableNumbers = [];
    for (let i = 1; i <= MAX_POKES; i++) {
      availableNumbers.push(i);
    }
    return availableNumbers;
  };
  const handleTimerCountdownInterval = () => {
    setTimer((currentTimer) => {
      const newTimer = currentTimer - 1;
      if (newTimer <= 0) {
        loseGame();
      } else {
        localStorage.setItem("timer", String(newTimer));
      }
      return newTimer;
    });
  };
  const startTimerCountdown = () => {
    timerCountdown = setInterval(handleTimerCountdownInterval, 1e3);
  };
  createEffect(() => {
    const state = gameState();
    if (state === GAME_STATES.LEVEL_SETUP && currentLevelPokemonNumbers().length === 0) {
      const isSetup = level() === 0;
      initiateLevelFetch(isSetup);
    } else if (state === GAME_STATES.YOU_LOSE) {
      removeGameStateFromStorage();
    }
  });
  createEffect(() => {
    const infoData = pokemonInfoQuery.data;
    const imageData = pokemonImageQuery.data;
    const infoSuccess = pokemonInfoQuery.isSuccess;
    const imageSuccess = pokemonImageQuery.isSuccess;
    const state = gameState();
    if (state === GAME_STATES.LEVEL_SETUP && infoSuccess && imageSuccess && infoData && imageData) {
      if (infoData.length >= 5) {
        const pokemonToGuess = infoData[0];
        setCurrentPokemon(pokemonToGuess);
        setCurrentPokemonSrc(imageData);
        const randomizedOptions = randomizePokemonList(infoData);
        setPokemonNameOptions(randomizedOptions);
        const idx = indexToRemove();
        if (idx !== null) {
          const newAvailableNumbers = updateAvailables(availablePokes(), idx);
          saveGameStateToStorage(newAvailableNumbers, pokemonToGuess, imageData, randomizedOptions);
        }
        setGameState(GAME_STATES.LEVEL_INFO);
      }
    }
  });
  createEffect(() => {
    if (pokemonInfoQuery.isError) {
      setErrorMessage("Failed to load Pokemon data. Please refresh and try again.");
    }
    if (pokemonImageQuery.isError) {
      setErrorMessage("Failed to load Pokemon image. Please refresh and try again.");
    }
  });
  onMount(() => {
    startTimerCountdown();
  });
  onCleanup(() => {
    if (timerCountdown) clearInterval(timerCountdown);
  });
  const isLoading = () => gameState() === GAME_STATES.LEVEL_SETUP || pokemonInfoQuery.isPending || pokemonImageQuery.isPending;
  return ssr(_tmpl$, ssrHydrationKey(), escape(createComponent(Header, {
    handleHeaderBack,
    inGame: true,
    get HP() {
      return HP();
    },
    get scorePoints() {
      return scorePoints();
    },
    get timer() {
      return timer();
    }
  })), escape(createComponent(Content, {
    onClick: handleAppTap,
    get children() {
      return createComponent(Show, {
        get when() {
          return gameState() !== GAME_STATES.YOU_LOSE;
        },
        get fallback() {
          return createComponent(YouLose, {
            get scorePoints() {
              return scorePoints();
            },
            get difficulty() {
              return DIFFICULTY_LEVELS.HARD;
            },
            get gameMode() {
              return GAME_MODES.POKEMON_GUESSER;
            },
            restartGame
          });
        },
        get children() {
          return createComponent(Show, {
            get when() {
              return !errorMessage();
            },
            get fallback() {
              return createComponent(Error$1, {
                get message() {
                  return errorMessage();
                }
              });
            },
            get children() {
              return [createComponent(Pokemon, {
                get loading() {
                  return isLoading();
                },
                get pokemonSrc() {
                  return currentPokemonSrc();
                }
              }), createComponent(Options, {
                get correctNameOption() {
                  var _a;
                  return (_a = currentPokemon()) == null ? void 0 : _a.name;
                },
                get validation() {
                  return gameState() === GAME_STATES.VALIDATION;
                },
                get loading() {
                  return isLoading();
                },
                handleClickOption,
                get pokemonNameOptions() {
                  return pokemonNameOptions();
                }
              })];
            }
          });
        }
      });
    }
  })));
}
export {
  PokemonGuesser as component
};

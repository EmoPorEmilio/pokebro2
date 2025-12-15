import { ssr, ssrHydrationKey, escape, createComponent } from "solid-js/web";
import { Show, createSignal, For, createEffect, onCleanup } from "solid-js";
import { T as TIMER_INITIAL_VALUE, G as GAME_STATES, H as Header, C as Content, a as GAME_MODES, b as TYPE_EFFECTIVENESS_OPTION, D as DIFFICULTY_LEVELS } from "./constants-PeIAwcan.js";
import { t as types, E as Error, Y as YouLose, a as generateRandomAvailableTypeCombination, d as getTypesCombinationDamageCorrectOption, p as padScorePoints } from "./utils-BhZz8VJt.js";
import { u as useNavigate } from "./router-DXx_4i-b.js";
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
var _tmpl$$2 = ["<div", '><div class="', '">', "</div></div>"], _tmpl$2$2 = ["<div", ' class="', '">', "</div>"], _tmpl$3 = ["<div", ' class="flex h-2/5 items-center justify-center"><!--$-->', '<!--/--><span class="text-accent text-lg mx-2">VS</span><div><!--$-->', "<!--/--><!--$-->", "<!--/--></div></div>"];
function Types(props) {
  const attackType = () => types[props.typesCombinations[0]];
  const firstDefense = () => types[props.typesCombinations[1]];
  const secondDefense = () => props.typesCombinations[2] !== null ? types[props.typesCombinations[2]] : null;
  return ssr(_tmpl$3, ssrHydrationKey(), escape(createComponent(Show, {
    get when() {
      return attackType();
    },
    get children() {
      var _a, _b;
      return ssr(_tmpl$$2, ssrHydrationKey(), `flex flex-1 p-2 m-1 flex-col content-center justify-center ${escape((_a = attackType()) == null ? void 0 : _a.color, true)} border-accent text-bg-400 border-2 rounded-[50px] border-solid items-center font-bold`, escape((_b = attackType()) == null ? void 0 : _b.printName));
    }
  })), escape(createComponent(Show, {
    get when() {
      return firstDefense();
    },
    get children() {
      var _a, _b;
      return ssr(_tmpl$2$2, ssrHydrationKey(), `flex flex-1 p-2 m-1 flex-col content-center justify-center ${escape((_a = firstDefense()) == null ? void 0 : _a.color, true)} border-accent text-bg-400 border-2 rounded-[50px] border-solid items-center font-bold`, escape((_b = firstDefense()) == null ? void 0 : _b.printName));
    }
  })), escape(createComponent(Show, {
    get when() {
      return secondDefense();
    },
    get children() {
      var _a, _b;
      return ssr(_tmpl$2$2, ssrHydrationKey(), `flex flex-1 p-2 m-1 flex-col content-center justify-center ${escape((_a = secondDefense()) == null ? void 0 : _a.color, true)} border-accent text-bg-400 border-2 rounded-[50px] border-solid items-center font-bold`, escape((_b = secondDefense()) == null ? void 0 : _b.printName));
    }
  })));
}
var _tmpl$$1 = ["<div", ' class="flex flex-wrap h-[39vh] w-[80vw] max-w-[350px] justify-center items-center">', "</div>"], _tmpl$2$1 = ["<div", ' class="', '"><span>', "</span></div>"];
function TypeEffectivenessOptions(props) {
  const [lastClickedOption, setLastClickedOption] = createSignal(null);
  return ssr(_tmpl$$1, ssrHydrationKey(), escape(createComponent(Show, {
    get when() {
      return props.options && !props.loading;
    },
    get children() {
      return createComponent(For, {
        get each() {
          return props.options;
        },
        children: (option) => {
          const isCorrect = () => props.validation && option === props.correctOption;
          const isIncorrect = () => props.validation && option === lastClickedOption() && option !== props.correctOption;
          const conditionalStyle = () => {
            if (isCorrect()) return "text-correct border-correct";
            if (isIncorrect()) return "text-incorrect border-incorrect";
            if (!props.validation) return "hover:cursor-pointer hover:bg-accent hover:border-white text-cards-bg";
            return "";
          };
          return ssr(_tmpl$2$1, ssrHydrationKey(), `${escape(conditionalStyle(), true)} flex justify-center items-center rounded-lg min-h-[50px] m-2 w-[40%] bg-cards-bg border-accent-200 border border-solid text-accent text-center font-normal text-2xl`, escape(option));
        }
      });
    }
  })));
}
var _tmpl$ = ["<div", ' class="flex flex-col h-[100dvh] w-[100dvw] bg-bg-400 antialiased"><!--$-->', "<!--/--><!--$-->", "<!--/--></div>"], _tmpl$2 = ["<div", ' class="flex flex-col w-[80vw] max-w-[350px] justify-center items-center gap-4"><button class="flex justify-center items-center rounded-lg min-h-[60px] w-full bg-cards-bg border-accent-200 border border-solid text-accent text-center font-bold text-xl hover:cursor-pointer hover:bg-accent hover:border-white hover:text-cards-bg transition-colors"><span>', '</span></button><button class="flex justify-center items-center rounded-lg min-h-[60px] w-full bg-cards-bg border-accent-200 border border-solid text-accent text-center font-bold text-xl hover:cursor-pointer hover:bg-accent hover:border-white hover:text-cards-bg transition-colors"><span>', "</span></button></div>"];
function DamageCalculator() {
  const navigate = useNavigate();
  const initState = () => ({
    HP: 3,
    scorePoints: "000",
    level: 0,
    difficulty: null,
    gameState: GAME_STATES.SELECT_DIFFICULTY,
    availableLevelCombinations: [],
    currentTypesCombination: [0, 0, null],
    correctOption: null,
    timer: TIMER_INITIAL_VALUE
  });
  const stateFromStorage = initState();
  const [HP, setHP] = createSignal(stateFromStorage.HP);
  const [scorePoints, setScorePoints] = createSignal(stateFromStorage.scorePoints);
  const [level, setLevel] = createSignal(stateFromStorage.level);
  const [timer, setTimer] = createSignal(stateFromStorage.timer);
  const [gameState, setGameState] = createSignal(stateFromStorage.gameState);
  const [difficulty, setDifficulty] = createSignal(stateFromStorage.difficulty);
  const [errorMessage, setErrorMessage] = createSignal("");
  const [availableLevelCombinations, setAvailableLevelCombinations] = createSignal(stateFromStorage.availableLevelCombinations);
  const [currentTypesCombination, setCurrentTypesCombination] = createSignal(stateFromStorage.currentTypesCombination);
  const [correctOption, setCorrectOption] = createSignal(stateFromStorage.correctOption);
  let timerCountdown = null;
  const handleHeaderBack = () => {
    navigate({
      to: "/"
    });
  };
  const handleAppTap = () => {
    if (gameState() === GAME_STATES.VALIDATION) {
      removeTypesFromGameState();
      setGameState(GAME_STATES.LEVEL_SETUP);
    }
  };
  const handleClickOption = (option) => {
    setLevel((prevLevel) => prevLevel + 1);
    if (correctOption() === option) {
      handleCorrectOption();
    } else {
      handleIncorrectOption();
    }
  };
  const handleCorrectOption = () => {
    removeTypesFromGameState();
    setScorePoints((prevScorePoints) => {
      const newScorePoints = padScorePoints(parseInt(prevScorePoints) + 1);
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
    setScorePoints("000");
    setGameState(GAME_STATES.SELECT_DIFFICULTY);
  };
  const removeTypesFromGameState = () => {
    setCurrentTypesCombination([0, 0, null]);
    setCorrectOption(null);
  };
  const loadNewLevel = async (firstSetup) => {
    let availableTypeCombinations = firstSetup ? getInitialAvailableTypeCombinations() : availableLevelCombinations();
    const {
      randomTypeCombination,
      randomTypeIndex
    } = generateRandomAvailableTypeCombination(availableTypeCombinations);
    setCurrentTypesCombination(randomTypeCombination);
    setCorrectOption(getTypesCombinationDamageCorrectOption(randomTypeCombination));
    setGameState(GAME_STATES.LEVEL_INFO);
    updateAvailables(availableTypeCombinations, randomTypeIndex);
  };
  const updateAvailables = (availableTypeCombinations, indexToRemove) => {
    const newCombinations = [...availableTypeCombinations];
    newCombinations.splice(indexToRemove, 1);
    setAvailableLevelCombinations(newCombinations);
    return newCombinations;
  };
  const getInitialAvailableTypeCombinations = () => {
    const availableNumbers = [];
    const diff = difficulty();
    if (diff === DIFFICULTY_LEVELS.HARD) {
      for (let attack = 0; attack < types.length; attack++) {
        for (let firstDefense = 0; firstDefense < types.length; firstDefense++) {
          for (let secondDefense = firstDefense + 1; secondDefense < types.length; secondDefense++) {
            availableNumbers.push([attack, firstDefense, secondDefense]);
          }
        }
      }
    } else if (diff === DIFFICULTY_LEVELS.EASY) {
      for (let attack = 0; attack < types.length; attack++) {
        for (let firstDefense = 0; firstDefense < types.length; firstDefense++) {
          availableNumbers.push([attack, firstDefense, null]);
        }
      }
    }
    return availableNumbers;
  };
  const easyOptions = () => [TYPE_EFFECTIVENESS_OPTION.NO_DAMAGE, TYPE_EFFECTIVENESS_OPTION.HALF_DAMAGE, TYPE_EFFECTIVENESS_OPTION.REGULAR_DAMAGE, TYPE_EFFECTIVENESS_OPTION.DOUBLE_DAMAGE];
  const hardOptions = () => [TYPE_EFFECTIVENESS_OPTION.NO_DAMAGE, TYPE_EFFECTIVENESS_OPTION.QUARTER_DAMAGE, TYPE_EFFECTIVENESS_OPTION.HALF_DAMAGE, TYPE_EFFECTIVENESS_OPTION.REGULAR_DAMAGE, TYPE_EFFECTIVENESS_OPTION.DOUBLE_DAMAGE, TYPE_EFFECTIVENESS_OPTION.QUADRUPLE_DAMAGE];
  const getOptions = () => {
    return difficulty() === DIFFICULTY_LEVELS.EASY ? easyOptions() : hardOptions();
  };
  const goToGame = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    setGameState(GAME_STATES.LEVEL_SETUP);
    startTimerCountdown();
  };
  const handleTimerCountdownInterval = () => {
    setTimer((currentTimer) => {
      const newTimer = currentTimer - 1;
      if (newTimer <= 0) {
        loseGame();
      }
      return newTimer;
    });
  };
  const startTimerCountdown = () => {
    timerCountdown = setInterval(handleTimerCountdownInterval, 1e3);
  };
  createEffect(() => {
    const diff = difficulty();
    const state = gameState();
    if (diff) {
      switch (state) {
        case GAME_STATES.LEVEL_SETUP:
          const isSetup = level() === 0;
          loadNewLevel(isSetup);
          break;
      }
    }
  });
  onCleanup(() => {
    if (timerCountdown) clearInterval(timerCountdown);
  });
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
              return difficulty();
            },
            get gameMode() {
              return GAME_MODES.DAMAGE_CALCULATOR;
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
              return createComponent(Error, {
                get message() {
                  return errorMessage();
                }
              });
            },
            get children() {
              return createComponent(Show, {
                get when() {
                  return gameState() !== GAME_STATES.SELECT_DIFFICULTY;
                },
                get fallback() {
                  return createComponent(DifficultySelector, {
                    goToGame
                  });
                },
                get children() {
                  return [createComponent(Types, {
                    get typesCombinations() {
                      return currentTypesCombination();
                    },
                    get loading() {
                      return gameState() === GAME_STATES.LEVEL_SETUP;
                    }
                  }), createComponent(TypeEffectivenessOptions, {
                    get correctOption() {
                      return correctOption();
                    },
                    get validation() {
                      return gameState() === GAME_STATES.VALIDATION;
                    },
                    get loading() {
                      return gameState() === GAME_STATES.LEVEL_SETUP;
                    },
                    handleClickOption,
                    get options() {
                      return getOptions();
                    }
                  })];
                }
              });
            }
          });
        }
      });
    }
  })));
}
function DifficultySelector(props) {
  return ssr(_tmpl$2, ssrHydrationKey(), escape(DIFFICULTY_LEVELS.EASY), escape(DIFFICULTY_LEVELS.HARD));
}
export {
  DamageCalculator as component
};

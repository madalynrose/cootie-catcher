import { Machine, assign, send } from 'xstate';

export const isHorizontal = countString => {
  if (typeof countString === 'number') {
    return number % 2 === 0;
  }
  return countString.length % 2 === 0;
};

export const cootieMachine = Machine({
  id: 'cooties',
  initial: 'active',
  context: {
    closed: true,
    horizontal: true,
    color: null,
    number: null,
    flap: null,
    countString: null,
  },
  states: {
    inactive: {
      on: { ADVANCE: 'active' },
      meta: {
        message: 'See your fortune?',
      },
    },
    active: {
      id: 'active',
      type: 'parallel',
      states: {
        position: {
          id: 'position',
          initial: 'closed',
          states: {
            closed: {
              entry: [
                async () => {
                  console.log('closed!');
                  return new Promise(resolve => {
                    assign({
                      closed: true,
                      horizontal: (ctx, val) => isHorizontal(ctx.countString),
                    });
                    setTimeout(resolve, 1000);
                  }).then(() => {
                    send('MOVE');
                    return true;
                  });
                },
              ],
              on: {
                MOVE: {
                  target: 'open',
                  cond: ctx => ctx.color !== null,
                },
              },
            },
            open: {
              entry: [
                async () => {
                  console.log('open!');
                  return new Promise(resolve => {
                    assign({
                      closed: false,
                      countString: (ctx, val) =>
                        typeof (ctx.countString === 'number')
                          ? ctx.countString - 1
                          : ctx.countString.slice(1),
                    });
                    setTimeout(resolve, 1000);
                  }).then(() => {
                    send('MOVE');
                    return true;
                  });
                },
              ],
              on: {
                MOVE: {
                  target: 'closed',
                  cond: ctx =>
                    typeof (ctx.countString === 'number')
                      ? ctx.countString > 1
                      : ctx.countString.length > 1,
                },
              },
            },
          },
        },
        stage: {
          id: 'stage',
          initial: 'color',
          states: {
            color: {
              on: {
                SET_COLOR: {
                  target: 'number',
                  actions: [
                    assign({
                      color: (ctx, e) => e.value,
                      countString: (ctx, e) => e.value,
                    }),
                    send('MOVE'),
                  ],
                  cond: ctx => !ctx.color,
                },
              },
              meta: {
                message: 'Select a color',
              },
            },
            number: {
              on: {
                SET_NUMBER: {
                  target: 'flap',
                  actions: [
                    assign({
                      number: (ctx, e) => e.value,
                      countString: (ctx, e) => e.value,
                    }),
                    send('MOVE'),
                  ],
                  cond: ctx => ctx.color && !ctx.number,
                },
              },
              meta: {
                message: 'Select a number',
              },
            },
            flap: {
              on: {
                SET_FLAP: {
                  target: 'flap',
                  actions: [
                    assign({
                      flap: (ctx, e) => e.value,
                    }),
                  ],
                  cond: ctx => ctx.color && ctx.number && !ctx.flap,
                },
              },
              meta: {
                message: 'Select another number',
              },
            },
            done: {
              on: { RESTART: 'color' },
              meta: {
                message: 'Try Again?',
              },
            },
          },
        },
      },
    },
  },
});

// export const ACTIONS = {
//   TOGGLE_OPEN: 'TOGGLE_OPEN',
//   TOGGLE_VERTICAL: 'TOGGLE_VERTICAL',
//   SET_COLOR: 'SET_COLOR',
//   SET_NUMBER: 'SET_NUMBER',
//   SET_FINAL_NUMBER: 'SET_FINAL_NUMBER',
//   SET_COUNT_STRING: 'SET_COUNT_STRING',
// };

// export const setColor = color => {
//   console.log(color);
//   return { type: ACTIONS.SET_COLOR, payload: color };
// };

// export const setNumber = number => ({
//   type: ACTIONS.SET_NUMBER,
//   payload: number,
// });

// export const setFinalNumber = finalNumber => ({
//   type: ACTIONS.SET_FINAL_NUMBER,
//   payload: finalNumber,
// });

// export const setCountString = countString => ({
//   type: ACTIONS.SET_COUNT_STRING,
//   payload: countString,
// });

// export const setStepString = stepString => ({
//   type: ACTIONS.SET_STEP_STRING,
//   payload: stepString,
// });

// export const toggleOpen = () => ({ type: ACTIONS.TOGGLE_OPEN });
// export const toggleVertical = () => ({ type: ACTIONS.TOGGLE_VERTICAL });

// export default (state = initialState, action) => {
//   const { type, payload } = action;
//   switch (type) {
//     case ACTIONS.TOGGLE_OPEN:
//       return { ...state, isOpen: !state.isOpen };
//     case ACTIONS.TOGGLE_VERTICAL:
//       return { ...state, isVertical: !state.isVertical };
//     case ACTIONS.SET_COLOR:
//       return { ...state, color: payload };
//     case ACTIONS.SET_NUMBER:
//       return { ...state, number: payload };
//     case ACTIONS.SET_FINAL_NUMBER:
//       return { ...state, finalNumber: payload };
//     case ACTIONS.SET_COUNT_STRING:
//       return { ...state, countString: payload };
//     case ACTIONS.SET_STEP_STRING:
//       return { ...state, stepString: payload };
//     default:
//       return state;
//   }
// };

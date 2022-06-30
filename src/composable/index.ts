import { ref } from 'vue'
import { GameState } from '../constants'

export * from './food'
export * from './score'
export * from './snake'

export const gameState = ref(GameState.READY)

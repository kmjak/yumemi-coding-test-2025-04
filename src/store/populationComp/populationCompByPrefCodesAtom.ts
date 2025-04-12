import { PopulationCompByPrefCodes } from '@/types/models/populationComp/PopulationCompByPrefCodes';
import { atom } from 'jotai';

/**
 * @file populationCompByPrefCodesAtom.ts
 * @description 人口構成の都道府県コードを管理するatom
 * @exports populationCompByPrefCodesAtom
 *
 * @author @kmjak
 */
export const populationCompByPrefCodesAtom = atom<PopulationCompByPrefCodes>();

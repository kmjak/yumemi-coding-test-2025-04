import { PrefectureSelectionAction } from '@/types/models/prefectureSelection/PrefectureSelectionAction';
import { atom } from 'jotai';

/**
 * @file prefectureSelectionActionAtom.ts
 * @description 都道府県選択時のアクションを管理するatom
 * @exports prefectureSelectionActionAtom
 *
 * @author @kmjak
 */
export const prefectureSelectionActionAtom = atom<PrefectureSelectionAction | undefined>(undefined);

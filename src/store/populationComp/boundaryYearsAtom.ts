import { BoundaryYears } from '@/types/models/populationComp/BoundaryYears';
import { atom } from 'jotai';

/**
 * @file boundaryYearsAtom.ts
 * @description 人口構成の区切り年を管理するatom
 * @exports boundaryYearAtom
 *
 * @author @kmjak
 */
export const boundaryYearAtom = atom<BoundaryYears>();

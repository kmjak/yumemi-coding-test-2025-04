import { BoundaryYears } from '@/types/models/populationComp/BoundaryYears';
import { atom } from 'jotai';

/**
 * @file boundaryYearsAtom.ts
 * @description 人口構成の区切り年を管理するatom
 * @exports boundaryYearsAtom
 *
 * @author @kmjak
 */
export const boundaryYearsAtom = atom<BoundaryYears>({});

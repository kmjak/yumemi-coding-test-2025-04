/**
 * @file PrefectureSelectionAction.ts
 * @description 都道府県選択のアクションを定義するインターフェース
 * @exports PrefectureSelectionAction
 *
 * @author @kmjak
 */

export interface PrefectureSelectionAction {
  action: 'insert' | 'delete' | 'deleteAll';
  prefCode?: number;
}

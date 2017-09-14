// Type definitions for ag-grid v9.0.0
// Project: http://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ceolter/>
import { Column } from "../entities/column";
import { RowNode } from "../entities/rowNode";
import { RenderedRow } from "./renderedRow";
import { GridCell } from "../entities/gridCell";
import { Component } from "../widgets/component";
export declare class RenderedCell extends Component {
    private context;
    private columnApi;
    private gridApi;
    private gridOptionsWrapper;
    private expressionService;
    private rowRenderer;
    private $compile;
    private templateService;
    private valueService;
    private eventService;
    private columnController;
    private columnAnimationService;
    private rangeController;
    private focusedCellController;
    private contextMenuFactory;
    private focusService;
    private cellEditorFactory;
    private cellRendererFactory;
    private popupService;
    private cellRendererService;
    private valueFormatterService;
    private stylingService;
    private columnHoverService;
    private static PRINTABLE_CHARACTERS;
    private eGridCell;
    private eSpanWithValue;
    private eCellWrapper;
    private eParentOfValue;
    private gridCell;
    private eParentRow;
    private column;
    private node;
    private editingCell;
    private cellEditorInPopup;
    private hideEditorPopup;
    private cellFocused;
    private scope;
    private cellEditor;
    private cellRenderer;
    private value;
    private usingWrapper;
    private renderedRow;
    private firstRightPinned;
    private lastLeftPinned;
    constructor(column: Column, node: RowNode, scope: any, renderedRow: RenderedRow);
    private createGridCell();
    private setupGridCell();
    getGridCell(): GridCell;
    setFocusInOnEditor(): void;
    setFocusOutOnEditor(): void;
    destroy(): void;
    private setPinnedClasses();
    getParentRow(): HTMLElement;
    setParentRow(eParentRow: HTMLElement): void;
    setupCheckboxSelection(): void;
    getColumn(): Column;
    private getValue();
    private getDataForRow();
    private addRangeSelectedListener();
    private addHighlightListener();
    private addChangeListener();
    private animateCellWithDataChanged();
    private animateCellWithHighlight();
    private animateCell(cssName);
    private addCellFocusedListener();
    private checkCellFocused(event?);
    private setWidthOnCell();
    init(): void;
    private addColumnHoverListener();
    private onColumnHover();
    private addDomData();
    private onEnterKeyDown();
    private onF2KeyDown();
    private onEscapeKeyDown();
    private onPopupEditorClosed();
    isEditing(): boolean;
    private onTabKeyDown(event);
    private onBackspaceOrDeleteKeyPressed(key);
    private onSpaceKeyPressed(event);
    private onNavigationKeyPressed(event, key);
    onKeyPress(event: KeyboardEvent): void;
    onKeyDown(event: KeyboardEvent): void;
    private createCellEditorParams(keyPress, charPress, cellStartedEdit);
    private createCellEditor(keyPress, charPress, cellStartedEdit);
    private stopEditingAndFocus();
    startRowOrCellEdit(keyPress?: number, charPress?: string): void;
    startEditingIfEnabled(keyPress?: number, charPress?: string, cellStartedEdit?: boolean): boolean;
    private addInCellEditor();
    private addPopupCellEditor();
    focusCell(forceBrowserFocus?: boolean): void;
    stopRowOrCellEdit(cancel?: boolean): void;
    stopEditing(cancel?: boolean): void;
    private createParams();
    private createEvent(event);
    getRenderedRow(): RenderedRow;
    isSuppressNavigable(): boolean;
    isCellEditable(): boolean;
    onMouseEvent(eventName: string, mouseEvent: MouseEvent): void;
    private onMouseOut(mouseEvent);
    private onMouseOver(mouseEvent);
    private onContextMenu(mouseEvent);
    private onCellDoubleClicked(mouseEvent);
    private onMouseDown();
    private onCellClicked(mouseEvent);
    private doIeFocusHack();
    private setInlineEditingClass();
    private populateCell();
    private addStylesFromColDef();
    private addClassesFromColDef();
    private createParentOfValue();
    isVolatile(): boolean;
    refreshCell(animate?: boolean, newData?: boolean): void;
    private addClassesFromRules();
    private putDataIntoCell();
    private formatValue(value);
    private createRendererAndRefreshParams(valueFormatted, cellRendererParams);
    private useCellRenderer(cellRendererKey, cellRendererParams, valueFormatted);
    private addClasses();
}

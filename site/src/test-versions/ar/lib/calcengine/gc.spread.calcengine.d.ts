declare namespace GC.Spread.CalcEngine {

    class CalcService {
        constructor();
        recalculateByName(source: CalcSource, name: string):void;
        getSourceModel(source: any): CalcSourceModel;
    }

    class CalcSource {
        constructor(service: any);
         getCalcService(): CalcService;
         getValue(id: string): any;
         setValue(id: string, value: string):void;
         getValueByName(name: string): any;
         setValueByName(name: string, value: string):void;
         setFormulaByName(name: string, formula: string):void;
         getParserContext(useR1C1: boolean, identity: string, option?: any): ParserContext;
         getEvaluatorContext(identity: string, arrayFormula: boolean, arrayIdentity: boolean): EvaluateContext;
        getCalcSourceModel(): CalcSourceModel;
    }

    class CalcSourceModel {
        constructor(sevice: CalcService, source: CalcSource);
        setFormulaByName(id: string, formula: string):void;
        clearAll():void;
    }

    class ParserContext {
        constructor(source: any, useR1C1: boolean, baseIdentity: any, option?: any);
        addResolver(tokenResolver: TokenResolver):any;
    }

    class EvaluateContext {
        constructor(source: any, identity: string, arrayFormula: boolean, arrayIdentity: boolean);
    }

    class FormulaToken {
        constructor(value: any, type: number, index: number, endIndex: number, subType: number);
        type(): number;
        subType(): number;
        stringValue(): string;
    }

    class TokenResolver {
        constructor(priority: number);
        resolveToken(context: ParserContext, builder: any, originalTokens: FormulaToken[], currentTokenIndex: number):any;
    }

    class Expression {
        constructor(type: number);
    }
}


declare var CalcService: GC.Spread.CalcEngine.CalcService;
declare var CalcSource: GC.Spread.CalcEngine.CalcSource;


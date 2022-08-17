import { judgeType, isType } from "@/utils";

describe('类型判断judgeType', () => {
    it('1的类型是number', () => {
        const judger = judgeType(1);
        expect(judger.isNumber()).toBe(true);
    });
    it('1的类型不是object', () => {
        const judger = judgeType(1);
        expect(judger.isObject()).not.toBe(true);
    });
    it('""的类型是string', () => {
        const judger = judgeType('');
        expect(judger.isString()).toBe(true);
    });
    it('[]的类型是array', () => {
        const judger = judgeType([]);
        expect(judger.isArray()).toBe(true);
    });
    it('{}的类型是object', () => {
        const judger = judgeType({});
        expect(judger.isObject()).toBe(true);
    });
});

describe('类型判断isType', () => {
    it('1的类型是string或number', () => {
        expect(isType(1, 'string', 'number')).toBe(true);
    });
    it('1的类型不是string', () => {
        expect(isType(1, 'string')).not.toBe(true);
    });
})
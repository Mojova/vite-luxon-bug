# Vitest Luxon bug reproduction

1. run `npm install`
2. run the test with vitest `npm run vitest`
3. run the test with jest `npm run jest`

Observe that the test fails with vitest but succeeds with jest.

Luxon DateTime instances are not instanceof DateTime when using vitest. Same test ran with Jest succeeds.

```
describe('LuxonUtils', () => {
    it('DateTime', () => {
        const utils = new LuxonUtils()
        const datetime = DateTime.now()
        expect(utils.date(datetime).isValid).toBeTruthy()
    });
})
```

I have located the problem to a small diffence between what TypeScript source of the date function in DateUtils is
vs what their compiled source is.  If I copy their source to my own project and let vite process that the test succeeds.

[Their TypeScript:](https://github.com/dmtrKovalenko/date-io/blob/master/packages/luxon/src/luxon-utils.ts#L60)
```
if (value instanceof DateTime) {
    return value
}
```
Their JavaScript:
```
if (value instanceof luxon.DateTime) {
    return value
 }
```

When run through vitest, _value_ is not a instance of luxon.DateTime and the code takes a wrong branch resulting in an
invalid DateTime.

Is this problem a result of my vite/Typescript config, your bug, or a @date-io bug?

@date-io/luxon is an adapter library that standardizes multiple date libraries to the same API. It’s used by e.g. MUI.
The bug doesn’t occur when using DateUtils in a React application in the browser.